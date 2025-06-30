import { getDbPool } from "../config/SQLserverConection";
import * as sql from 'mssql';

export class SuppliersModel{
    //get all Suppliers
    static async getAll(){

        const result = await getDbPool().query('SELECT * FROM Proveedores ORDER BY razon_social; ')
        return result['recordset'];
    }

    //get by RIF 
    static async getByRif(RIF:string){
        const request = getDbPool().request()

        request.input('RIF',RIF)

        const result = await request.query('SELECT * FROM Proveedores WHERE RIF = @RIF;')
        
        return result['recordset'][0];
    }

    static async create(RIF:string,razonSo:string,direccion:string,local_:string,telefono:string,persona_contacto:string){
        //create the request 

        const request = getDbPool().request()

        request.input('RIF',RIF)
        request.input('razonSo',razonSo)
        request.input('direccion',direccion)
        request.input('local_',local_)
        request.input('telefono',telefono)
        request.input('persona_contacto',persona_contacto)

        //execute the request 
        const result = await request.query('INSERT INTO Proveedores (RIF, razon_social, direccion, local_, telefono, persona_contacto) VALUES (@RIF, @razonSo, @direccion, @local_, @telefono, @persona_contacto);')

        return {rowsAffected: result['rowsAffected'][0]}      
    }

    static async update(RIF:string,razonSo:string,direccion:string,local_:string,telefono:string,persona_contacto:string){
        
        const request = getDbPool().request()

        request.input('RIF',sql.VarChar(20),RIF)
        request.input('razonSo',sql.VarChar(50),razonSo)
        request.input('direccion',sql.VarChar(100),direccion)
        request.input('local_',sql.VarChar(15),local_)
        request.input('telefono',sql.VarChar(15),telefono)
        request.input('persona_contacto',sql.VarChar(80),persona_contacto)

        const query = `UPDATE Proveedores SET
                        razon_social = ISNULL(@razonSo,razon_social), 
                        direccion = ISNULL(@direccion,direccion),
                        local_ = ISNULL(@local_,local_),
                        telefono = ISNULL(@telefono,telefono),
                        persona_contacto = ISNULL(@persona_contacto,persona_contacto) 
                    WHERE RIF = @RIF;` 

        //execute the request 
        const result = await request.query(query);

        return {rowsAffected: result['rowsAffected'][0]}     
    }

    static async deleted(RIF:string){
        const request = getDbPool().request()

        request.input('RIF',RIF)

        const result = await request.query('DELETE FROM Proveedores WHERE RIF = @RIF;')
        
        return {rowsAffected: result['rowsAffected'][0]}
    }

    static async getByOrderBuy(nroOC:number){
        const request = getDbPool().request()

        request.input('nroOC',nroOC)

        //execute the request
        const result = await request.query('SELECT * FROM obtenerProveedorOC(@nroOC);')

        return {rowsAffected: result['rowsAffected'][0]}
    }
        
}