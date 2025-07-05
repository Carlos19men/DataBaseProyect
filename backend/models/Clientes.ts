import {  getDbPool } from "../config/SQLserverConection";

export class customerModel {

    static async getAll(){

        const result = await getDbPool().query('select * from ObtenerClientes ORDER BY cliente;')

        return result['recordset']
    }

    static async getByCI(CI:string){

        if(CI === undefined || CI === null || CI.length === 0) {
            return { error: "CI is required"}
        }

        const request = getDbPool().request()

        //agg the ci
        request.input('CI',CI); 

        const result = await request.query('SELECT * FROM ObtenerCliente(@CI);');

        return result['recordset'][0] || { error: "Customer not found" }; // Return the first record or an error if not found
    }

    static async edit(CI:string | null,name:string | null, lastName:string | null, email: string | null){

        //agregamos los numeros
        const request = getDbPool().request()

        request.input('CI', CI);
        request.input('name', name);
        request.input('lastName', lastName);
        request.input('email', email);

        const result = await request.query('EXEC editarCliente @CI,@name,@lastName,@email;')

        return {rowsAffected: result['rowsAffected'][0]}
    }
    
    static async add(CI:string | null,name:string | null,lastName:string | null,email:string | null){
        //agregamos la request
        const request = getDbPool().request()

        //agregamos los parametros 
        request.input('CI', CI);
        request.input('name', name);
        request.input('lastName', lastName);
        request.input('email', email);

        const result = await request.query('INSERT INTO Clientes (CI_cliente, nombre_cli, apellido_cli, email) VALUES (@CI,@name, @lastName, @email); ')

        return {rowsAffected: result['rowsAffected'][0]}
    }

    static async delete(CI:string){

        const request = getDbPool().request()

        request.input('CI', CI);

        const result = await request.query('DELETE FROM Clientes WHERE CI_cliente = @CI;')

        return {rowsAffected: result['rowsAffected'][0]}
    }
}

