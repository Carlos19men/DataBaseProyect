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

        if(RIF === null || RIF === undefined || RIF.length === 0){
            return {message: 'RIF requerido'}
        }

        const request = getDbPool().request()

        request.input('RIF',RIF)

        const result = await request.query('SELECT * FROM Proveedores WHERE RIF = @RIF;')
        
        return result['recordset'][0];
    }

    static async create({RIF,razonSo,direccion,local_,telefono,persona_contacto}:{RIF:string,razonSo:string,direccion:string,local_:string,telefono:string,persona_contacto:string}){
        
        if(RIF === null || RIF === undefined || RIF.length === 0){
            return {error: 'RIF requerido'}
        }

        if(razonSo === null || razonSo === undefined || razonSo.length === 0){
            return {error: 'Razon social es requerida'}
        }

        if(direccion === null || direccion === undefined || direccion.length === 0){
            return {error: 'La dirección es requerida'}
        }

        if(local_ === null || local_ === undefined || local_.length === 0){
            return {error: 'El local es requerido'}
        }

        if(telefono === null || telefono === undefined || telefono.length === 0){
            return {error: 'El telefono es requerido '}
        }

        if(persona_contacto === null || persona_contacto === undefined || persona_contacto.length === 0){
            return {error: 'persona de contacto requerida'}
        }

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

        return {rowsAffected: result['rowsAffected'][0]};        
    }

    static async update({RIF,razonSo = null,direccion = null,local_ = null,telefono = null,persona_contacto = null}
        :{RIF ?:string | null,razonSo ?:string | null,direccion ?:string | null,local_ ?:string | null,telefono ?:string | null,persona_contacto ?:string | null}){
        
        if(RIF === null || RIF === undefined || RIF.length === 0){
            return {message: 'RIF requerido'}
        }

        /*if(razonSo === undefined || razonSo.length === 0){
            return {error: 'Ingrese una razón social válida'}
        }

        if(direccion === undefined || direccion.length === 0){
            return {error: 'Ingrese una dirección válida'}
        }

        if(local_ === undefined || local_.length === 0){
            return {error: 'Ingrese un local válido'}
        }

        if(telefono === undefined || telefono.length === 0){
            return {error: 'Ingrese un teléfono válido'}
        }

        if(persona_contacto === undefined || persona_contacto.length === 0){
            return {error: 'Ingrese una persona de contacto válida'}
        }*/

        
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

        return {rowsAffected: result['rowsAffected'][0]};       
    }

    static async deleted(RIF:string){
        if(RIF === null || RIF === undefined || RIF.length === 0){
            return {error: 'RIF requerido'}
        }

        const request = getDbPool().request()

        request.input('RIF',RIF)

        const result = await request.query('DELETE FROM Proveedores WHERE RIF = @RIF;')
        
        return {rowsAffected: result['rowsAffected'][0]};
    }

    static async getByOrderBuy(nroOC:number){
        if(nroOC === null || nroOC === undefined || nroOC < 0){
            return {message: 'El numero de la orden es requerido'}
        }

        const request = getDbPool().request()

        request.input('nroOC',nroOC)

        //execute the request
        const result = await request.query('SELECT * FROM obtenerProveedorOC(@nroOC);')

        return result['recordset']
    }
        
}