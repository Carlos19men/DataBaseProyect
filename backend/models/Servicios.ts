import { getDbPool } from "../config/SQLserverConection";

export class ServicesModel {
    
    static async getAll() {
        const pool = getDbPool();
        const result = await pool.query('SELECT * FROM Servicios ORDER BY nombre_ser;');
        return result['recordset'];
    }

    static async getById(id: number) {
        if (id === undefined || id === null || id <= 0) {
            return { error: "Se necesita el ID del servicio" };
        }

        const request = getDbPool().request();
        request.input('id', id);

        const result = await request.query('SELECT * from Servicios where nro_servicio = @id;');
        return result['recordset'][0];
    }

    static async editService ({nro_servicio, CI_superv, nombre_serv}: { nro_servicio: number | null, CI_superv: string | null, nombre_serv: string | null}){
        if(nro_servicio !== null) {
            if (nro_servicio === undefined || nro_servicio <= 0) {
                return { error: "El número de servicio es inválido" };
            }
        }

        if(CI_superv !== null){
            if(CI_superv === undefined || CI_superv === null || CI_superv.length === 0){
                return {error: "La cédula del supervisor es inválida"};
            }
        }

        if (nombre_serv !== null) {
            if (nombre_serv === undefined || nombre_serv.length === 0) {
                return { error: "El nombre del servicio es inválido" };
            }
        }

        const request = getDbPool().request();
        request.input('nro_servicio', nro_servicio);
        request.input('CI_superv', CI_superv);
        request.input('nombre_serv', nombre_serv);

        const query = `Update Servicios set
        nro_servicio = @nro_servicio,
        CI_superv = @CI_superv,
        nombre_ser = @nombre_serv
        where nro_servicio = @nro_servicio;`;

        const result = await request.query(query);
        return result['recordset'];
    }

    static async deleteService({nro_servicio}: {nro_servicio: number}){
        if(nro_servicio !== null){
            if(nro_servicio === undefined || nro_servicio <= 0){
                return {error: "El número de servicio es inválido"};
            }
        }

        const request = getDbPool().request();
        request.input('nro_servicio', nro_servicio);

        const query = `Delete from Servicios where nro_servicio = @nro_servicio;`;
        const result = await request.query(query);
        return result['recordset'];
    }

}