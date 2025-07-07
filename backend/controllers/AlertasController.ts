import { Request, Response } from "express";
import { InventarioAuditableModel } from "../models/InventarioAuditable";

interface Alerta {
    id: number;
    RIF_Establecimiento: string;
    id_producto: number;
    fecha: string;
    nombreProducto: string;
    cantidad: number;
    minimo: number;
    maximo: number;
    nombreEstablecimiento: string;
}

export class AlertasController {
    // Obtener todas las alertas
    getAll = async (_req: Request, res: Response<Alerta[] | {error: string}>): Promise<void> => {
        try {
            const alertas = await InventarioAuditableModel.getAlertas();
            res.status(200).json(alertas);
        } catch (error) {
            console.error("Error obteniendo alertas:", error);
            res.status(500).json({ error: "Error al obtener las alertas" });
        }
    }

    // Obtener alertas por establecimiento
    getByEstablecimiento = async (req: Request, res: Response<Alerta[] | {error: string}>): Promise<void> => {
        const { RIF } = req.params;
        
        if (!RIF) {
            res.status(400).json({ error: "RIF es requerido" });
            return;
        }

        try {
            const alertas = await InventarioAuditableModel.getAlertasByEstablecimiento(RIF);
            res.status(200).json(alertas);
        } catch (error) {
            console.error("Error obteniendo alertas por establecimiento:", error);
            res.status(500).json({ error: "Error al obtener las alertas por establecimiento" });
        }
    }

    // Limpiar alertas antiguas (más de 30 días)
    limpiarAlertasAntiguas = async (_req: Request, res: Response<{message: string} | {error: string}>): Promise<void> => {
        try {
            const eliminadas = await InventarioAuditableModel.limpiarAlertasAntiguas();
            res.status(200).json({ 
                message: `Se eliminaron ${eliminadas} alertas antiguas` 
            });
        } catch (error) {
            console.error("Error limpiando alertas antiguas:", error);
            res.status(500).json({ error: "Error al limpiar alertas antiguas" });
        }
    }
} 