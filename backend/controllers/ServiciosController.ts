import {Request, Response} from 'express';
import { ServicesModel } from '../models/Servicios';

interface Service {
    id_servicio: number;
    CI_superv: string | null;
    nombre_serv: string;
}

export class ServicesController {

    getAll = async (_req: Request, res: Response<Service[] | { error: string }>): Promise<void>=> {
        try {
            const services = await ServicesModel.getAll();

            if (!services || services.length === 0) {
                res.status(404).json({ error: "No se encontraron servicios" });
                return
            }
            res.status(200).send(services);
            return
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener los servicios" });
            return
        }
    }

    getById = async(req: Request, res: Response<Service | { error: string }>): Promise<void> => {
        
        const { nro_servicio } = req.params;
        if (!nro_servicio) {
            res.status(400).json({ error: "Se necesita el ID del servicio" });
            return;
        }
        try {
            const service = await ServicesModel.getById(Number(nro_servicio));

            if (!service) {
                res.status(404).json({ error: "Servicio no encontrado" });
                return;
            }
            res.status(200).send(service);
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener el servicio" });
            return;
        }

    }

    editService = async(req: Request, res: Response<{ message: string } | {error:string}>): Promise<void> => {
        const { nro_servicio, nombre_ser } = req.body;

        if (!nro_servicio) {
            res.status(400).json({ error: "Se necesita el numero de servicio del servicio" });
            return;
        }

        if(nombre_ser === null || nombre_ser === undefined || nombre_ser.length === 0){
            res.status(400).json({error:'Se require un nombre válido, no puedo saber vacio ni nulo'})
        }

        try {
            const updatedService = await ServicesModel.editService(parseInt(nro_servicio), nombre_ser);
            
            if (updatedService['rowsAffected'] === 0) {
                res.status(400).json({ message: 'Servicio no registrado' });
                return;
            }
            
            res.status(200).json({message: "Servicio editado correctamente"});
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Error: "+error });
            return;
        }
    }

    deleteService = async(req: Request, res: Response<{ message: string } | { error: string }>): Promise<void> => {
        const { nro_servicio } = req.params;

        if (!nro_servicio) {
            res.status(400).json({ error: "Se necesita el número de servicio" });
            return;
        }

        try {
            const result = await ServicesModel.deleteService(parseInt(nro_servicio) );

            if (result['rowsAffected'] === 0) {
                res.status(400).json({ error: 'Servicio no registrado' });
                return;
            }
            res.status(200).json({ message: "Servicio eliminado correctamente" });
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al eliminar el servicio:"+error });
            return;
        }
    }

    createService = async(req: Request, res: Response<Service | {message: string}>): Promise<void> => {
        const {nombre_serv} = req.body;

        if (!nombre_serv || nombre_serv.length === 0) {
            res.status(400).json({message: "Se requiere el nombre del servicio"});
            return;
        }

        try {
            const result = await ServicesModel.createService(nombre_serv);
            
            if (result['rowsAffected'] === 0) {
                res.status(400).json({message: 'No se pudo crear el servicio'});
                return;
            }

            res.status(201).json({message: 'Servicio creado exitosamente'});
            return;
        } catch (error) {

            if(error instanceof Error && error.message.includes('Cannot insert duplicate key')){
                res.status(409).json({message:'Conflicto: Servicio ya registrado'});
                return;
            }
            
            console.error("Error al crear el servicio", error);
            res.status(500).json({message: "Internal Error: "+error});
            return;
        }
    }


}