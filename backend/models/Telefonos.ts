import { getDbPool } from "../config/SQLserverConection";

// const pool = getDbPool;

export class phonesCustomerModel{


    //get all customer with his phone
    static async getAll(){
        const pool = getDbPool()

        const result = await pool.query('SELECT * FROM GetAllTelefonosCliente ORDER BY apellido;')

        return result['recordset']
    }

    static async getByCI(CI: string){
        const request = getDbPool().request()

        //agg the ci
        request.input('CI',CI);

        const result = await request.query('SELECT * FROM GetTelefonosClientes(@CI);')

        return result['recordset'][0]
    }

    static async newPhones({ CI, num1,num2}:{CI:string, num1:string,num2:string;}){
        //agregamos los numeros 
        const request = getDbPool().request()

        request.input('CI', CI);
        request.input('num1', num1);
        request.input('num2', num2);

        const result = await request.query('EXEC registrarTelefonos @CI,@num1,@num2;')

        return {rowsAffected: result['rowsAffected'][0]}
    }

    static async editPhone({CI,num,newNum}:{CI:string,num:string,newNum:string}){
        const request = getDbPool().request()

        //agregamos los parametros 
        request.input('CI',CI)
        request.input('num',num)
        request.input('newNum',newNum)

        const result = await request.query('EXEC registrarTelefonos @CI,@num,@newNum;')

        return {rowsAffected: result['rowsAffected'][0]}
    }
}