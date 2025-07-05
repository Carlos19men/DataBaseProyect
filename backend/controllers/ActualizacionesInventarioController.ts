import { Request, Response } from "express";
import { ActulizationInteroyModel } from "../models/ActualizacionesInvetario";

interface ActualizacionInventario {
    RIF_establecimiento: string;
    id_producto: number;
    cantidad: number;
    fecha_actualizacion?: Date;
}

export class ActualizacionesInventarioController {
    model: typeof ActulizationInteroyModel;

    constructor(model: typeof ActulizationInteroyModel) {
        this.model = model;
    }

    // Obtener todas las actualizaciones por establecimiento
    getByEstablishment = async (req: Request, res: Response<ActualizacionInventario[] | {error: string}>): Promise<void> => {
        const { RIF } = req.params;
        
        if (!RIF) {
            res.status(400).json({ error: "RIF es requerido" });
            return;
        }

        try {
            const actualizaciones = await ActulizationInteroyModel.getByEstablishment(RIF);
            
            if (!actualizaciones || actualizaciones.length === 0) {
                res.status(404).json({ error: "No se encontraron actualizaciones para el establecimiento proporcionado" });
                return;
            }

            res.status(200).json(actualizaciones);
        } catch (error) {
            console.error("Error buscando las actualizaciones por establecimiento", error);
            res.status(500).json({ error: "Error al buscar las actualizaciones por establecimiento" });
        }
    }

    // Obtener actualizaciones por producto específico en un establecimiento
    getByProduct = async (req: Request, res: Response<ActualizacionInventario[] | {error: string}>): Promise<void> => {
        const { RIF, id_producto } = req.params;
        const productId = parseInt(id_producto, 10);
        
        if (!RIF) {
            res.status(400).json({ error: "RIF es requerido" });
            return;
        }

        if (!id_producto || isNaN(productId) || productId <= 0) {
            res.status(400).json({ error: "ID de producto válido es requerido" });
            return;
        }

        try {
            const actualizaciones = await ActulizationInteroyModel.getByProduct(RIF, productId);
            
            if (!actualizaciones || actualizaciones.length === 0) {
                res.status(404).json({ error: "No se encontraron actualizaciones para el producto especificado" });
                return;
            }

            res.status(200).json(actualizaciones);
        } catch (error) {
            console.error("Error buscando las actualizaciones por producto", error);
            res.status(500).json({ error: "Error al buscar las actualizaciones por producto" });
        }
    }

    // Crear nueva actualización de inventario
    createModification = async (req: Request, res: Response<{error: string} | {message: string}>): Promise<void> => {
        const { RIF, id_producto, cantidad, tipo} = req.body;

        if (!RIF) {
            res.status(400).json({ error: "RIF es requerido" });
            return;
        }

        if (!id_producto || typeof id_producto !== 'number' || id_producto <= 0) {
            res.status(400).json({ error: "ID de producto válido es requerido" });
            return;
        }

        if (!cantidad || typeof cantidad !== 'number') {
            res.status(400).json({ error: "Cantidad válida es requerida" });
            return;
        }

        if (!tipo || typeof tipo !== 'string') {
            res.status(400).json({ error: "Tipo de actualización válido es requerido" });
            return;
        }

        try {
            const result = await ActulizationInteroyModel.newModification(RIF, id_producto, cantidad, tipo);

            if (result.rowsAffected === 0) {
                res.status(400).json({ error: "No se pudo crear la actualización de inventario" });
                return;
            }

            res.status(201).json({ message: "Actualización de inventario creada con éxito" });
        } catch (error) {
            console.error("Error creando nueva actualización de inventario", error);
            res.status(500).json({ error: "Error al crear la actualización de inventario" });
        }
    }
} 