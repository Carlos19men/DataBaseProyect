import { getDbPool } from "../config/SQLserverConection";
import * as sql from 'mssql';

export class employeeModel {

    static async getAll() {
        const pool = getDbPool();
        const result = await pool.query('SELECT * FROM ObtenerEmpleados ORDER BY apellido;');
        return result['recordset'];
    }

    static async getByCI(CI: string) {
        if (CI === undefined || CI === null || CI.length === 0) {
            return { error: "Se necesita la cédula" };
        }

        const request = getDbPool().request();
        request.input('CI', CI);

        const result = await request.query('SELECT * from ObtenerEmpleados where CI = @CI;');
        return result['recordset'][0];
    }

    static async getbyRIF(RIF: string) {
        if(RIF === undefined || RIF === null || RIF.length === 0){
            return {error: "Se requiere el RIF"};
        }

        const request = getDbPool().request();
        request.input('RIF', RIF);
        
        const query = `Select CI,nombre, apellido,sueldo,direccion from ObtenerEmpleados where RIF_establecimiento = @RIF;`

        const result = await request.query(query);
        return result['recordset'];
    }


    static async editEmployee({ CI, name, lastName ,cellphone, address, salary }: { CI: string | null, name: string | null, lastName: string | null, cellphone: string | null, address: string | null, salary: number | null }) {

        if (CI !== null) {
            if (CI === undefined || CI.length === 0) {
                return { error: "Se necesita la cédula" };
            }
        }    

        const request = getDbPool().request();
        request.input('CI', CI);
        request.input('name', name);
        request.input('lastName', lastName);
        request.input('cellphone', cellphone);
        request.input('address', address);
        request.input('salary', sql.Decimal(10,2), salary);

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
        if (CI === undefined || CI === null || CI.length === 0) {
            return { error: "Se necesita la cédula" };
        }

        const request = getDbPool().request();
        request.input('CI', CI);
        const result = await request.query('delete from Empleados where CI_emp = @CI;');
        
        return {rowsAffected: result['rowsAffected'][0]};
    }

    static async addEmpleado({CI, name, lastName, cellphone, address, salary, RIF}: {CI: string, name: string, lastName: string, cellphone: string, address: string, salary: number, RIF: string}) {
        if (CI === undefined || CI.length === 0) {
            return { error: "Se necesita la cédula" };
        }

        if (name === undefined || name.length === 0) {
            return { error: "Se necesita el nombre" };
        }

        if (lastName === undefined || lastName.length === 0) {
            return { error: "Se necesita el apellido" };
        }

        if (cellphone === undefined || cellphone.length === 0) {
            return { error: "Se necesita el teléfono" };
        }

        if (address === undefined || address.length === 0) {
            return { error: "Se necesita la dirección" };
        }

        if (salary === undefined || salary === null) {
            return { error: "Se necesita que el sueldo sea un número" };
        }

        if (RIF === undefined || RIF.length === 0) {
            return { error: "Se necesita el RIF" };
        }

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
}