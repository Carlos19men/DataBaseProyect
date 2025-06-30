import { Request, Response } from 'express'; // Importa los tipos de Express
import { customerModel } from "../models/Clientes"; // Tu modelo de cliente


interface Customer{
    ID:number; 
    CI: string ;
    name: string | null;
    lastName: string | null;
    email: string | null;
}

export class CustomerController {
    model:customerModel

    //constructor
    constructor(model:customerModel){
        this.model= model
    }

    //getAll
    getAll = async(_req:Request,res:Response<Customer[] | {message:string}>): Promise<void> => {

        //aquí validamos la entrada 

        try{
            const customers: Customer[] = await customerModel.getAll()
            
            if (!customers || customers.length === 0) {
                res.status(404).json({ message: 'No se encontraron clientes.' });
                return ;
            }

            res.status(200).json(customers); // Envía un array de clientes con status 200
            return;
        } catch (error) {
            console.error('Error al obtener clientes:', error);
            // Manejo de errores más específico (ej. si el error es de base de datos)
            res.status(500).json({ message: 'Error interno del servidor al obtener clientes.' });
            return;
        };

    }

    getByCI = async(req:Request,res:Response<Customer | {message:string}>): Promise<void> => {

        const {CI} = req.params; // Obtiene el CI del parámetro de la ruta

        if (!CI || CI.length === 0) {
            res.status(400).json({ message: 'CI es requerido.' });
            return;
        }

        try {
            const customerData:Customer = await customerModel.getByCI(CI);

            if (!customerData) {
                res.status(404).json({ message: 'Cliente no encontrado.' });
                return;
            }

            res.status(200).json(customerData); // Envía el cliente encontrado con status 200
            return;
        } catch (error) {
            console.error('Error al obtener cliente por CI:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener cliente.' });
            return;
        }
    }

    edit = async(req:Request,res:Response<Customer | {message:string}>): Promise<void> => {
        const { CI, name, lastName, email } = req.body; // Obtiene los datos del cliente del cuerpo de la solicitud
        console.log(req.body)
        if (!CI || CI.length === 0) {
            res.status(400).json({ message: 'CI es requerido.' });
            return;
        }
        
        try{

            const response = await customerModel.edit(
                                                 CI ?? null,
                                                 name ?? null,
                                                 lastName ?? null,
                                                 email ?? null);

            
            
            if(!response){
                res.status(404).json({ message: 'Cliente no encontrado.' });
                return;
            }
            res.status(200).json({message:'Cliente editado con exito'}); // Envía el cliente encontrado con status 200
            return;
        } catch (error) {
            console.error('Error al obtener cliente por CI:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener cliente.' });
            return;
        }
    }
    
    //add cusomer 
    add = async (req:Request, res:Response<Customer | {message:string}>): Promise<void> => {
        const { CI, name, lastName, email } = req.body; // Obtiene los datos del cliente del cuerpo de la solicitud
       
        if (!CI || CI.length === 0) {
            res.status(400).json({ message: 'CI es requerido.' });
            return;
        }

        try {
            const result = await customerModel.add(CI, name, lastName, email);
            if(result){
                res.status(201).json({message: 'Cliente agregado con exito '}); // Envía el cliente agregado con status 201
                return;
            }
            res.status(202).json({message: 'Cliente no se pudo agreagar agregado'}); // Envía el cliente agregado con status 201
            return;
        } catch (error:unknown) {
            
            if(error instanceof Error && error.message.includes('Cannot insert duplicate key')){
                res.status(409).json({message:'Conflicto: Cliente ya registrado'});
                return;
            }

            console.error('Error al agregar cliente:', error);
            res.status(500).json({ message: 'Internal server error:'+ error });
            return;
        }
    }

    delete = async(req:Request, res:Response<{message:string} | Customer>): Promise<void> => {
        const { CI } = req.params; // Obtiene el CI del parámetro de la ruta

        if( !CI || CI.length === 0) {
            res.status(400).json({ message: 'CI es requerido.' });
            return;
        }

        try {
            const result = await customerModel.delete(CI);
            console.log(result) 
            if (!result) {
                res.status(404).json({ message: 'Cliente no encontrado.' });
                return;
            }
            res.status(200).json({ message: 'Cliente eliminado con éxito.' });
            return;
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            res.status(500).json({ message: 'Error interno del servidor al eliminar cliente.' });
            return;
        }
    }

}