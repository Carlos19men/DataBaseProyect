import { Request, Response } from "express";
import { Actividades } from "../models/Actividad";

interface Actividad {
    nro_servicio: number;
    nro_correlativo: number;
    nombre: string;
    descripcion: string;
    costo: number;
}

export class ActividadController {
    model: Actividades;

    constructor(model: Actividades) {
        this.model = model;
    }

    getAll = async (_req: Request, res: Response<Actividad[] | { error: string }>): Promise<void> => {
        try {
            const result = await Actividades.getAll();
            res.status(200).json(result.recordset as Actividad[]);
        } catch (error) {
            console.error("[ActividadController][getAll] Error al obtener todas las actividades:", error);
            res.status(500).json({ error: "Error interno al obtener todas las actividades. Por favor, intente más tarde." });
        }
    };

    getByEstablecimiento = async (req: Request, res: Response<Actividad[] | { error: string }>): Promise<void> => {
        const { RIF } = req.params;
        try {
            const result = await Actividades.getByEstablecimiento(RIF);

            if (!result || 'error' in result || result.length === 0) {
                res.status(404).json({ error: `No se encontraron actividades para el establecimiento con RIF '${RIF}'.` });
                return;
            }
            res.status(200).json(result as Actividad[]);
        } catch (error) {
            console.error(`[ActividadController][getByEstablecimiento] Error al obtener actividades del establecimiento '${RIF}':`, error);
            res.status(500).json({ error: `Error interno al obtener actividades del establecimiento. Por favor, intente más tarde.` });
        }
    };

    getByServicio = async (req: Request, res: Response<Actividad[] | { error: string }>): Promise<void> => {
        const { nro_servicio } = req.params;
        const nro_s = parseInt(nro_servicio, 10);
        
        if (isNaN(nro_s)) {
            res.status(400).json({ error: "El número de servicio debe ser un número válido." });
            return;
        }

        try {
            const result = await Actividades.getByServicio(nro_s);

            if (!result || 'error' in result || result.length === 0) {
                res.status(404).json({ error: `No se encontraron actividades para el servicio número '${nro_s}'.` });
                return;
            }
            res.status(200).json(result as Actividad[]);
        } catch (error) {
            console.error(`[ActividadController][getByServicio] Error al obtener actividades del servicio '${nro_s}':`, error);
            res.status(500).json({ error: `Error interno al obtener actividades del servicio. Por favor, intente más tarde.` });
        }
    };

    getByActividad = async (req: Request, res: Response<Actividad | { error: string }>): Promise<void> => {
        const { nro_servicio, nro_correlativo } = req.params;
        const nro_s = parseInt(nro_servicio, 10);
        const nro_corr = parseInt(nro_correlativo, 10);
        
        if (isNaN(nro_s) || isNaN(nro_corr)) {
            res.status(400).json({ error: "Los números de servicio y correlativo deben ser números válidos." });
            return;
        }

        try {
            const result = await Actividades.getByActividad(nro_s, nro_corr);
           
            if (!result) {
                res.status(404).json({ error: `No se encontró la actividad con servicio '${nro_s}' y correlativo '${nro_corr}'.` });
                return;
            }
            res.status(200).json(result as Actividad);
        } catch (error) {
            console.error(`[ActividadController][getByActividad] Error al obtener actividad (servicio: ${nro_s}, correlativo: ${nro_corr}):`, error);
            res.status(500).json({ error: `Error interno al obtener la actividad. Por favor, intente más tarde.` });
        }
    };

    createActividad = async (req: Request, res: Response<{message: string} | {error: string }>): Promise<void> => {
        const { nro_servicio, nombre, descripcion, costo } = req.body;



        
        if (!nro_servicio || !nombre || !descripcion || !costo) {
            res.status(400).json({ error: "Faltan datos obligatorios: nro_servicio, nro_correlativo, nombre, descripcion y costo." });
            return;
        }

        try {
            const result = await Actividades.createActividad(
                nro_servicio,   
                nombre,
                descripcion,
                costo
            );
            
            if (result.rowsAffected === 0) {
                res.status(400).json({ error: `No se pudo crear la actividad con servicio '${nro_servicio}.` });
                return;
            }
            
            res.status(201).json({ message: "Actividad creada exitosamente." });
        } catch (error) {
            console.error(`[ActividadController][createActividad] Error al crear actividad (servicio: ${nro_servicio}):`, error);
            res.status(500).json({ error: `Error interno al crear la actividad. Por favor, verifique los datos e intente más tarde.` });
        }
    };

    updateActividad = async (req: Request, res: Response<{message: string} | {error: string }>): Promise<void> => {
        const { nro_servicio, nro_correlativo, nombre, descripcion, costo } = req.body;
        
        if (!nro_servicio || !nro_correlativo) {
            res.status(400).json({ error: "Faltan datos obligatorios: nro_servicio y nro_correlativo." });
            return;
        }

        try {
            const result = await Actividades.updateActividad(
                nro_servicio,
                nro_correlativo,
                nombre,
                descripcion,
                costo
            );
            if (result.rowsAffected === 0) {
                res.status(404).json({ error: `No se pudo actualizar la actividad con servicio '${nro_servicio}' y correlativo '${nro_correlativo}'. Verifique que exista la actividad.` });
                return;
            }
            res.status(200).json({ message: "Actividad actualizada exitosamente." });
        } catch (error) {
            console.error(`[ActividadController][updateActividad] Error al actualizar actividad (servicio: ${nro_servicio}, correlativo: ${nro_correlativo}):`, error);
            res.status(500).json({ error: `Error interno al actualizar la actividad. Por favor, verifique los datos e intente más tarde.` });
        }
    };

    deleteActividad = async (req: Request, res: Response<{message: string} | {error: string }>): Promise<void> => {
        const { nro_servicio, nro_correlativo } = req.body;
        
        if (!nro_servicio || !nro_correlativo) {
            res.status(400).json({ error: "Faltan datos obligatorios: nro_servicio y nro_correlativo." });
            return;
        }

        try {
            const result = await Actividades.deleteActividad(
                nro_servicio,
                nro_correlativo
            );
            if (result.rowsAffected === 0) {
                res.status(404).json({ error: `No se pudo eliminar la actividad con servicio '${nro_servicio}' y correlativo '${nro_correlativo}'. Verifique que exista la actividad.` });
                return;
            }
            res.status(200).json({ message: "Actividad eliminada exitosamente." });
        } catch (error) {
            console.error(`[ActividadController][deleteActividad] Error al eliminar actividad (servicio: ${nro_servicio}, correlativo: ${nro_correlativo}):`, error);
            res.status(500).json({ error: `Error interno al eliminar la actividad. Por favor, intente más tarde.` });
        }
    };
} 