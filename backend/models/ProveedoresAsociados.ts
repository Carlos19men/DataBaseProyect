import { getDbPool } from "../config/SQLserverConection";

export class associatedEmployeesModel{


    static async getAll(){

        const result = await getDbPool().query('SELECT * FROM EmpleadosAsociados ORDER BY razon_social; ')
        return result['recordset'];
    }

    static async getByRif(RIF: string){
        const request = getDbPool().request()

        request.input('RIF',RIF)

        const result = await request.query('')
        return result['recordset'];
    }

}