import { Request, Response } from 'express';
import { OrdenesServicioModel } from '../models/OrdenesServicio';

//validar horas 
function isValidTime(timeString: string): boolean {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    
    if (!timeRegex.test(timeString)) {
        return false;
    }
    
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours >= 0 && hours <= 23 && 
    minutes >= 0 && minutes <= 59;
}


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
    persona_autoriza?: string; // Opcional
    actividades: ServiceActivity[];
    id_rif: string;
}

interface UpdateServiceOrder {
    codigo_vehiculo?: number;
    fecha_entrada?: Date;
    hora_entrada?: string;
    hora_estimada_salida?: string;
    hora_real_salida?: string;
    fecha_salida?: Date;
    justificacion?: string;
    persona_autoriza?: string;
    id_rif?: string;
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

            if (!result) {
                res.status(404).json({ message: 'Service order not found.' });
                return;
            }

            res.status(200).json(result);
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

            // Validar que la fecha exista y sea string
            if (!orderData.fecha_entrada || typeof orderData.fecha_entrada !== 'string') {
                res.status(400).json({ message: 'La fecha de entrada es requerida y debe ser un string con formato YYYY-MM-DD.' });
                return;
            }

            // Validar formato de fecha YYYY-MM-DD
            if (!/^\d{4}-\d{2}-\d{2}$/.test(orderData.fecha_entrada)) {
                res.status(400).json({ message: 'La fecha de entrada debe tener formato YYYY-MM-DD.' });
                return;
            }

            // Convertir a Date
            orderData.fecha_entrada = new Date(orderData.fecha_entrada);

            if (isNaN(orderData.fecha_entrada.getTime())) {
                res.status(400).json({ message: 'La fecha de entrada no es válida.' });
                return;
            }

            console.log("📋 orderData completo después de procesar:", orderData); 

            // Validaciones básicas
            if (!orderData.codigo_vehiculo || orderData.codigo_vehiculo <= 0) {
                res.status(400).json({ message: 'Valid vehicle code is required.' });
                return;
            }

            if (!orderData.fecha_entrada) {
                res.status(400).json({ message: 'Entry date is required.' });
                return;
            }

            if(isNaN(orderData.fecha_entrada.getTime())) {
                res.status(400).json({ message: 'Valid entry date is required.' });
                return;
            }   

            if (!orderData.hora_entrada || !isValidTime(orderData.hora_entrada) || !orderData.hora_estimada_salida || !isValidTime(orderData.hora_estimada_salida)) {
                res.status(400).json({ message: 'Entry time and estimated exit time are required and must be in valid format (HH:MM).' });
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
            res.status(500).json({ message: 'Internal server error while creating service order.  '+ error });
            return;
        }
    }

    // Actualizar orden de servicio
    static async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const orderId = parseInt(id);

        if (!id || isNaN(orderId) || orderId <= 0) {
            res.status(400).json({ message: 'Valid order ID is required.' });
            return;
        }

        try {
            const orderData: UpdateServiceOrder = req.body;

            // Validar que al menos un campo sea proporcionado
            if (Object.keys(orderData).length === 0) {
                res.status(400).json({ message: 'At least one field to update is required.' });
                return;
            }

            // Validar fecha de entrada si se proporciona
            if (orderData.fecha_entrada) {
                const fecha = new Date(orderData.fecha_entrada);
                if (isNaN(fecha.getTime())) {
                    res.status(400).json({ message: 'Valid entry date is required.' });
                    return;
                }
                orderData.fecha_entrada = fecha;
            }

            // Validar fecha de salida si se proporciona
            if (orderData.fecha_salida) {
                const fecha = new Date(orderData.fecha_salida);
                if (isNaN(fecha.getTime())) {
                    res.status(400).json({ message: 'Valid exit date is required.' });
                    return;
                }
                orderData.fecha_salida = fecha;
            }

            // Validar horas si se proporcionan
            if (orderData.hora_entrada && !isValidTime(orderData.hora_entrada)) {
                res.status(400).json({ message: 'Valid entry time is required.' });
                return;
            }

            if (orderData.hora_estimada_salida && !isValidTime(orderData.hora_estimada_salida)) {
                res.status(400).json({ message: 'Valid estimated exit time is required.' });
                return;
            }

            if (orderData.hora_real_salida && !isValidTime(orderData.hora_real_salida)) {
                res.status(400).json({ message: 'Valid real exit time is required.' });
                return;
            }

            // Validar código de vehículo si se proporciona
            if (orderData.codigo_vehiculo !== undefined && orderData.codigo_vehiculo <= 0) {
                res.status(400).json({ message: 'Valid vehicle code is required.' });
                return;
            }

            // Validar RIF si se proporciona
            if (orderData.id_rif && orderData.id_rif.trim() === '') {
                res.status(400).json({ message: 'Valid establishment RIF is required.' });
                return;
            }

            const result = await OrdenesServicioModel.update(orderId, orderData);

            if (result.rowsAffected === 0) {
                res.status(404).json({ message: 'Service order not found.' });
                return;
            }

            res.status(200).json({ 
                message: 'Service order updated successfully.',
                success: true 
            });
            return;
        } catch (error) {
            console.error('Error updating service order:', error);
            res.status(500).json({ message: 'Internal server error while updating service order.' });
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

            if (result.rowsAffected === 0) {
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