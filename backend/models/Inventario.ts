import { getDbPool } from "../config/SQLserverConection";

export class inventoryModel {
    static async getAll() {
        const pool = await getDbPool();
        const result = await pool.query(`
            SELECT i.*, p.nombre, p.minimo, p.maximo 
            FROM Inventario i 
            LEFT JOIN Productos p ON i.id_producto = p.id_producto
        `);
        return result['recordset'];
    }

    static async getByRIF(RIF: string) { // Obtiene todos los productos de un establecimiento por su RIF.
        const request = await getDbPool().request()
        request.input("RIF", RIF)

        const result = await request.query(`
            SELECT i.*, p.nombre, p.minimo, p.maximo 
            FROM Inventario i 
            LEFT JOIN Productos p ON i.id_producto = p.id_producto 
            WHERE i.RIF_establecimiento = @RIF
        `);
        return result['recordset'];
    }

    //static async getByProductId(id_producto: number) {

    // Agrega un producto al inventario de un establecimiento.
    static async addProduct(RIF: string, id_producto: number, cantidad: number) {
        const request = await getDbPool().request();
        request.input("RIF", RIF);
        request.input("id_producto", id_producto);
        request.input("cantidad", cantidad);

        const query = `Insert into Inventario (RIF_establecimiento, id_producto, cantidad) values 
        (@RIF, @id_producto, @cantidad)`;

        const result = await request.query(query);
        return {rowsAffected: result['rowsAffected'][0]};
    }

    // Actualiza la cantidad de un producto en el inventario de un establecimiento.
    static async updateInventory(RIF: string, id_producto: number, cantidad: number) {
        const request = await getDbPool().request();
        request.input("RIF", RIF);
        request.input("id_producto", id_producto);
        request.input("cantidad", cantidad);

        const query = `UPDATE Inventario SET cantidad = isNULL(@cantidad, cantidad) 
        WHERE RIF_establecimiento = @RIF and id_producto = @id_producto`;
        
        const result = await request.query(query);
        return {rowsAffected: result['rowsAffected'][0]};
    }

    // Elimina un producto del inventario de un establecimiento.
    static async deleteProduct(RIF: string, id_producto: number) {
        const request = await getDbPool().request();
        request.input("id", id_producto);
        request.input("RIF", RIF);

        const query = `DELETE FROM Inventario WHERE RIF_establecimiento = @RIF and id_producto = @id`;
        
        const result = await request.query(query);
        return {rowsAffected: result['rowsAffected'][0]}; 
    }
}