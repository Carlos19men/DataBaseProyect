import { getDbPool } from '../config/SQLserverConection';

export class ComprasModel {

    static async getAll() {
        const result = await getDbPool().query('');
        return result['recordset'];
    }

    static async getByID(id: number) {
        const request = getDbPool().request();
        request.input('id', id);

        const result = await request.query('');
        return result['recordset'];
    }

    static async deleteByID(id: number) {
        const request = getDbPool().request();
        request.input('id', id);

        const result = await request.query('');
        return result['rowsAffected'];
    }
} 