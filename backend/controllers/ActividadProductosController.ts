import { Request, Response } from 'express';
import { ActividadProductosModel } from "../models/ActividadProductos";

// Interfaz para la tabla ActividadProductos
interface ActividadProducto {
    id_producto: number;
    nro_servicio: number;
    nro_correlativo: number;
    cant_utilizada: number;
}

export class ActividadProductosController {
    model: ActividadProductosModel;

    constructor(model: ActividadProductosModel) {
        this.model = model;
    }

    // Obtener todas las actividades de productos
    getAll = async (_req: Request, res: Response<ActividadProducto[] | { error: string }>): Promise<void> => {
        try {
            const result = await ActividadProductosModel.getAll();
            
            if (!result || result.length === 0) {
                res.status(404).json({ error: 'No se encontraron actividades de productos.' });
                return;
            }
            
            res.status(200).json(result as ActividadProducto[]);
        } catch (error) {
            console.error('Error al obtener actividades de productos:', error);
            res.status(500).json({ error: 'Error interno del servidor al obtener actividades de productos.' });
        }
    };

    // Obtener actividad de producto por ID
    getByID = async (req: Request, res: Response<ActividadProducto | { error: string }>): Promise<void> => {
        const { id_producto, nro_servicio, nro_correlativo } = req.params;
        
        const idProd = parseInt(id_producto);
        const nroServ = parseInt(nro_servicio);
        const nroCorr = parseInt(nro_correlativo);
        
        if (
            !id_producto || isNaN(idProd) || idProd <= 0 ||
            !nro_servicio || isNaN(nroServ) || nroServ <= 0 ||
            !nro_correlativo || isNaN(nroCorr) || nroCorr <= 0
        ) {
            res.status(400).json({ error: 'Parámetros de actividad de producto inválidos.' });
            return;
        }
        
        try {
            const result = await ActividadProductosModel.getByID(idProd, nroServ, nroCorr);
            if (!result) {
                res.status(404).json({ error: 'Actividad de producto no encontrada.' });
                return;
            }
            res.status(200).json(result as ActividadProducto);
        } catch (error) {
            console.error('Error al obtener actividad de producto por ID:', error);
            res.status(500).json({ error: 'Error interno del servidor al obtener actividad de producto.' });
        }
    };

    // Eliminar actividad de producto por ID
    deleteByID = async (req: Request, res: Response<{ error: string } | { message: string }>): Promise<void> => {
        const { id_producto, nro_servicio, nro_correlativo } = req.body;
        const idProd = parseInt(id_producto);
        const nroServ = parseInt(nro_servicio);
        const nroCorr = parseInt(nro_correlativo);
        if (
            !id_producto || isNaN(idProd) || idProd <= 0 ||
            !nro_servicio || isNaN(nroServ) || nroServ <= 0 ||
            !nro_correlativo || isNaN(nroCorr) || nroCorr <= 0
        ) {
            res.status(400).json({ error: 'Parámetros de actividad de producto inválidos.' });
            return;
        }
        
        try {
            const result = await ActividadProductosModel.deleteByID(idProd, nroServ, nroCorr);
            
            if (result.rowsAffected === 0) {
                res.status(404).json({ message: 'Actividad de producto no encontrada.' });
                return;
            }
            
            res.status(200).json({ message: 'Actividad de producto eliminada con éxito.' });
        } catch (error) {
            console.error('Error al eliminar actividad de producto:', error);
            res.status(500).json({ error: 'Error interno del servidor al eliminar actividad de producto.' });
        }
    };

    create = async (req: Request, res: Response<{ message: string } | { error: string }>): Promise<void> => {
        const { id_producto, nro_servicio, nro_correlativo, cant_utilizada } = req.body;
        if (
            !id_producto || isNaN(Number(id_producto)) || Number(id_producto) <= 0 ||
            !nro_servicio || isNaN(Number(nro_servicio)) || Number(nro_servicio) <= 0 ||
            !nro_correlativo || isNaN(Number(nro_correlativo)) || Number(nro_correlativo) <= 0 ||
            !cant_utilizada || isNaN(Number(cant_utilizada)) || Number(cant_utilizada) <= 0
        ) {
            res.status(400).json({ error: 'Datos inválidos para crear la actividad de producto.' });
            return;
        }
        try {
            const result = await ActividadProductosModel.create({
                id_producto: Number(id_producto),
                nro_servicio: Number(nro_servicio),
                nro_correlativo: Number(nro_correlativo),
                cant_utilizada: Number(cant_utilizada)
            });
            if (result.rowsAffected === 0) {
                res.status(400).json({ error: 'No se pudo crear la actividad de producto.' });
                return;
            }
            res.status(201).json({ message: 'Actividad de producto creada exitosamente.' });
        } catch (error) {
            console.error('Error al crear actividad de producto:', error);
            res.status(500).json({ error: 'Error interno al crear la actividad de producto.' });
        }
    };

    update = async (req: Request, res: Response<{ message: string } | { error: string }>): Promise<void> => {
        const { id_producto, nro_servicio, nro_correlativo, cant_utilizada } = req.body;
        if (
            !id_producto || isNaN(Number(id_producto)) || Number(id_producto) <= 0 ||
            !nro_servicio || isNaN(Number(nro_servicio)) || Number(nro_servicio) <= 0 ||
            !nro_correlativo || isNaN(Number(nro_correlativo)) || Number(nro_correlativo) <= 0 ||
            !cant_utilizada || isNaN(Number(cant_utilizada)) || Number(cant_utilizada) <= 0
        ) {
            res.status(400).json({ error: 'Datos inválidos para actualizar la actividad de producto.' });
            return;
        }
        try {
            const result = await ActividadProductosModel.update({
                id_producto: Number(id_producto),
                nro_servicio: Number(nro_servicio),
                nro_correlativo: Number(nro_correlativo),
                cant_utilizada: Number(cant_utilizada)
            });
            if (result.rowsAffected === 0) {
                res.status(404).json({ error: 'No se pudo actualizar la actividad de producto. Verifique que exista.' });
                return;
            }
            res.status(200).json({ message: 'Actividad de producto actualizada exitosamente.' });
        } catch (error) {
            console.error('Error al actualizar actividad de producto:', error);
            res.status(500).json({ error: 'Error interno al actualizar la actividad de producto.' });
        }
    };
} 