import {  getDbPool } from "../config/SQLserverConection";

export class customerModel {

    static async getAll(){

        const result = await getDbPool().query('select * from ObtenerClientes ORDER BY apellido;')

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

    static async edit({CI,name,lastName,email}:{CI:string | null,name:string | null, lastName:string | null, email: string | null;}){


        if(CI !== null) {
            if(CI === undefined || CI.length === 0) {
            return { error: "CI is required" }
            }
        }

        if(name !== null) {
            if(name === undefined || name.length === 0) {
                return { error: "name is required" }
            }
        }

        if(lastName !== null) {
            if(lastName === undefined || lastName.length === 0) {
                return { error: "lastName is required" }
            }
        }

        if(email !== null) {
            if(email === undefined || email.length === 0) {
                return { error: "email is required" }
            }
        }

        //agregamos los numeros
        const request = getDbPool().request()

        request.input('CI', CI);
        request.input('name', name);
        request.input('lastName', lastName);
        request.input('email', email);

        const result = await request.query('EXEC editarCliente @CI,@name,@lastName,@email;')

        return result['recordset']
    }
    
    static async add({CI,name,lastName,email}:{CI:string | null,name:string | null,lastName:string | null,email:string | null}){

        if(CI === undefined || CI === null || CI.length === 0) {
            return { error: "CI is required"}
        }
        if(name === undefined || name === null || name.length === 0) {
            return { error: "name is required"}
        }
        if(lastName === undefined || lastName === null || lastName.length === 0) {
            return { error: "lastName is required"}
        }
        if(email === undefined || email === null || email.length === 0) {
            return { error: "email is required"}
        }

        //agregamos la request
        const request = getDbPool().request()

        //agregamos los parametros 
        request.input('CI', CI);
        request.input('name', name);
        request.input('lastName', lastName);
        request.input('email', email);

        const result = await request.query('EXEC agregarCliente @CI,@name,@lastName,@email;')

        return result['rowsAffected']
    }

    static async delete(CI:string){
        if(CI === undefined || CI === null || CI.length === 0) {
            return { error: "CI is required"}
        }

        const request = getDbPool().request()

        request.input('CI', CI);

        const result = await request.query('EXEC eliminarCliente @CI;')

        return result['rowsAffected']
    }
}

