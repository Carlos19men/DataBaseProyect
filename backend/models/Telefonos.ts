import {  connectToDatabase, getDbPool } from "../config/SQLserverConection";

// const pool = getDbPool;

export class phonesCustomerModel{


    //get all customer with his phone
    static async getAll(){
        const pool = getDbPool()

        const result = await pool.query('SELECT * FROM GetAllTelefonosCliente ORDER BY apellido;')

        

        return result['recordset']
    }

    static async getByCI(CI: string){

        if(CI === undefined || CI === null || CI.length === 0) {
            return { error: "CI is required"}
        }

        const request = getDbPool().request()

        //agg the ci
        request.input('CI',CI);

        const result = await request.query('SELECT * FROM GetTelefonosClientes(@CI);')

        
        return result['recordset'][0]
    }

    static async newPhones({ CI, num1,num2}:{CI:string, num1:string,num2:string;}){

        if(CI === undefined || CI === null || CI.length === 0) {
            return { error: "CI is required" }
        }

        if(num1 === undefined || num1 === null || num1.length === 0) {
            return { error: "num1 is required" }
        }

        if(num2 === undefined || num2 === null || num2.length === 0) {
            return { error: "num2 is required" }
        }

        //agregamos los numeros 
        const request = getDbPool().request()

        request.input('CI', CI);
        request.input('num1', num1);
        request.input('num2', num2);

        const result = request.query('EXEC registrarTelefonos @CI,@num1,@num2;')

        

        return result
    }

    static async editPhone({CI,num,newNum}:{CI:string,num:string,newNum:string}){

        if(CI === undefined || CI === null || CI.length === 0) {
            return { error: "CI is required" }
        }

        if(num === undefined || num === null || num.length === 0) {
            return { error: "num1 is required" }
        }

        if(newNum === undefined || newNum === null || newNum.length === 0) {
            return { error: "num1 is required" }
        }

        const request = getDbPool().request()

        //agregamos los parametros 
        request.input('CI',CI)
        request.input('num',num)
        request.input('newNum',newNum)

        const result = request.query('EXEC registrarTelefonos @CI,@num,@newNum;')

        

        return result
    }
}

//este bloque es para probar solamente con este documento 
async function main() {
    await connectToDatabase();
    console.log("si");
    await phonesCustomerModel.newPhones({ CI: '10234567', num1: '456546',num2:'546465'}); // Espera a que getAll() termine
}
  
  main().catch((err) => console.error("Error en la ejecución principal:", err));