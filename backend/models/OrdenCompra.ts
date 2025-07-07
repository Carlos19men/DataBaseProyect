import { getDbPool } from "../config/SQLserverConection";
import sql from 'mssql';

interface ProductOrder {
    id_producto: number;
    cant_producto: number;
    precio: number;
}

export class buysOrderModel {
    static async getAll() {
        const result = await getDbPool().query('SELECT * FROM OrdenesCompra ORDER BY fecha_compra;')
        return result['recordset']
    }

    static async getByID(numOC: number) {
        const request = getDbPool().request();
        request.input('numOC', numOC);
        const result = await request.query('SELECT * FROM OrdenesCompra WHERE nro_OC = @numOC;')
        return result['recordset'][0] || { error: "Buy orden not found" };
    }

    static async create(fecha_compra: Date, RIF_Est: string, RIF_proveedor: string, productos: ProductOrder[]) {
        const pool = getDbPool();
        const transaction = new sql.Transaction(pool);

        try {
            await transaction.begin();

            let ordenCompraId = null;

            // Create the main purchase order first
            const requestOrden = new sql.Request(transaction);
            requestOrden.input('fecha_compra', sql.Date, fecha_compra);
            requestOrden.input('RIF_Est', RIF_Est);
            requestOrden.input('RIF_proveedor', RIF_proveedor);

            const resultOrden = await requestOrden.query(
                'INSERT INTO OrdenesCompra (fecha_compra, RIF_Est, RIF_proveedor) OUTPUT INSERTED.nro_OC VALUES (@fecha_compra, @RIF_Est, @RIF_proveedor);'
            );

            ordenCompraId = resultOrden.recordset[0].nro_OC;

            // Insert each product
            for (const producto of productos) {
                const requestDetalle = new sql.Request(transaction);
                requestDetalle.input('nro_OC', ordenCompraId);
                requestDetalle.input('id_producto', producto.id_producto);
                requestDetalle.input('cant_producto', producto.cant_producto);
                requestDetalle.input('precio', producto.precio);

                await requestDetalle.query(
                    'INSERT INTO DetalleOrdenCompra (nro_OC, id_producto, cant_producto, precio) VALUES (@nro_OC, @id_producto, @cant_producto, @precio);'
                );
            }

            await transaction.commit();
            return { success: true, ordenCompraId };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    static async edit(num_compra: number, fecha_compra: string, RIF_Est: string, RIF_proveedor: string, id_producto: number, cant_producto: number, precio: number) {
        const request = getDbPool().request();

        request.input('num_compra', num_compra);
        request.input('fecha_compra', fecha_compra);
        request.input('RIF_Est', RIF_Est);
        request.input('RIF_proveedor', RIF_proveedor);
        request.input('id_producto', id_producto);
        request.input('cant_producto', cant_producto);
        request.input('precio', precio);

        const result = await request.query('EXEC editarOrdenCompra @num_compra,@fecha_compra,@RIF_Est,@RIF_proveedor,@id_producto,@cant_producto,@precio;')

        return { rowsAffected: result['recordset'][0] }
    }

    static async delete(num_compra: number) {
        const request = getDbPool().request();
        request.input('num_compra', num_compra);
        const result = await request.query('EXEC eliminarOrdenCompra @num_compra;')
        return { rowsAffected: result['recordset'][0] }
    }
}