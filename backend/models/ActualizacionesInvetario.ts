import {getDbPool } from '../config/SQLserverConection'

export class ActulizationInteroyModel{


    static async getByEstablishment(RIF:string){
        if(RIF === null || RIF === undefined || RIF.length === 0){
            return {message: 'RIF requerido'}
        }

        const request = getDbPool().request()

        request.input('RIF',RIF)

        const result = await request.query('SELECT * FROM ActualizacoinesInventarios WHERE RIF_establecimiento = @RIF;')

        return result['recordset']
    }

    static async getByProduct(RIF:string, id_producto: number){
        if(RIF === null || RIF === undefined || RIF.length === 0){
            return {message: 'RIF requerido'}
        }

        if(id_producto === null || id_producto === undefined){
            return {message:'producto requerido'}
        }

        const request = getDbPool().request()

        request.input('RIF',RIF)
        request.input('id_producto',id_producto)


        const result = await request.query('SELECT * FROM ActualizacoinesInventarios WHERE RIF_establecimiento = @RIF AND id_producto = @id_producto;')
        return result['recordset']
    }

    static async newModification(RIF:string, id_producto: number, cantidad: number){
        if(RIF === null || RIF === undefined || RIF.length === 0){
            return {message: 'RIF requerido'}
        }

        if(id_producto === null || id_producto === undefined){
            return {message:'producto requerido'}
        }

        if(cantidad === null || cantidad === undefined){
            return {message:'cantidad requerida'}
        }

        const request = getDbPool().request()

        request.input('RIF',RIF)
        request.input('id_producto',id_producto)
        request.input('cantidad',cantidad)

        const result = await request.query('INSERT INTO ActualizacoinesInventarios (RIF_establecimiento, id_producto, cantidad) VALUES (@RIF, @id_producto, @cantidad);')
        
        return result['rowsAffected']
    }
}