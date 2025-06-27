import { getDbPool } from "../config/SQLserverConection";

export class EmpleadosEspecializadosModel {

    static async getAll() {
        const pool = getDbPool();
        const result = await pool.query('SELECT * FROM Especializados ORDER BY apellidoEmpleado, nombreEmpleado;');
        return result['recordset'];
    }

    static async getByCI(CI: string) {
        if (CI === undefined || CI === null || CI.length === 0) {
            return { error: "Se necesita la cédula del empleado" };
        }

        const request = getDbPool().request();
        request.input('CI', CI);

        const result = await request.query('SELECT * FROM Especializados WHERE CI_emp = @CI;');
        return result['recordset'][0];
    }

    static async getByRIF(RIF: string) {
        if (RIF === undefined || RIF === null || RIF.length === 0) {
            return { error: "Se necesita el RIF del establecimiento" };
        }

        const request = getDbPool().request();
        request.input('RIF', RIF);

        const result = await request.query('SELECT * FROM especialistasEstablecimiento(@RIF) ORDER BY apellidoEmpleado, nombreEmpleado;');
        return result['recordset'];
    }

    static async getByService(nro_servicio: number) {
        if (nro_servicio === undefined || nro_servicio === null || nro_servicio <= 0) {
            return { error: "Se necesita el número de servicio válido" };
        }

        const request = getDbPool().request();
        request.input('nro_servicio', nro_servicio);

        const result = await request.query('SELECT * FROM Especializados WHERE nro_servicio = @nro_servicio;');
        return result['recordset'];
    }

    static async addSpecialization({ CI_emp, RIF_establecimiento, nro_servicio}: { 
        CI_emp: string, 
        RIF_establecimiento: string, 
        nro_servicio: number
    }) {
        if (CI_emp === undefined || CI_emp.length === 0) {
            return { error: "Se necesita la cédula del empleado" };
        }

        if (RIF_establecimiento === undefined || RIF_establecimiento.length === 0) {
            return { error: "Se necesita el RIF del establecimiento" };
        }

        if (nro_servicio === undefined || nro_servicio <= 0) {
            return { error: "Se necesita un número de servicio válido" };
        }

    

        const request = getDbPool().request();
        request.input('CI_emp', CI_emp);
        request.input('RIF_establecimiento', RIF_establecimiento);
        request.input('nro_servicio', nro_servicio);

        const query = `EXEC  addEspecializacion @CI_emp, @RIF_establecimiento, @nro_servicio;`;

        const result = await request.query(query);
        return result['recordset'][0];
    }

    static async deleteSpecialization({ CI_emp, nro_servicio }: { CI_emp: string, nro_servicio: number }) {
        if (CI_emp === undefined || CI_emp === null || CI_emp.length === 0) {
            return { error: "Se necesita la cédula del empleado" };
        }

        if (nro_servicio === undefined || nro_servicio === null || nro_servicio <= 0) {
            return { error: "Se necesita el número de servicio" };
        }

        const request = getDbPool().request();
        request.input('CI_emp', CI_emp);
        request.input('nro_servicio', nro_servicio);

        const query = `
            DELETE FROM EspecializacionEmpleados
            WHERE CI_emp = @CI_emp AND nro_servicio = @nro_servicio;
        `;

        const result = await request.query(query);
        
        if (result.rowsAffected[0] === 0) {
            return { error: "No se encontró la especialización especificada." };
        }
        
        return result['recordset'][0];
    }
}