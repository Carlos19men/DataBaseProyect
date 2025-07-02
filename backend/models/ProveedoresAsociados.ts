import { getDbPool } from "../config/SQLserverConection";

export class associatedEmployeesModel{

    static async getAll(){
        const result = await getDbPool().query('SELECT * FROM ProveedoresAsociados ORDER BY RIF_proveedor; ')
        return result['recordset'];
    }

    static async getByRif(RIF: string){
        const request = getDbPool().request()
        request.input('RIF',RIF)
        const result = await request.query('SELECT * FROM ProveedoresAsociados WHERE RIF_proveedor = @RIF;')
        return result['recordset'];
    }

    static async insert(RIF_proveedor: string, nro_orden: number) {
        const request = getDbPool().request();
        request.input('RIF_proveedor', RIF_proveedor);
        request.input('nro_orden', nro_orden);
        const result = await request.query('INSERT INTO ProveedoresAsociados (RIF_proveedor, nro_orden) VALUES (@RIF_proveedor, @nro_orden);');
        return { rowsAffected: result['rowsAffected'][0] };
    }

    static async update(RIF_proveedor: string, nro_orden: number, new_RIF_proveedor: string, new_nro_orden: number) {
        const request = getDbPool().request();
        request.input('RIF_proveedor', RIF_proveedor);
        request.input('nro_orden', nro_orden);
        request.input('new_RIF_proveedor', new_RIF_proveedor);
        request.input('new_nro_orden', new_nro_orden);
        const result = await request.query('UPDATE ProveedoresAsociados SET RIF_proveedor = ISNULL(@new_RIF_proveedor, RIF_proveedor), nro_orden = ISNULL(@new_nro_orden, nro_orden) WHERE RIF_proveedor = @RIF_proveedor AND nro_orden = @nro_orden;');
        return { rowsAffected: result['rowsAffected'][0] };
    }

    static async delete(RIF_proveedor: string, nro_orden: number) {
        const request = getDbPool().request();
        request.input('RIF_proveedor', RIF_proveedor);
        request.input('nro_orden', nro_orden);
        const result = await request.query('DELETE FROM ProveedoresAsociados WHERE RIF_proveedor = @RIF_proveedor AND nro_orden = @nro_orden;');
        return { rowsAffected: result['rowsAffected'][0] };
    }
}