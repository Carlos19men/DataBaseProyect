import { getDbPool } from "../config/SQLserverConection";

export class ServiciosOfrecidosModel {

    static async getAll() {
        const pool = getDbPool();
        const result = await pool.query(`SELECT * FROM ServiciosDisponibles ORDER BY nombre_ser;`);
        return result['recordset'];
    }

    static async getByRIFAndService(RIF: string, nro_servicio: number) {
        if (RIF === undefined || RIF === null || RIF.length === 0) {
            return { error: "Se necesita el RIF del establecimiento" };
        }

        if (nro_servicio === undefined || nro_servicio === null || nro_servicio <= 0) {
            return { error: "Se necesita un número de servicio válido" };
        }

        const request = getDbPool().request();
        request.input('RIF', RIF);
        request.input('nro_servicio', nro_servicio);

        const result = await request.query(`SELECT nro_servicio,nombre_ser servicio FROM ServiciosOfre WHERE RIF = @RIF AND nro_servicio = @nro_servicio;`);
        
        return result['recordset'][0];
    }

    static async getByRIF(RIF: string) {
        if (RIF === undefined || RIF === null || RIF.length === 0) {
            return { error: "Se necesita el RIF del establecimiento" };
        }

        const request = getDbPool().request();
        request.input('RIF', RIF);

        const result = await request.query(`SELECT nro_servicio,nombre_ser servicio FROM ServiciosOfre WHERE RIF = @RIF;`);
        
        return result['recordset'];
    }

    static async getByService(nro_servicio: number) {
        if (nro_servicio === undefined || nro_servicio === null || nro_servicio <= 0) {
            return { error: "Se necesita un número de servicio válido" };
        }

        const request = getDbPool().request();
        request.input('nro_servicio', nro_servicio);

        const result = await request.query(`SELECT nro_servicio,nombre_ser servicio,RIF FROM ServiciosOfre WHERE nro_servicio = @nro_servicio;`);
        
        return result['recordset'];
    }

    static async addService({ RIF_establecimiento, nro_servicio }: { 
        RIF_establecimiento: string, 
        nro_servicio: number 
    }) {
        if (RIF_establecimiento === undefined || RIF_establecimiento.length === 0) {
            return { error: "Se necesita el RIF del establecimiento" };
        }

        if (nro_servicio === undefined || nro_servicio <= 0) {
            return { error: "Se necesita un número de servicio válido" };
        }

        const request = getDbPool().request();
        request.input('RIF_establecimiento', RIF_establecimiento);
        request.input('nro_servicio', nro_servicio);

        const query = `INSERT INTO ServiciosOfrecidos (RIF_establecimiento, nro_servicio) VALUES (@RIF_establecimiento, @nro_servicio);`;

        const result = await request.query(query);
        return result['recordset'][0];
    }

    static async deleteService({ RIF_establecimiento, nro_servicio }: { 
        RIF_establecimiento: string, 
        nro_servicio: number 
    }) {
        if (RIF_establecimiento === undefined || RIF_establecimiento === null || RIF_establecimiento.length === 0) {
            return { error: "Se necesita el RIF del establecimiento" };
        }

        if (nro_servicio === undefined || nro_servicio === null || nro_servicio <= 0) {
            return { error: "Se necesita un número de servicio válido" };
        }

        const request = getDbPool().request();
        request.input('RIF_establecimiento', RIF_establecimiento);
        request.input('nro_servicio', nro_servicio);

        const query = `
            DELETE FROM ServiciosOfrecidos WHERE RIF_establecimiento = @RIF_establecimiento AND nro_servicio = @nro_servicio;
        `;

        const result = await request.query(query);
        
        if (result.rowsAffected[0] === 0) {
            return { error: "No se encontró el servicio ofrecido especificado." };
        }
        
        return result['recordset'][0];
    }

    static async getServicesNotOffered() {
        const request = getDbPool().request();
        const result = await request.query(`SELECT nro_servicio,nombre_ser servicio FROM ServiciosDisponibles WHERE nro_servicio NOT IN (SELECT nro_servicio FROM ServiciosOfrecidos);`);
        return result['recordset'];
    }


    static async getServicesNotOfferedRIF(RIF: string) {
        if (RIF === undefined || RIF === null || RIF.length === 0) {
            return { error: "Se necesita el RIF del establecimiento" };
        }

        const request = getDbPool().request();
        request.input('RIF', RIF);

        const result = await request.query(`SELECT * FROM serviciosNoDisponiblesRIF(@RIF);`);
        
        return result['recordset'];
    }


}