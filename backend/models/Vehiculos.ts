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

    static async newVehicle({plate,oil_box,oil_motor,maintenance,months_use,mileage,id_model,id_marca,CI_owner}:{plate:string,oil_box:string,oil_motor:string,maintenance:string,months_use:Int16Array,mileage:Float32Array,id_model:Int16Array,id_marca:Int16Array, CI_owner:string}){

        if(plate === undefined || plate === null || plate.length === 0){
            return {error:'Placa is required'}
        }

        if(oil_box === undefined || oil_box === null || oil_box.length === 0){
            return {error:'Oil Box is required'}
        }

        if(oil_motor === undefined || oil_motor === null || oil_motor.length === 0){
            return {error:'Oil Motor is required'}
        }

        if(maintenance === undefined || maintenance === null || maintenance.length === 0){
            return {error:'Maintenance is required'}
        }

        if(months_use === undefined || months_use === null){
            return {error:'Months Use is required'}
        }

        if(mileage === undefined || mileage === null){
            return {error:'Mileage is required'}
        }

        if(id_model === undefined || id_model === null){
            return {error:'Model is required'}
        }

        if(id_marca === undefined || id_marca === null){
            return {error:'Marca is required'}
        }

        if(CI_owner === undefined || CI_owner === null || CI_owner.length === 0){
            return {error:'CI Owner is required'}
        }

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

        console.log(result['recordset'])

        return result['recordset']
    }

    static async deleteVehicle({plate}:{plate:string}){

        if(plate === undefined || plate === null || plate.length === 0){
            return {error:'Placa is required'}
        }

        const request = getDbPool().request()

        //agg paramethers
        request.input('plate',plate)

        //execute
        const result = await request.query('EXEC eliminarVehiculo @plate;')

        console.log(result['recordset'])

        return result['recordset']

    }

    static async editVehicle({plate,oil_box,oil_motor,maintenance,months_use,mileage,id_model,id_marca,CI_owner}:{plate:string | null,oil_box:string | null,oil_motor:string | null,maintenance:string | null,months_use:Int16Array | null,mileage:Float32Array | null,id_model:Int16Array | null,id_marca:Int16Array | null, CI_owner:string | null}){

        if(plate !== null && (plate === undefined || plate.length === 0)){
            return {error:'Placa is required'}
        }

        if(oil_box !== null && (oil_box === undefined || oil_box.length === 0)){
            return {error:'Oil Box is required'}
        }
        
        if(oil_motor !== null && (oil_motor === undefined || oil_motor.length === 0)){
            return {error:'Oil Motor is required'}
        }

        if(maintenance !== null && (maintenance === undefined || maintenance.length === 0)){
            return {error:'Maintenance is required'}
        }

        if(months_use === undefined && months_use !== null){
            return {error:'Months Use is required'}
        }

        if(mileage === undefined || mileage !== null){
            return {error:'Mileage is required'}
        }

        if(id_model === undefined || id_model !== null){
            return {error:'Model is required'}
        }

        if(id_marca === undefined || id_marca !== null){
            return {error:'Marca is required'}
        }

        if(CI_owner !== null && (CI_owner === undefined || CI_owner.length === 0)){
            return {error:'CI Owner is required'}
        }

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

        console.log(result['recordset'])

        return result['recordset']
    }




}