import { getDbPool } from "../config/SQLserverConection";
import * as sql from 'mssql';

export class vehicleModel{

    static async getAll(){
        const result = await getDbPool().query('SELECT * FROM ObtenerVehiculos ORDER BY codigo;')
        return result['recordset']
    }

    static async getByPlate(plate: string){

        const request = await getDbPool().request()

        request.input('Plate',plate)

        const result = await request.query('SELECT * FROM ObtenerVehiculos where placa = @Plate;')

        return result['recordset'][0]
    }

    static async newVehicle(plate:string,oil_box:string,oil_motor:string,maintenance:string,months_use:Int16Array,mileage:Float32Array,id_model:Int16Array,id_marca:Int16Array, CI_owner:string){

        // Create a request to the database

        const request = await getDbPool().request()

        request.input('Plate',plate)
        request.input('OilBox',oil_box)
        request.input('OilMotor',oil_motor)
        request.input('Maintenance',maintenance)
        request.input('MonthsUse',months_use)
        request.input('Mileage',mileage)
        request.input('IdModel',id_model)
        request.input('IdMarca',id_marca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
        request.input('CiOwner',CI_owner)

        const query = `Insert into Vehiculos(placa, aceite_utilizado_motor, aceite_utilizado_caja, resumen_mantenimiento, meses_uso, kilometraje, id_modelo, id_marca, CI_dueño) 
        values (@Plate, @OilBox, @OilMotor, @Maintenance, @MonthsUse, @Mileage, @IdModel, @IdMarca, @CiOwner);`;
        
        const result = await request.query(query)

        return {rowsAffected: result['rowsAffected'][0]}
    }

    static async delete(plate:string){
        const request = getDbPool().request()

        //agg paramethers
        request.input('plate',plate)

        //execute
        const result = await request.query('Delete from Vehiculos where placa = @plate;');

        return {rowsAffected: result['rowsAffected'][0]}

    }

    static async edit(plate:string | null,oil_box:string | null,oil_motor:string | null,maintenance:string | null,months_use:Int16Array | null,mileage:Float32Array | null, CI_owner:string | null){
        // Create a request to the database

        const request = await getDbPool().request()

        request.input('Plate', sql.VarChar(20), plate)
        request.input('OilBox', sql.VarChar(20), oil_box)
        request.input('OilMotor', sql.VarChar(20), oil_motor)
        request.input('Maintenance', sql.VarChar(20), maintenance)
        request.input('MonthsUse', sql.Int, months_use)
        request.input('Mileage', sql.Float, mileage)
        request.input('CiOwner', sql.VarChar(15), CI_owner)

        const query = `Update Vehiculos set placa = isNULL(@Plate, placa), 
                       aceite_utilizado_motor = isNULL(@OilBox, aceite_utilizado_motor), 
                       aceite_utilizado_caja = isNULL(@OilMotor, aceite_utilizado_caja), 
                       resumen_mantenimiento = isNULL(@Maintenance, resumen_mantenimiento), 
                       meses_uso = isNULL(@MonthsUse, meses_uso), 
                       kilometraje = isNULL(@Mileage, kilometraje), 
                       CI_dueño = isNULL(@CiOwner, CI_dueño) 
                       where placa = @Plate;`;
        
        const result = await request.query(query)

        return {rowsAffected: result['rowsAffected'][0]}
    }




}