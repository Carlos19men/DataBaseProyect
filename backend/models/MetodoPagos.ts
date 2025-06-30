import {  getDbPool } from "../config/SQLserverConection";

export class paymentMethods{
    static async getAll(){

        const result = await getDbPool().query('SELECT * FROM obtenerMetodosPago;')

        return result['recordset']
    }

    static async getAllOrderByFactura(){

        const result = await getDbPool().query('SELECT * FROM obtenerMetodosPago ORDER BY FacturaCorrespondiente;')

        return result['recordset'][0]
    }

    static async getByClient(id_cliente:number){
        const request = getDbPool().request();

        request.input('@id_cliente',id_cliente);

        const result = await request.query('SELECT * FROM ObtenerMetodoPagoPorCliente(@id_cliente);')

        return result['recordset'][0] || { error: "Buy orden not found" };
    }

    static async create(tipo_moneda:string,monto_ef:number,fechaPago_Tar:string,tipo_tarjeta:string,banco:string,nro_tarjeta:string,monto_tar:number,referenciaPM:string,fecha_PM:string,monto_PM:number,telefono:string){
        //request
        const request = getDbPool().request();

        //inputs
        request.input('tipo_moneda',tipo_moneda);
        request.input('monto_ef',monto_ef);
        request.input('fechaPago_Tar',fechaPago_Tar);
        request.input('tipo_tarjeta',tipo_tarjeta);
        request.input('banco',banco);
        request.input('nro_tarjeta',nro_tarjeta);
        request.input('monto_tar',monto_tar);
        request.input('referenciaPM',referenciaPM);
        request.input('fecha_PM',fecha_PM);
        request.input('monto_PM',monto_PM);
        request.input('telefono',telefono);

        const result = await request.query('EXEC nuevaMetodoPago @tipo_moneda,@monto_ef,@fechaPago_Tar,@tipo_tarjeta,@banco,@nro_tarjeta,@monto_tar,@referenciaPM,@fecha_PM,@monto_PM,@telefono;')

        return {rowsAffected: result['recordset'][0]}
    }

    static async edit({id_pago,tipo_moneda,monto_ef,fechaPago_Tar,tipo_tarjeta,banco,nro_tarjeta,monto_tar,referenciaPM,fecha_PM,monto_PM,telefono}:{id_pago: number,tipo_moneda:string,monto_ef:number,fechaPago_Tar:string,tipo_tarjeta:string,banco:string,nro_tarjeta:string,monto_tar:number,referenciaPM:string,fecha_PM:string,monto_PM:number,telefono:string}){
        //request
        const request = getDbPool().request();

        //inputs
        request.input('id_pago',id_pago);
        request.input('tipo_moneda',tipo_moneda);
        request.input('monto_ef',monto_ef);
        request.input('fechaPago_Tar',fechaPago_Tar);
        request.input('tipo_tarjeta',tipo_tarjeta);
        request.input('banco',banco);
        request.input('nro_tarjeta',nro_tarjeta);
        request.input('monto_tar',monto_tar);
        request.input('referenciaPM',referenciaPM);
        request.input('fecha_PM',fecha_PM);
        request.input('monto_PM',monto_PM);
        request.input('telefono',telefono);

        const result = await request.query('EXEC editarMetodoPago @id_pago,@tipo_moneda,@monto_ef,@fechaPago_Tar,@tipo_tarjeta,@banco,@nro_tarjeta,@monto_tar,@referenciaPM,@fecha_PM,@monto_PM,@telefono;')

        return {rowsAffected: result['recordset'][0]}
    }

    static async delete(id_pago:number){
        //request
        const request = getDbPool().request();

        //inputs
        request.input('id_pago',id_pago);

        const result = await request.query('DELETE MetodosPago WHERE id_pago = @id_pago;')

        return {rowsAffected: result['recordset'][0]}
    }
}