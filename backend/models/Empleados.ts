import { getDbPool } from "../config/SQLserverConection";
import * as sql from 'mssql';

export class employeeModel {

    static async getAll() {
        const pool = getDbPool();
        const result = await pool.query('SELECT * FROM ObtenerEmpleados ORDER BY apellido;');
        return result['recordset'];
    }

    static async getByCI(CI: string) {
        const request = getDbPool().request();
        request.input('CI', CI);

        const result = await request.query('SELECT * from ObtenerEmpleados where CI = @CI;');
        return result['recordset'][0];
    }

    static async getbyRIF(RIF: string) {

        const request = getDbPool().request();
        request.input('RIF', RIF);
        
        const query = `Select CI,nombre, apellido,sueldo,direccion from ObtenerEmpleados where RIF_establecimiento = @RIF;`

        const result = await request.query(query);
        return result['recordset'];
    }


    static async editEmployee( CI: string, name: string | null, lastName: string | null, cellphone: string | null, address: string | null, salary: number | null ) {  

        const request = getDbPool().request();
        request.input('CI',sql.NVarChar(15), CI);
        request.input('name',sql.NVarChar(15), name);
        request.input('lastName',sql.NVarChar(15),lastName);
        request.input('cellphone',sql.NVarChar(15), cellphone);
        request.input('address',sql.NVarChar(15),address);
        request.input('salary',sql.Int, salary);  

        
        const query = `UPDATE Empleados SET 
        nombre = ISNULL(@name, nombre), 
        apellido = ISNULL(@lastName, apellido), 
        telefono = ISNULL(@cellphone, telefono), 
        direccion = ISNULL(@address, direccion), 
        sueldo = ISNULL(@salary, sueldo) 
        WHERE CI_emp = @CI; `;

        const result = await request.query(query);

        return { rowsAffected: result['rowsAffected'][0] }; // Devuelve objeto consistente
    }

    static async deleteEmpleado(CI: string) {
        const request = getDbPool().request();
        request.input('CI', CI);
        const result = await request.query('delete from Empleados where CI_emp = @CI;');
        
        return {rowsAffected: result['rowsAffected'][0]};
    }

    static async addEmpleado(CI: string, name: string, lastName: string, cellphone: string, address: string, salary: number, RIF: string) {
        const request = getDbPool().request();
        request.input('CI', CI);
        request.input('name', name);
        request.input('lastName', lastName);
        request.input('cellphone', cellphone);
        request.input('address', address);
        request.input('salary', salary);
        request.input('RIF', RIF);

        const query = 'EXEC addEmpleado @CI, @RIF, @name, @lastName, @cellphone, @address, @salary;';

        const result = await request.query(query);
        
        return result['rowsAffected'];
    }

    static async asigPersonInCharge(RIF: string, CI_encargado: string | null, fecha: Date | null) {
        const request = getDbPool().request();

        request.input("RIF", RIF);
        request.input("CI_encargado", CI_encargado);
        request.input("fecha_encargado", fecha);

        const result = await request.query(`UPDATE Establecimientos 
                                            SET CI_encargado = @CI_encargado,
                                            fecha_encargado = @fecha_encargado
                                            WHERE RIF_establecimiento = @RIF;`);

        return {rowsAffected: result['rowsAffected'][0]};
    }

    static async removePersonInCharge(RIF: string) {
        return this.asigPersonInCharge(RIF, null, null);
    }
}