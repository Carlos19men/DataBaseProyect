import { getDbPool } from "../config/SQLserverConection";
import * as sql from 'mssql';

export class ServicesModel {
    
    static async getAll() {
        //creamos la request y asignamos los paramentros 
        const pool = getDbPool();

        //enviamos la query y capturamos las columnas afectadas 
        const result = await pool.query('SELECT * FROM Servicios ORDER BY nro_servicio;');
        return result['recordset'];
    }

    static async getById(id: number) {
        //creamos la request y asignamos los paramentros 
        const request = getDbPool().request();
        request.input('id', id);

        //enviamos la query y capturamos las columnas afectadas 
        const result = await request.query('SELECT * from Servicios where nro_servicio = @id;');
        return result['recordset'][0];
    }

    static async editService ( nro_servicio: number,nombre_serv: string){
       
        //creamos la request y asignamos los paramentros 
        const request = getDbPool().request();
        request.input('nro_servicio', sql.Int,nro_servicio);
        request.input('nombre_serv', sql.VarChar(50),nombre_serv);

        //cuerpo de query 
        const query = `Update Servicios set
        nombre_ser = ISNULL(@nombre_serv, nombre_ser)
        where nro_servicio = @nro_servicio;`;

        //enviamos la query y capturamos las columnas afectadas 
        const result = await request.query(query);
        return {rowsAffected: result['rowsAffected'][0]};
    }

    static async deleteService(nro_servicio: number){
        //creamos la request y asignamos los paramentros 
        const request = getDbPool().request();
        request.input('nro_servicio',sql.Int, nro_servicio);

        //enviamos la query y capturamos las columnas afectadas 
        const query = `Delete from Servicios where nro_servicio = @nro_servicio;`;
        const result = await request.query(query);
        return { rowsAffected: result['rowsAffected'][0] };
    } 

    static async createService(nombre_serv: string) {
        //creamos la request y asignamos los paramentros 
        const request = getDbPool().request();
        request.input('nombre_serv', nombre_serv);

        //cuerpo de la query
        const query = `INSERT INTO Servicios (nombre_ser) VALUES (@nombre_serv);`;
        
        //enviamos la query y capturamos las columnas afectadas 
        const result = await request.query(query);
        return { rowsAffected: result['rowsAffected'][0] };
    }

}