import { ConnectionPool } from "mssql";

export async function ValidateDB (pool: ConnectionPool){

    //verificamos si la base de datos existe 
    var request = pool.request()

    request.input('name','MU_DB')

    //verifiamos si la base de datos existe 
    if((await request.query('SELECT 1 FROM sys.databases WHERE name = @name'))['recordset'].length){

    }else{
        //la creamos 
        
    }

}

