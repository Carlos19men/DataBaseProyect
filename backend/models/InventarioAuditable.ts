import { getDbPool } from "../config/SQLserverConection";

export class InventarioAuditableModel {
    static async getAlertas() {
        const pool = await getDbPool();
        const result = await pool.query(`
            SELECT 
                ia.id,
                ia.RIF_Establecimiento,
                ia.id_producto,
                ia.fecha,
                p.nombre as nombreProducto,
                i.cantidad,
                p.minimo,
                p.maximo,
                e.nombre as nombreEstablecimiento
            FROM InventarioAuditable ia
            LEFT JOIN Productos p ON ia.id_producto = p.id_producto
            LEFT JOIN Inventario i ON ia.RIF_Establecimiento = i.RIF_establecimiento 
                AND ia.id_producto = i.id_producto
            LEFT JOIN Establecimientos e ON ia.RIF_Establecimiento = e.RIF
            ORDER BY ia.fecha DESC
        `);
        return result['recordset'];
    }

    static async getAlertasByEstablecimiento(RIF: string) {
        const request = await getDbPool().request();
        request.input("RIF", RIF);

        const result = await request.query(`
            SELECT 
                ia.id,
                ia.RIF_Establecimiento,
                ia.id_producto,
                ia.fecha,
                p.nombre as nombreProducto,
                i.cantidad,
                p.minimo,
                p.maximo,
                e.nombre as nombreEstablecimiento
            FROM InventarioAuditable ia
            LEFT JOIN Productos p ON ia.id_producto = p.id_producto
            LEFT JOIN Inventario i ON ia.RIF_Establecimiento = i.RIF_establecimiento 
                AND ia.id_producto = i.id_producto
            LEFT JOIN Establecimientos e ON ia.RIF_Establecimiento = e.RIF
            WHERE ia.RIF_Establecimiento = @RIF
            ORDER BY ia.fecha DESC
        `);
        return result['recordset'];
    }

    static async limpiarAlertasAntiguas() {
        const pool = await getDbPool();
        const result = await pool.query(`
            DELETE FROM InventarioAuditable 
            WHERE fecha < DATEADD(day, -30, GETDATE())
        `);
        return result['rowsAffected'][0];
    }
} 