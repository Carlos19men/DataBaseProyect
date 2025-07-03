import {  getDbPool } from "../config/SQLserverConection";

export class buysOrderModel{
    static async getAll(){

        const result = await getDbPool().query('SELECT * FROM OrdenesCompra ORDER BY fecha_compra;')

        return result['recordset']
    }

    static async getByID(numOC:number){
        const request = getDbPool().request();

        request.input('numOC',numOC);

        const result = await request.query('SELECT * FROM OrdenesCompra WHERE nro_OC = @numOC;')

        return result['recordset'][0] || { error: "Buy orden not found" };
    }

    static async create(fecha_compra:string,RIF_Est:string,RIF_proveedor:string,id_producto:number,cant_producto:number,precio:number){
        //request
        const request = getDbPool().request();

        //inputs
        request.input('fecha_compra',fecha_compra);
        request.input('RIF_Est',RIF_Est);
        request.input('RIF_proveedor',RIF_proveedor);
        request.input('id_producto',id_producto);
        request.input('cant_producto',cant_producto);
        request.input('precio',precio);

        const result = await request.query('EXEC nuevaOrdenCompra @fecha_compra,@RIF_Est,@RIF_proveedor,@id_producto,@cant_producto,@precio;')

        return {rowsAffected: result['recordset'][0]}
    }

    static async edit(num_compra:number,fecha_compra:string,RIF_Est:string,RIF_proveedor:string,id_producto:number,cant_producto:number,precio:number){
        //request
        const request = getDbPool().request();

        //inputs
        request.input('num_compra',num_compra);
        request.input('fecha_compra',fecha_compra);
        request.input('RIF_Est',RIF_Est);
        request.input('RIF_proveedor',RIF_proveedor);
        request.input('id_producto',id_producto);
        request.input('cant_producto',cant_producto);
        request.input('precio',precio);

        const result = await request.query('EXEC editarOrdenCompra @num_compra,@fecha_compra,@RIF_Est,@RIF_proveedor,@id_producto,@cant_producto,@precio;')

        return {rowsAffected: result['recordset'][0]}
    }

    static async delete(num_compra:number){
        //request
        const request = getDbPool().request();

        //inputs
        request.input('num_compra',num_compra);

        const result = await request.query('EXEC eliminarOrdenCompra @num_compra;')

        return {rowsAffected: result['recordset'][0]}
    }
}