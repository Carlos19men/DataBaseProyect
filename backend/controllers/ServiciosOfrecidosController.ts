import { Request, Response } from 'express';
import { ServiciosOfrecidosModel } from "../models/ServicioOfrecidos";

interface ServicioOfrecido {
    RIF_establecimiento: string;
    nro_servicio: number;
}

export class ServiciosOfrecidosController {
    model: ServiciosOfrecidosModel;

    constructor(model: ServiciosOfrecidosModel) {
        this.model = model;
    }

    // Obtener todos los servicios ofrecidos
    getAll = async (_req: Request, res: Response<ServicioOfrecido[] | { error: string }>): Promise<void> => {
        try {
            const servicios = await ServiciosOfrecidosModel.getAll();
            
            if (!servicios) {
                res.status(404).json({ error: 'No se encontraron servicios ofrecidos.' });
                return;
            }

            res.status(200).json(servicios);
            return;
        } catch (error) {
            console.error('Error al obtener servicios ofrecidos:', error);
            res.status(500).json({ error: 'Error interno del servidor al obtener servicios ofrecidos.' });
            return;
        }
    }

    // Obtener servicios por RIF y número de servicio
    getByRIFAndService = async (req: Request, res: Response<ServicioOfrecido | { error: string }>): Promise<void> => {
        const { RIF, nro_servicio } = req.params;
        const servicioNumero = parseInt(nro_servicio);

        if (!RIF || RIF.length === 0) {
            res.status(400).json({ error: 'RIF del establecimiento es requerido.' });
            return;
        }

        if (!nro_servicio || isNaN(servicioNumero) || servicioNumero <= 0) {
            res.status(400).json({ error: 'Número de servicio válido es requerido.' });
            return;
        }

        try {
            const servicio = await ServiciosOfrecidosModel.getByRIFAndService(RIF, servicioNumero);

            if (!servicio || (Array.isArray(servicio) && servicio.length === 0)) {
                res.status(404).json({ error: 'Servicio ofrecido no encontrado.' });
                return;
            }

            if (servicio && typeof servicio === 'object' && 'error' in servicio) {
                res.status(400).json({ error: servicio.error });
                return;
            }

            res.status(200).json(servicio);
            return;
        } catch (error) {
            console.error('Error al obtener servicio ofrecido por RIF y servicio:', error);
            res.status(500).json({ error: 'Error interno del servidor al obtener servicio ofrecido.' });
            return;
        }
    }

    // Obtener servicios por RIF
    getByRIF = async (req: Request, res: Response<ServicioOfrecido[] | { error: string }>): Promise<void> => {
        const { RIF } = req.params;

        if (!RIF || RIF.length === 0) {
            res.status(400).json({ error: 'RIF del establecimiento es requerido.' });
            return;
        }

        try {
            const servicios = await ServiciosOfrecidosModel.getByRIF(RIF);

            if (!servicios || (Array.isArray(servicios) && servicios.length === 0)) {
                res.status(404).json({error: 'No se encontraron servicios ofrecidos para este establecimiento.' });
                return;
            }

            if (servicios && typeof servicios === 'object' && 'error' in servicios) {
                res.status(400).json({error: servicios.error });
                return;
            }

            res.status(200).json(servicios);
            return;
        } catch (error) {
            console.error('Error al obtener servicios ofrecidos por RIF:', error);
            res.status(500).json({error: 'Error interno del servidor al obtener servicios ofrecidos.' });
            return;
        }
    }

    // Obtener servicios por número de servicio
    getByService = async (req: Request, res: Response<ServicioOfrecido[] | { error: string }>): Promise<void> => {
        const { nro_servicio } = req.params;
        const servicioNumero = parseInt(nro_servicio);

        if (!nro_servicio || isNaN(servicioNumero) || servicioNumero <= 0) {
            res.status(400).json({ error: 'Número de servicio válido es requerido.' });
            return;
        }

        try {
            const servicios = await ServiciosOfrecidosModel.getByService(servicioNumero);

            if (!servicios || (Array.isArray(servicios) && servicios.length === 0)) {
                res.status(404).json({ error: 'No se encontraron establecimientos que ofrezcan este servicio.' });
                return;
            }

            if (servicios && typeof servicios === 'object' && 'error' in servicios) {
                res.status(400).json({ error: servicios.error });
                return;
            }

            res.status(200).json(servicios);
            return;
        } catch (error) {
            console.error('Error al obtener servicios ofrecidos por número de servicio:', error);
            res.status(500).json({ error: 'Error interno del servidor al obtener servicios ofrecidos.' });
            return;
        }
    }

    // Agregar servicio ofrecido
    addService = async (req: Request, res: Response<{ message: string } | { error: string }>): Promise<void> => {
        const RIF_establecimiento = req.body.RIF_establecimiento;
        const nro_servicio = parseInt(req.body.nro_servicio, 10);

        console.log(RIF_establecimiento);

        if (!RIF_establecimiento || RIF_establecimiento.length === 0) {
            res.status(400).json({ error: 'RIF del establecimiento es requerido.' });
            return;
        }

        if (!nro_servicio || isNaN(nro_servicio) || nro_servicio <= 0) {
            res.status(400).json({ error: 'Número de servicio válido es requerido.' });
            return;
        }

        try {
            const result = await ServiciosOfrecidosModel.addService({RIF_establecimiento,nro_servicio});

            if(!result || result.rowsAffected === 0) {
                res.status(400).json({ error: 'Servicio ofrecido no agregado.' });
                return;
            }
            
            /*if (result && typeof result === 'object' && 'error' in result) {
                res.status(400).json({ error: result.error });
                return;
            }*/

            res.status(201).json({ message: 'Servicio ofrecido agregado con éxito.' });
            return;
        } catch (error) {
            console.error('Error al agregar servicio ofrecido:', error);
            res.status(500).json({ error: 'Error interno del servidor al agregar servicio ofrecido.' });
            return;
        }
    }

    // Eliminar servicio ofrecido
    deleteService = async (req: Request, res: Response<{ message: string } | { error: string }>): Promise<void> => {
        const RIF_establecimiento = req.body.RIF_establecimiento;
        const nro_servicio = parseInt(req.body.nro_servicio, 10);

        if (!RIF_establecimiento || RIF_establecimiento.length === 0) {
            res.status(400).json({ error: 'RIF del establecimiento es requerido.' });
            return;
        }

        if (!nro_servicio || isNaN(nro_servicio) || nro_servicio <= 0) {
            res.status(400).json({ error: 'Número de servicio válido es requerido.' });
            return;
        }

        try {
            const result = await ServiciosOfrecidosModel.deleteService({RIF_establecimiento,nro_servicio});

            if(!result || result.rowsAffected === 0) {
                res.status(400).json({ error: 'Servicio ofrecido no eliminado.' });
                return;
            }
            
            /*if (result && typeof result === 'object' && 'error' in result) {
                res.status(400).json({ message: result.error });
                return;
            } */

            res.status(200).json({ message: 'Servicio ofrecido eliminado con éxito.' });
            return;
        } catch (error) {
            console.error('Error al eliminar servicio ofrecido:', error);
            res.status(500).json({error: 'Error interno del servidor al eliminar servicio ofrecido.' });
            return;
        }
    }

    // Obtener servicios no ofrecidos
    getServicesNotOffered = async (_req: Request, res: Response): Promise<void> => {
        try {
            const servicios = await ServiciosOfrecidosModel.getServicesNotOffered();
            
            if (!servicios) {
                res.status(404).json({ message: 'No se encontraron servicios no ofrecidos.' });
                return;
            }

            res.status(200).json(servicios);
            return;
        } catch (error) {
            console.error('Error al obtener servicios no ofrecidos:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener servicios no ofrecidos.' });
            return;
        }
    }

    // Obtener servicios no ofrecidos por RIF
    getServicesNotOfferedRIF = async (req: Request, res: Response): Promise<void> => {
        const { RIF } = req.params;

        if (!RIF || RIF.length === 0) {
            res.status(400).json({ message: 'RIF del establecimiento es requerido.' });
            return;
        }

        try {
            const servicios = await ServiciosOfrecidosModel.getServicesNotOfferedRIF(RIF);

            if (!servicios || (Array.isArray(servicios) && servicios.length === 0)) {
                res.status(404).json({ message: 'No se encontraron servicios no ofrecidos para este establecimiento.' });
                return;
            }

            if (servicios && typeof servicios === 'object' && 'error' in servicios) {
                res.status(400).json({ message: servicios.error });
                return;
            }

            res.status(200).json(servicios);
            return;
        } catch (error) {
            console.error('Error al obtener servicios no ofrecidos por RIF:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener servicios no ofrecidos.' });
            return;
        }
    }
} 