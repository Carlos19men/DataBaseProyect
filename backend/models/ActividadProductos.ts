import { getDbPool } from '../config/SQLserverConection';

export class ActividadProductosModel {
    static async getAll() {
        const result = await getDbPool().query('SELECT * FROM ActividadProductos;');
        return result['recordset'];
    }

    static async getByID(id_producto: number, nro_servicio: number, nro_correlativo: number) {
        const request = getDbPool().request();
        
        request.input('id_producto', id_producto);
        request.input('nro_servicio', nro_servicio);
        request.input('nro_correlativo', nro_correlativo);
        
        const result = await request.query('SELECT * FROM ActividadProductos WHERE id_producto = @id_producto AND nro_servicio = @nro_servicio AND nro_correlativo = @nro_correlativo;');
        
        return result['recordset'][0];
    }

    static async deleteByID(id_producto: number, nro_servicio: number, nro_correlativo: number) {
        const request = getDbPool().request();
        request.input('id_producto', id_producto);
        request.input('nro_servicio', nro_servicio);
        request.input('nro_correlativo', nro_correlativo);
        const result = await request.query('DELETE FROM ActividadProductos WHERE id_producto = @id_producto AND nro_servicio = @nro_servicio AND nro_correlativo = @nro_correlativo;');
        return { rowsAffected: result['rowsAffected'][0] };
    }

    static async create(data: { id_producto: number, nro_servicio: number, nro_correlativo: number, cant_utilizada: number }) {
        const request = getDbPool().request();
        
        request.input('id_producto', data.id_producto);
        request.input('nro_servicio', data.nro_servicio);
        request.input('nro_correlativo', data.nro_correlativo);
        request.input('cant_utilizada', data.cant_utilizada);
        
        const result = await request.query(
            'INSERT INTO ActividadProductos (id_producto, nro_servicio, nro_correlativo, cant_utilizada) VALUES (@id_producto, @nro_servicio, @nro_correlativo, @cant_utilizada);'
        );
        
        return { rowsAffected: result['rowsAffected'][0] };
    }

    static async update(data: { id_producto: number, nro_servicio: number, nro_correlativo: number, cant_utilizada: number }) {
        const request = getDbPool().request();
        request.input('id_producto', data.id_producto);
        request.input('nro_servicio', data.nro_servicio);
        request.input('nro_correlativo', data.nro_correlativo);
        request.input('cant_utilizada', data.cant_utilizada);
        const result = await request.query(
            'UPDATE ActividadProductos SET cant_utilizada = @cant_utilizada WHERE id_producto = @id_producto AND nro_servicio = @nro_servicio AND nro_correlativo = @nro_correlativo;'
        );
        return { rowsAffected: result['rowsAffected'][0] };
    }
} 