import { copyFileSync } from "fs";
import { getDbPool } from "../config/SQLserverConection";

export class Empleado {

    static async getAll() {
        const pool = getDbPool();
        const result = await pool.query('SELECT * FROM ObtenerEmpleados ORDER BY apellido;');
        console.log(result['recordset']);
        return result['recordset'];
    }

    static async getByCI({ CI }: { CI: string; }) {
        if (CI === undefined || CI === null || CI.length === 0) {
            return { error: "Se necesita la cédula" };
        }

        const request = getDbPool().request();
        request.input('CI', CI);

        const result = await request.query('SELECT * from Empleados where CI_emp = @CI;');
        console.log(result['recordset']);
        return result['recordset'];
    }

    static async getbyRIF({RIF}: {RIF: string | null}){
        if(RIF === undefined || RIF === null || RIF.length === 0){
            return {error: "Se requiere el RIF"};
        }

        const request = getDbPool().request();
        request.input('RIF', RIF);
        
        const query = `Select CI_emp, nombre, apellido from Empleados where RIF_establecimiento = @RIF;`

        const result = await request.query(query);
        console.log(result['recordset']);
        return result['recordset'];
    }


    static async editEmployee({ CI, name, lastName ,telefono, direccion, sueldo }: { CI: string | null, name: string | null, lastName: string | null, telefono: string | null, direccion: string | null, sueldo: number | null }) {

        if (CI !== null) {
            if (CI === undefined || CI.length === 0) {
                return { error: "Se necesita la cédula" };
            }
        }

        if (name !== null) {
            if (name === undefined || name.length === 0) {
                return { error: "Se necesita el nombre" };
            }
        }

        if (lastName !== null) {
            if (lastName === undefined || lastName.length === 0) {
                return { error: "Se necesita el apellido" };
            }
        }

        if (telefono !== null) {
            if (telefono === undefined || telefono.length === 0) {
                return { error: "Se necesita el teléfono" };
            }
        }

        if (direccion !== null) {
            if (direccion === undefined || direccion.length === 0) {
                return { error: "Se necesita la dirección" };
            }
        }

        if (sueldo !== null) {
            if (sueldo === undefined || typeof sueldo !== 'number') {
                return { error: "Se necesita que el sueldo sea un número" };
            }
        }

        const request = getDbPool().request();
        request.input('CI', CI);
        request.input('name', name);
        request.input('lastName', lastName);
        request.input('telefono', telefono);
        request.input('direccion', direccion);
        request.input('sueldo', sueldo);

        // Using isNULL to keep existing values if the new value is null.
        const query = `UPDATE Empleados SET 
        nombre = isNULL(@name, nombre), 
        apellido = isNULL(@lastName, apellido), 
        telefono = isNULL(@telefono, telefono), 
        direccion = isNULL(@direccion, direccion), 
        sueldo = isNULL(@sueldo, sueldo) 
        WHERE CI_emp = @CI; `;

        const result = await request.query(query);
        console.log(result['recordset']);
        return result;
    }

    static async deleteEmpleado({CI}: { CI: string; }) {
        if (CI === undefined || CI === null || CI.length === 0) {
            return { error: "Se necesita la cédula" };
        }

        const request = getDbPool().request();
        request.input('CI', CI);
        const result = await request.query('delete from Empleados where CI_emp = @CI;');
        
        if (result.rowsAffected[0] === 0) {
            return { error: "No se encontró el empleado con la cédula proporcionada." };
        }
        console.log(result['recordset']);
        return result;
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

        if (salary === undefined || typeof salary !== 'number') {
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

        const query = 
            'Insert into Empleados (CI_emp, nombre, apellido, telefono, direccion, sueldo, RIF) ' +
            'values (@CI, @name, @lastName, @cellphone, @address, @salary, @RIF);';

        const result = await request.query(query);
        
        console.log(result['recordset']);
        return result;
    }
}