import {  getDbPool } from "../config/SQLserverConection";

// const pool = getDbPool;

export class customer {

    static async getAll(){

        const pool = getDbPool()

        const result = await pool.query('select * from ObtenerClientes ORDER BY apellido;')

        console.log(result['recordset'])

        return result['recordset']
    }

    static async getByCI({ CI }: { CI: string; }){

        if(CI === undefined || CI === null || CI.length === 0) {
            return { error: "CI is required"}
        }

        const request = getDbPool().request()

        //agg the ci
        request.input('CI',CI); 

        const result = await request.query('SELECT * FROM ObtenerCliente(@CI);');

        console.log(result['recordset'])
        return result
    }

    static async editCustomer({CI,name,lastName,email}:{CI:string | null,name:string | null, lastName:string | null, email: string | null;}){


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

        console.log(result['recordset'])

        return result['recordset']
    }
    
}

