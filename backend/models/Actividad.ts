import { getDbPool } from "../config/SQLserverConection";


//con este pool podran hacer las consultas a la base de datos
//creamos la clase para el manejo de todos los modelos 



export class Actividades {

    //obtener todas las actividades ofrecidas
    static async getAll() {
        const result = await getDbPool().query('SELECT * FROM Actividades;');
        return result
    }

    //obtener toda las actividades ofrecidas por establecimiento
    static async getByEstablecimiento(RIF: string) {
        const request = getDbPool().request()

        //agg the ci
        request.input('RIF', RIF);

        const result = await request.query('SELECT * FROM getByEstablecimiento(@RIF);');

        return result['recordset']
    }

    //obtener toda las actividades ofrecidas por servicio
    static async getByServicio(nro_s: number) {

        if (nro_s === undefined || nro_s === null) {
            return { error: "Servicio necesario" }
        }

        const request = getDbPool().request()

        //agg the ci
        request.input('nro_s', nro_s);


        const result = await request.query('SELECT * FROM getByServicio(@nro_s);');

        return result['recordset']

    }

    //obtener una actividad especíifica
    static async getByActividad(nro_s: number, nro_corr: number) {

        const request = getDbPool().request()


        request.input('nro_s', nro_s);
        request.input('nro_corr', nro_corr);


        const result = await request.query('SELECT * FROM getByServicio(@nro_s,@nro_corr);');

        return result['recordset'][0]

    }

    static async createActividad(nro_s: number, nro_a: number, nomb: string, desc: String, monto: number ) {

        const request = getDbPool().request()


        request.input('nro_s', nro_s);
        request.input('nro_corr', nro_a);
        request.input('nomb', nomb);
        request.input('desc', desc);
        request.input('monto', monto);

        const result = await request.query('EXEC createActividad @nro_s,@nro_a,@nomb,@desc,@monto;');

        return {rowsAffected: result['rowsAffected'][0]}

    }

    static async updateActividad(
            nro_s: number,
            nro_a: number,
            nomb?: string,
            desc?: String, 
            monto?: number 
        ) {
        const request = getDbPool().request();
        
        request.input('nro_s', nro_s); 
        request.input('nro_a', nro_a); 
        request.input('nomb', nomb);
        request.input('desc', desc);
        request.input('monto', monto);

        const result = await request.query('EXEC updateActividad @nro_s,@nro_a,@nomb,@desc,@monto;');

        return {rowsAffected: result['rowsAffected'][0]}
    }

    static async deleteActividad(
        nro_s: number,
        nro_corr: number
        ) {
        const request = getDbPool().request()


        request.input('nro_s', nro_s);
        request.input('nro_corr', nro_corr);


        const result = await request.query('EXEC deleteActividad @nro_s,@nro_corr;');

        return {rowsAffected: result['rowsAffected'][0]}
    }
}
