import { getDbPool } from "../config/SQLserverConection";

export class activityPlanMantModel{
    static async getAll(){

        const result = await getDbPool().query('SELECT * FROM ActividadesPlan; ')
        return result['recordset'];
    }
}