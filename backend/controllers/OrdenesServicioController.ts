import { Request, Response } from 'express';
import { OrdenesServicioModel } from '../models/OrdenesServicio';

// Tipos para las interfaces
interface ServiceActivity {
    nro_servicio: number;
    nro_correlativo: number;
    id_producto: number;
    precio_producto: number;
    precio_actividad: number;
    cantidad_producto: number;
    ci_empleAsig: string;
}

interface CompleteServiceOrder {
    codigo_vehiculo: number;
    fecha_entrada: Date;
    hora_entrada: string;
    hora_estimada_salida: string;
    persona_autoriza: string;
    actividades: ServiceActivity[];
    id_rif: string;
}

export class OrdenesServicioController {

    // Obtener todas las órdenes de servicio
    static async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const result = await OrdenesServicioModel.getAll();
            
            if (!result || result.length === 0) {
                res.status(404).json({ message: 'No service orders found.' });
                return;
            }

            res.status(200).json(result);
            return;
        } catch (error) {
            console.error('Error getting service orders:', error);
            res.status(500).json({ message: 'Internal server error while getting service orders.' });
            return;
        }
    }

    // Obtener orden de servicio por ID
    static async getByID(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const orderId = parseInt(id);

        if (!id || isNaN(orderId) || orderId <= 0) {
            res.status(400).json({ message: 'Valid order ID is required.' });
            return;
        }

        try {
            const result = await OrdenesServicioModel.getById(orderId);

            if (!result || result.length === 0) {
                res.status(404).json({ message: 'Service order not found.' });
                return;
            }

            res.status(200).json(result[0]);
            return;
        } catch (error) {
            console.error('Error getting service order by ID:', error);
            res.status(500).json({ message: 'Internal server error while getting service order.' });
            return;
        }
    }

    // Obtener órdenes de servicio por RIF
    static async getByRif(req: Request, res: Response): Promise<void> {
        const { id_rif } = req.params;

        if (!id_rif || id_rif.trim() === '') {
            res.status(400).json({ message: 'Valid RIF is required.' });
            return;
        }

        try {
            const result = await OrdenesServicioModel.getByRif(id_rif);

            if (!result || result.length === 0) {
                res.status(404).json({ message: 'No service orders found for this RIF.' });
                return;
            }

            res.status(200).json(result);
            return;
        } catch (error) {
            console.error('Error getting service orders by RIF:', error);
            res.status(500).json({ message: 'Internal server error while getting service orders.' });
            return;
        }
    }

    // Crear nueva orden de servicio completa
    static async create(req: Request, res: Response): Promise<void> {
        try {
            const orderData: CompleteServiceOrder = req.body;

            // Validaciones básicas
            if (!orderData.codigo_vehiculo || orderData.codigo_vehiculo <= 0) {
                res.status(400).json({ message: 'Valid vehicle code is required.' });
                return;
            }

            if (!orderData.fecha_entrada) {
                res.status(400).json({ message: 'Entry date is required.' });
                return;
            }

            if (!orderData.hora_entrada || !orderData.hora_estimada_salida) {
                res.status(400).json({ message: 'Entry time and estimated exit time are required.' });
                return;
            }

            if (!orderData.persona_autoriza || orderData.persona_autoriza.trim() === '') {
                res.status(400).json({ message: 'Authorized person is required.' });
                return;
            }

            if (!orderData.id_rif || orderData.id_rif.trim() === '') {
                res.status(400).json({ message: 'Establishment RIF is required.' });
                return;
            }

            if (!orderData.actividades || orderData.actividades.length === 0) {
                res.status(400).json({ message: 'At least one activity is required.' });
                return;
            }

            // Validar cada actividad
            for (const actividad of orderData.actividades) {
                if (!actividad.nro_servicio || actividad.nro_servicio <= 0) {
                    res.status(400).json({ message: 'Valid service number is required for all activities.' });
                    return;
                }

                if (!actividad.nro_correlativo || actividad.nro_correlativo <= 0) {
                    res.status(400).json({ message: 'Valid correlative number is required for all activities.' });
                    return;
                }

                if (!actividad.id_producto || actividad.id_producto <= 0) {
                    res.status(400).json({ message: 'Valid product ID is required for all activities.' });
                    return;
                }

                if (!actividad.precio_producto || actividad.precio_producto <= 0) {
                    res.status(400).json({ message: 'Valid product price is required for all activities.' });
                    return;
                }

                if (!actividad.precio_actividad || actividad.precio_actividad < 0) {
                    res.status(400).json({ message: 'Valid activity price is required for all activities.' });
                    return;
                }

                if (!actividad.cantidad_producto || actividad.cantidad_producto <= 0) {
                    res.status(400).json({ message: 'Valid product quantity is required for all activities.' });
                    return;
                }

                if (!actividad.ci_empleAsig || actividad.ci_empleAsig.trim() === '') {
                    res.status(400).json({ message: 'Assigned employee CI is required for all activities.' });
                    return;
                }
            }

            const result = await OrdenesServicioModel.create(orderData);

            if (result) {
                res.status(201).json({ 
                    message: 'Service order created successfully.',
                    success: true 
                });
            } else {
                res.status(500).json({ message: 'Error creating service order.' });
            }
            return;
        } catch (error) {
            console.error('Error creating service order:', error);
            res.status(500).json({ message: 'Internal server error while creating service order.' });
            return;
        }
    }

    // Eliminar orden de servicio por ID
    static async deleteByID(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const orderId = parseInt(id);

        if (!id || isNaN(orderId) || orderId <= 0) {
            res.status(400).json({ message: 'Valid order ID is required.' });
            return;
        }

        try {
            const result = await OrdenesServicioModel.deleteByID(orderId);

            if (result === 0) {
                res.status(404).json({ message: 'Service order not found.' });
                return;
            }

            res.status(200).json({ message: 'Service order deleted successfully.' });
            return;
        } catch (error) {
            console.error('Error deleting service order:', error);
            res.status(500).json({ message: 'Internal server error while deleting service order.' });
            return;
        }
    }
} 