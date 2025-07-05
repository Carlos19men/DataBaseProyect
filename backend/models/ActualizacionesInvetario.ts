import {getDbPool } from '../config/SQLserverConection'

export class ActulizationInteroyModel{


    static async getByEstablishment(RIF:string){

        const request = getDbPool().request()

        request.input('RIF',RIF)

        const result = await request.query('SELECT * FROM ActualizacionesInventarios WHERE RIF_establecimiento = @RIF;')

        return result['recordset']
    }

    static async getByProduct(RIF:string, id_producto: number){

        const request = getDbPool().request()

        request.input('RIF',RIF)
        request.input('id_producto',id_producto)


        const result = await request.query('SELECT * FROM ActualizacionesInventarios WHERE RIF_establecimiento = @RIF AND id_producto = @id_producto;')
        return result['recordset']
    }

    static async newModification(RIF:string, id_producto: number, cantidad: number, tipo: string){
        const request = getDbPool().request()

        request.input('RIF',RIF)
        request.input('id_producto',id_producto)
        request.input('cantidad',cantidad)
        request.input('tipo',tipo)

        const result = await request.query('INSERT INTO ActualizacionesInventarios (RIF_establecimiento, id_producto, cantidad, tipo) VALUES (@RIF, @id_producto, @cantidad, @tipo);')
        
        return {rowsAffected: result['rowsAffected'][0]}
    }
}