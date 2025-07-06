import { getDbPool } from "../config/SQLserverConection";

export class invoice{
    static async getAll(){
        const pool = await getDbPool();
        const result = await pool.query("SELECT * FROM Facturas ORDER BY fecha_emision DESC;");
        return result['recordset'];
    }

    static async getbyID(nro_factura: number){
        const request = getDbPool().request();

        request.input('nro_factura', nro_factura);

        //hacer 
        const query = `Select * from Facturas where nro_factura = @nro_factura`;

        const result = await request.query(query);
        return result['recordset'];
    }

   static async deleteInvoice(nro_factura: number){
        const request = getDbPool().request();

        request.input('nro_factura', nro_factura);

        const query = `Delete from Facturas where nro_factura = @nro_factura`;

        const result = await request.query(query);
        return result['recordset'];
    }

    static async getClientData(cod_OS: number){
        const request = getDbPool().request();

        request.input('cod_OS',cod_OS);

        const query = `SELECT * FROM dbo.ObtenerDatosCliente(@cod_OS)`;

        const result =  await request.query(query);
        return result['recordset'];
    }

    static async getFacturaData(cod_OS: number){
        const request = getDbPool().request();

        request.input('cod_OS',cod_OS);

        const query = `SELECT * FROM dbo.ObtenerDatosFactura(@cod_OS);`;

        const result =  await request.query(query);
        return result['recordset'];
    }

    static async getVehicleData(cod_OS: number){
        const request = getDbPool().request();

        request.input('cod_OS',cod_OS);

        const query = `SELECT * FROM dbo.ObtenerDatosVehiculo(@cod_OS);`;

        const result =  await request.query(query);
        return result['recordset'];
    }

    static async getPaymentData(cod_OS: number){
        const request = getDbPool().request();

        request.input('cod_OS',cod_OS);

        const query = `SELECT * FROM dbo.ObtenerDatosPago(@cod_OS);`;

        const result =  await request.query(query);
        return result['recordset'];
    }

    static async getEstablishmentData(cod_OS: number){
        const request = getDbPool().request();

        request.input('cod_OS',cod_OS);

        const query = `SELECT * FROM dbo.ObtenerDatosEstablecimientos(@cod_OS);`;

        const result =  await request.query(query);
        return result['recordset'];
    }

     static async getServiceData(cod_OS: number){
        const request = getDbPool().request();

        request.input('cod_OS',cod_OS);

        const query = `SELECT * FROM dbo.ObtenerDatosServicios(@cod_OS);`;

        const result =  await request.query(query);
        return result['recordset'];
    }

    static async getMontosData(cod_OS: number){
        const request = getDbPool().request();

        request.input('cod_OS',cod_OS);

        const query = `SELECT * FROM dbo.ObtenerDatosMontos(@cod_OS);`;

        const result =  await request.query(query);
        return result['recordset'];
    }

    static async createFromOrder(cod_OS: number, iva?: number, fecha_emision?: string) {
        const request = getDbPool().request();
        request.input('cod_OS', cod_OS);
        if (iva !== undefined) request.input('iva', iva);
        if (fecha_emision !== undefined) request.input('fecha_emision', fecha_emision);
        const result = await request.execute('CrearFacturaDesdeOrdenServicio');
        return result.recordset;
    }
}   