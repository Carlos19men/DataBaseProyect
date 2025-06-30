import { Request, Response } from 'express'; // Importa los tipos de Express
import { vehicleModel } from '../models/Vehiculos'

interface Vehicle{
    id:number;
    plate:string; 
    brand: string;
    id_branc?: number;
    model: string;
    id_model?: number;
    Ci_user: number;
    nameOwner?: string; 
    lastName?:string;
    oil_box:string | null;
    oil_motor: string | null; 
    months_use: number; 
    mileage: number;
    maintenance: string | null;
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

        const {plate} = req.body;

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
            console.error('Error al crear un nuevo vehiculo')
            res.status(500).json({ error: 'Error interno del servidor al ingresar un vehiculo.' });
            return;
        }

    }

    delete = async(req:Request,res:Response<Vehicle | {message:string}>): Promise<void> =>{
        
        const {plate} = req.body

        //validamos los datos 

        try{

            const result = await vehicleModel.delete(plate)
            if(!result){
                res.status(405).send({message:'bad request'})
                return 
            }
            res.status(200).send({message:'Vehiculo eliminado cone exito'})
        }catch(error){
            console.error('Error al eliminar un vehiculo')
            res.status(500).json({ message: 'Error interno del servidor al eliminar un vehiculo.' });
            return;
        }

    }

    edit = async(req:Request,res:Response<Vehicle | {message:string}>): Promise<void> =>{
        const {plate,oil_box,oil_motor,maintenance,months_use,mileage,id_model,id_marca,CI_owner} = req.body

        try{

            const result = await vehicleModel.edit(plate,oil_box,oil_motor,maintenance,months_use,mileage,id_model,id_marca,CI_owner)

            if(!result){
                res.status(405).send({message:'No se pudo modificar vehiculo'})
                return 
            }
            res.status(200).send({message:'Vehiculo creado con exito'})

        }catch (error){
            console.error('Error al editar el vehiculo')
            res.status(500).json({ message: 'Error interno del servidor al editar un vehiculo.' });
            return;
        }
    }
}