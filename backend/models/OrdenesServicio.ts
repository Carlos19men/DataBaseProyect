import { getDbPool } from '../config/SQLserverConection';

export class OrdenesServicioModel {

    static async getAll() {
        const result = await getDbPool().query('');
        return result['recordset'];
    }

    static async getByID(id: number) {
        if (id === undefined || id === null || id <= 0) {
            return { error: "Se necesita el ID de la orden de servicio" };
        }

        const request = getDbPool().request();
        request.input('id', id);

        const result = await request.query('');
        console.log(result['recordset']);
        return result['recordset'];
    }

    static async deleteByID(id: number) {
        if (id === null || id === undefined || id <= 0) {
            return { error: "Se necesita el ID de la orden de servicio" };
        }

        const request = getDbPool().request();
        request.input('id', id);

        const result = await request.query('');
        return result['rowsAffected'];
    }
} 