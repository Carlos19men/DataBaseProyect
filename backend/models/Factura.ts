import { getDbPool } from "../config/SQLserverConection";

export class invoice{
    static async getAll(){
        const pool = await getDbPool();
        const result = await pool.query("SELECT * FROM Facturas ORDER BY fecha_emision DESC;");
        return result['recordset'];
    }

    static async getbyID({nro_factura}: {nro_factura: number}){
        if(nro_factura != null){
            if(nro_factura === undefined || nro_factura <= 0){
                return {error: "El número de factura no es válido"};
            }
        }

        const request = getDbPool().request();

        request.input('nro_factura', nro_factura);

        const query = `Select * from Facturas where nro_factura = @nro_factura`;

        const result = await request.query(query);
        return result['recordset'];
    }

   static async deleteInvoice({nro_factura}: {nro_factura: number}){
        if(nro_factura != null){
            if(nro_factura === undefined || nro_factura <= 0){
                return {error: "El número de factura no es válido"};
            }
        }

        const request = getDbPool().request();

        request.input('nro_factura', nro_factura);

        const query = `Delete from Facturas where nro_factura = @nro_factura`;

        const result = await request.query(query);
        return result['recordset'];
   }
}   