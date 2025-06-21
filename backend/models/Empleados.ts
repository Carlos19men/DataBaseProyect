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
        const result = await request.query('SELECT * FROM ObtenerEmpleado(@CI);');
        console.log(result['recordset']);
        return result;
    }

    static async editEmpleado({ CI, name, lastName ,telefono, direccion, sueldo }: { CI: string | null, name: string | null, lastName: string | null, telefono: string | null, direccion: string | null, sueldo: number | null }) {

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

        const result = await request.query('EXEC EditarEmpleado @CI, @name, @lastName, @telefono, @direccion, @sueldo;');
        
        console.log(result['recordset']);
        return result;
    }

    static async deleteEmpleado({ CI }: { CI: string; }) {
        if (CI === undefined || CI === null || CI.length === 0) {
            return { error: "Se necesita la cédula" };
        }

        const request = getDbPool().request();
        request.input('CI', CI);
        const result = await request.query('EXEC EliminarEmpleado @CI;');

        console.log(result['recordset']);
        return result;
    }
}