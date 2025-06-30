import { getDbPool } from "../config/SQLserverConection";


export class vehicleModel{

    static async getAll(){
        const result = await getDbPool().query('SELECT * FROM Vehiculos ORDER BY codigo;')
        return result['recordset']
    }

    static async getByPlate(plate: string){

        const request = await getDbPool().request()

        request.input('Plate',plate)

        const result = await request.query('SELECT * FROM ObtenerPorPlaca(@Plate);')

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

        const result = await request.query('EXEC InsertarVehiculo @Plate, @OilBox, @OilMotor, @Maintenance, @MonthsUse, @Mileage, @IdModel, @IdMarca, @CiOwner;')

        return {rowsAffected: result['rowsAffected'][0]}
    }

    static async delete(plate:string){
        const request = getDbPool().request()

        //agg paramethers
        request.input('plate',plate)

        //execute
        const result = await request.query('EXEC eliminarVehiculo @plate;')

        return {rowsAffected: result['rowsAffected'][0]}

    }

    static async edit(plate:string | null,oil_box:string | null,oil_motor:string | null,maintenance:string | null,months_use:Int16Array | null,mileage:Float32Array | null,id_model:Int16Array | null,id_marca:Int16Array | null, CI_owner:string | null){
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

        const result = await request.query('EXEC InsertarVehiculo @Plate, @OilBox, @OilMotor, @Maintenance, @MonthsUse, @Mileage, @IdModel, @IdMarca, @CiOwner;')

        return {rowsAffected: result['rowsAffected'][0]}
    }




}