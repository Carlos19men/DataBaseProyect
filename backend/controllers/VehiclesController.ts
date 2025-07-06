import { Request, Response } from 'express'; // Importa los tipos de Express
import { vehicleModel } from '../models/Vehiculos'

interface Vehicle{
    codigo: number;
    placa: string; 
    nombre_marca: string;
    nombre: string;
    CI_cliente: string;
    nombre_cli: string; 
    apellido_cli: string;
    aceite_utilizado_motor: string | null;
    aceite_utilizado_caja: string | null;
    meses_uso: number; 
    kilometraje: number;
    resumen_mantenimiento: string | null;
}

export class VehicleController{
    model:vehicleModel
    
    constructor(model:vehicleModel){
        this.model = model
    }

    getAll = async(_req:Request,res:Response<Vehicle[] | {message:string}>): Promise<void> =>{
        try{

            const vehicles: Vehicle[] = await vehicleModel.getAll()

            if(!vehicles){
                res.status(404).send({message:'Vehiculo no encontrado'})
                return;
            }

            res.status(200).send(vehicles)
        } catch (error) {
            console.error('Error al obtener vehiculos:', error);
            // Manejo de errores más específico (ej. si el error es de base de datos)
            res.status(500).json({ message: 'Error interno del servidor al obtener vehiculos.' });
            return;
        };
    }

    getByPlate = async(req:Request,res:Response<Vehicle | {message:string}>): Promise<void> =>{

        const {plate} = req.params;

        try{
            const vehicle: Vehicle = await vehicleModel.getByPlate(plate)

            if(!vehicle){
                res.status(404).send({message:'Vehiculo no encontrado'})
                return 
            }
            res.status(200).send(vehicle)
            return; 
        }catch(error){
            console.error('Error al obtener vehiculo:', error);
            // Manejo de errores más específico (ej. si el error es de base de datos)
            res.status(500).json({ message: 'Error interno del servidor al obtener vehiculo.' });
            return;
        }
    }

    newVehicle = async(req:Request,res:Response<Vehicle | {message:string} | {error:string}>): Promise<void> =>{
        const {plate,oil_box,oil_motor,maintenance,months_use,mileage,id_model,id_marca,CI_owner} = req.body

        //validamos los datos 

        try{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             

            const result = await vehicleModel.newVehicle(plate,oil_box,oil_motor,maintenance,months_use,mileage,id_model,id_marca,CI_owner)

            if(!result){
                res.status(405).send({error:'No se pudo crear el nuevo vehiculo'})
                return 
            }
            res.status(200).send({message:'Vehiculo creado con exito'})

        }catch (error){
            console.error('Error al crear un nuevo vehiculo', error)
            res.status(500).json({ error: 'Error interno del servidor al ingresar un vehiculo.' });
            return;
        }

    }

    delete = async(req:Request,res:Response<{message:string} | {error:string}>): Promise<void> =>{
        const {plate} = req.body;

        console.log(plate);

        try{
            const result = await vehicleModel.delete(plate)
            
            if(result.rowsAffected === 0){
                res.status(405).send({error:'No se pudo eliminar el vehiculo'})
                return 
            }
            res.status(200).send({message:'Vehiculo eliminado con exito'})
        }catch(error){
            console.error('Error al eliminar un vehiculo', error)
            res.status(500).json({ error: 'Error interno del servidor al eliminar un vehiculo.' });
            return;
        }

    }

    edit = async(req:Request,res:Response<{error: string} | {message:string}>): Promise<void> =>{
        const {plate,oil_box = null,oil_motor = null,maintenance = null,months_use = null,mileage = null,CI_owner = null} = req.body

        try{

            const result = await vehicleModel.edit(plate,oil_box,oil_motor,maintenance,months_use,mileage,CI_owner)

            if(result['rowsAffected'] === 0){
                res.status(405).send({error:'No se pudo modificar vehiculo'})
                return 
            }
            res.status(200).send({message:'Vehiculo modificado con exito'})

        }catch (error){
            console.error('Error al editar el vehiculo', error)
            res.status(500).json({error: 'Error interno del servidor al editar un vehiculo.' });
            return;
        }
    }
}