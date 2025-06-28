import {  getDbPool } from "../config/SQLserverConection";

export class buysOrderModel{
    static async getAll(){

        const result = await getDbPool().query('SELECT * FROM OrdenesCompra ORDER BY fecha_compra;')

        return result['recordset']
    }

    static async getByID(numOC:number){
        if ((numOC === null) || (numOC === undefined)) {
            return('error: id is required');
        } else {
            const request = getDbPool().request();

            request.input('numOC',numOC);

            const result = await request.query('SELECT * FROM OrdenesCompra WHERE nro_OC = @numOC;')
   
            return result['recordset'][0] || { error: "Buy orden not found" };
        }
    }

    static async create({fecha_compra,RIF_Est,RIF_proveedor,id_producto,cant_producto,precio}:{fecha_compra:string,RIF_Est:string,RIF_proveedor:string,id_producto:number,cant_producto:number,precio:number}){
        if ((fecha_compra === null) || (fecha_compra === undefined) || (fecha_compra.length === 0)) {
            return {error: 'Date is required'}
        }
        if ((RIF_Est === null) || (RIF_Est === undefined) || (RIF_Est.length === 0)) {
            return {error: 'RIF Establecimiento is required'}
        } 
        if ((RIF_proveedor === null) || (RIF_proveedor === undefined) || (RIF_proveedor.length === 0)) {
            return {error: 'RIF Proveedor is required'}
        }  
        if ((id_producto === null) || (id_producto === undefined)) {
            return {error: 'Product is required'}
        } 
        if ((cant_producto === null) || (cant_producto === undefined)) {
            return {error: 'Cantidad de producto is required'}
        }  
        if ((precio === null) || (precio === undefined)) {
            return {error: 'Precio is required'}
        }    

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

        return result['recordset']
    }

    static async edit({num_compra,fecha_compra,RIF_Est,RIF_proveedor,id_producto,cant_producto,precio}:{num_compra:number,fecha_compra:string,RIF_Est:string,RIF_proveedor:string,id_producto:number,cant_producto:number,precio:number}){
        if (num_compra !== null) {
            if (num_compra === undefined) {
                return {error: 'Numero de compra is required'}
            }
        }
        
        if (fecha_compra !== null) {
            if ((fecha_compra === undefined) || (fecha_compra.length === 0)) {
                return {error: 'Date is required'}
            }  
        }
        
        if (RIF_Est !== null) {
            if ((RIF_Est === undefined) || (RIF_Est.length === 0)) {
                return {error: 'RIF Establecimiento is required'}
            }    
        }
        
        if (RIF_proveedor !== null) {
            if ((RIF_proveedor === undefined) || (RIF_proveedor.length === 0)) {
                return {error: 'RIF Proveedor is required'}
            }    
        }
         
        if (id_producto !== null) {
            if (id_producto === undefined) {
                return {error: 'Product is required'}
            }    
        }
        
        if (cant_producto !== null) {
            if (cant_producto === undefined){
                return {error: 'Cantidad de producto is required'}
            }     
        }
         
        if (precio !== null) {
            if ((precio === null) || (precio === undefined)) {
                return {error: 'Precio is required'}
            }    
        } 

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

        return result['recordset']
    }

    static async delete(num_compra:number){
        if ((num_compra === null) || (num_compra === undefined)) {
            return {error: 'Numero de compra is required'}
        }

        //request
        const request = getDbPool().request();

        //inputs
        request.input('num_compra',num_compra);

        const result = await request.query('EXEC eliminarOrdenCompra @num_compra;')

        return result['recordset']
    }
}