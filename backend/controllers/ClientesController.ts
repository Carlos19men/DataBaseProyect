import { Request, Response } from 'express'; // Importa los tipos de Express
import { customerModel } from "../models/Clientes"; // Tu modelo de cliente
//import { phonesCustomerModel } from "../models/Telefonos"; // Modelo de teléfonos


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

            
            
            if(response['rowsAffected'] === 0){
                res.status(404).json({ message: 'No se editó ningun cliente. No se encuentra registrado' });
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
    
    //add customer 
    add = async (req:Request, res:Response<Customer | {message:string}>): Promise<void> => {
        const { CI, name, lastName, email, telefono1, telefono2 } = req.body; // Obtiene los datos del cliente del cuerpo de la solicitud
       
        if (!CI || CI.length === 0) {
            res.status(400).json({ message: 'CI es requerido.' });
            return;
        }

        if (!name || name.length === 0) {
            res.status(400).json({ message: 'Nombre es requerido.' });
            return;
        }

        if (!lastName || lastName.length === 0) {
            res.status(400).json({ message: 'Apellido es requerido.' });
            return;
        }

        if (!email || email.length === 0) {
            res.status(400).json({ message: 'Email es requerido.' });
            return;
        }

        if (!telefono1 || telefono1.length === 0) {
            res.status(400).json({ message: 'Teléfono principal es requerido.' });
            return;
        }

        if (!telefono2 || telefono2.length === 0) {
            res.status(400).json({ message: 'Teléfono secundario es requerido.' });
            return;
        }

        // Validar que los teléfonos sean distintos
        if (telefono1 === telefono2) {
            res.status(400).json({ message: 'Los teléfonos deben ser diferentes.' });
            return;
        }

        // Validar formato de teléfonos (opcional, puedes ajustar según tus necesidades)
        const telefonoRegex = /^[0-9-]+$/;
        if (!telefonoRegex.test(telefono1) || !telefonoRegex.test(telefono2)) {
            res.status(400).json({ message: 'Formato de teléfono inválido. Use solo números y guiones.' });
            return;
        }

        try {
            // Primero agregar el cliente
            const result = await customerModel.add(CI, name, lastName, email,telefono1,telefono2);
            if(result['rowsAffected'] === 0){
                res.status(400).json({message: 'No se pudo agregar el cliente'});
                return;
            }


            res.status(201).json({message: 'Cliente agregado con éxito'}); // Envía el cliente agregado con status 201
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
             
            if (result['rowsAffected'] === 0) {
                res.status(404).json({ message: 'Cliente no encontrado. No se encuentra registrado' });
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