import { getDbPool } from "../config/SQLserverConection";


export class vehicle{

    static async getAll(){
        const result = await getDbPool().query('SELECT * FROM ObtenerVehiculos ORDER BY marca; ')

        console.log(result['recordset'])

        return result
    }

    static async getByPlate({ plate }: { plate: string; }){
        if(plate === undefined || plate === null || plate.length === 0){
            return {error:'Placa is required'}
        }

        const request = await getDbPool().request()

        request.input('Plate',plate)

        const result = request.query('SELECT * FROM ObtenerPorPlaca(@Plate);')

        console.log(result)

        return result
    }

}