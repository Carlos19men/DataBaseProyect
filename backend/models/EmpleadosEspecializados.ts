import { getDbPool } from "../config/SQLserverConection";

export class EmpleadosEspecializadosModel {

    static async getAll() {
        const pool = getDbPool();
        const result = await pool.query('SELECT * FROM Especializados ORDER BY apellidoEmpleado, nombreEmpleado;');
        return result['recordset'];
    }

    static async getByCI(CI: string) {
        const request = getDbPool().request();
        request.input('CI', CI);

        const result = await request.query('SELECT * FROM Especializados WHERE CI_emp = @CI;');
        return result['recordset'][0];
    }

    static async getByRIF(RIF: string) {

        const request = getDbPool().request();
        request.input('RIF', RIF);

        const result = await request.query('SELECT * FROM especialistasEstablecimiento(@RIF) ORDER BY apellidoEmpleado, nombreEmpleado;');
        return result['recordset'];
    }

    static async getByService(nro_servicio: number) {
        const request = getDbPool().request();
        request.input('nro_servicio', nro_servicio);

        const result = await request.query('SELECT * FROM Especializados WHERE nro_servicio = @nro_servicio;');
        return result['recordset'];
    }

    static async addSpecialization( 
        CI_emp: string, 
        RIF_establecimiento: string, 
        nro_servicio: number
    ) {

        const request = getDbPool().request();
        request.input('CI_emp', CI_emp);
        request.input('RIF_establecimiento', RIF_establecimiento);
        request.input('nro_servicio', nro_servicio);

        const query = `EXEC addEspecializacion @CI_emp, @RIF_establecimiento, @nro_servicio;`;

        const result = await request.query(query);
        return {rowsAffected:  result['rowsAffected'][0]}
    }

    static async deleteSpecialization( CI_emp: string, nro_servicio: number ) {

        const request = getDbPool().request();
        request.input('CI_emp', CI_emp);
        request.input('nro_servicio', nro_servicio);

        const query = `
            DELETE FROM EspecializacionEmpleados
            WHERE CI_emp = @CI_emp AND nro_servicio = @nro_servicio;
        `;

        const result = await request.query(query);
        
        return {rowsAffected:  result['recordset'][0]}
    }
}