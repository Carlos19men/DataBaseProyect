import { getDbPool } from '../config/SQLserverConection';

export class ActividadProductosModel {
    static async getAll() {
        const result = await getDbPool().query('SELECT * FROM ActividadProductos;');
        return result['recordset'];
    }

    static async getByID(id: number, nro_servicio: number,nro_correlativo: number) {
        const request = getDbPool().request();
        
        request.input('id', id);
        request.input('nro_servicio',nro_servicio)
        request.input('nro_correlativo',nro_correlativo)

        const result = await request.query('SELECT * FROM ActividadProductos WHERE nro_s = @nro_s AND nro_a = @nro_a;');
        return result['rowsAffected']
    }

    static async deleteByID(id: number) {

        const request = getDbPool().request();
        request.input('id', id);

        const result = await request.query('');
        return {rowsAffected: result['rowsAffected'][0]}
    }
} 