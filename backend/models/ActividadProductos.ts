import { getDbPool } from '../config/SQLserverConection';

export class ActividadProductosModel {

    static async getAll() {
        const result = await getDbPool().query('');
        return result['recordset'];
    }

    static async getByID(id: number) {
        if (id === undefined || id === null || id <= 0) {
            return { error: "Se necesita el ID de la actividad de producto" };
        }

        const request = getDbPool().request();
        request.input('id', id);

        const result = await request.query('SELECT * FROM ActividadProductos WHERE nro_s = @nro_s AND nro_a = @nro_a;');
        return result['recordset'];
    }

    static async deleteByID(id: number) {
        if (id === null || id === undefined || id <= 0) {
            return { error: "Se necesita el ID de la actividad de producto" };
        }

        const request = getDbPool().request();
        request.input('id', id);

        const result = await request.query('');
        return result['rowsAffected'];
    }
} 