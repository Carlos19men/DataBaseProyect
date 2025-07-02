import { Request, Response } from "express";
import { associatedEmployeesModel } from "../models/ProveedoresAsociados";

interface ProveedorAsociado {
    RIF_proveedor: string;
    nro_orden: number;
}

export class ProveedoresAsociadosController {
    model: associatedEmployeesModel;

    constructor(model: associatedEmployeesModel) {
        this.model = model;
    }

    getAll = async (_req: Request, res: Response<ProveedorAsociado[] | { error: string }>): Promise<void> => {
        try {
            const result = await associatedEmployeesModel.getAll();
            res.status(200).json(result as ProveedorAsociado[]);
        } catch (error) {
            console.error("[ProveedoresAsociadosController][getAll] Error al obtener proveedores asociados:", error);
            res.status(500).json({ error: "Error interno al obtener todos los proveedores asociados. Por favor, intente más tarde." });
        }
    };

    getByRif = async (req: Request, res: Response<ProveedorAsociado[] | { error: string }>): Promise<void> => {
        const { RIF } = req.params;
        try {
            const result = await associatedEmployeesModel.getByRif(RIF);
            if (!result || result.length === 0) {
                res.status(404).json({ error: `No se encontraron proveedores asociados para el RIF '${RIF}'.` });
                return;
            }
            res.status(200).json(result as ProveedorAsociado[]);
        } catch (error) {
            console.error(`[ProveedoresAsociadosController][getByRif] Error al obtener proveedores asociados para el RIF '${RIF}':`, error);
            res.status(500).json({ error: `Error interno al obtener proveedores asociados para el RIF '${RIF}'. Por favor, intente más tarde.` });
        }
    };

    insert = async (req: Request, res: Response<{ message?: string; error?: string }>): Promise<void> => {
        const { RIF_proveedor, nro_orden } = req.body;
        if (!RIF_proveedor || !nro_orden) {
            res.status(400).json({ error: "Faltan datos obligatorios: RIF_proveedor y nro_orden." });
            return;
        }
        try {
            const result = await associatedEmployeesModel.insert(RIF_proveedor, nro_orden);
            if (result.rowsAffected === 0) {
                res.status(400).json({ error: `No se pudo insertar el proveedor asociado con RIF '${RIF_proveedor}' y orden '${nro_orden}'.` });
                return;
            }
            res.status(201).json({ message: "Proveedor asociado insertado exitosamente." });
        } catch (error) {
            console.error(`[ProveedoresAsociadosController][insert] Error al insertar proveedor asociado (RIF: ${RIF_proveedor}, Orden: ${nro_orden}):`, error);
            res.status(500).json({ error: `Error interno al insertar el proveedor asociado. Por favor, verifique los datos e intente más tarde.` });
        }
    };

    update = async (req: Request, res: Response<{ message: string} | {error: string} >): Promise<void> => {
        const { RIF_proveedor, nro_orden, new_RIF_proveedor, new_nro_orden } = req.body;
        if (!RIF_proveedor || !nro_orden || !new_RIF_proveedor || !new_nro_orden) {
            res.status(400).json({ error: "Faltan datos obligatorios: RIF_proveedor, nro_orden, new_RIF_proveedor y new_nro_orden." });
            return;
        }
        try {
            const result = await associatedEmployeesModel.update(RIF_proveedor, nro_orden, new_RIF_proveedor, new_nro_orden);
            if (result.rowsAffected === 0) {
                res.status(404).json({ error: `No se pudo actualizar el proveedor asociado con RIF '${RIF_proveedor}' y orden '${nro_orden}'. Verifique que exista el registro.` });
                return;
            }
            res.status(200).json({ message: "Proveedor asociado actualizado exitosamente." });
        } catch (error) {
            console.error(`[ProveedoresAsociadosController][update] Error al actualizar proveedor asociado (RIF: ${RIF_proveedor}, Orden: ${nro_orden}):`, error);
            res.status(500).json({ error: `Error interno al actualizar el proveedor asociado. Por favor, verifique los datos e intente más tarde.` });
        }
    };

    delete = async (req: Request, res: Response<{ message?: string; error?: string }>): Promise<void> => {
        const { RIF_proveedor, nro_orden } = req.body;
        if (!RIF_proveedor || !nro_orden) {
            res.status(400).json({ error: "Faltan datos obligatorios: RIF_proveedor y nro_orden." });
            return;
        }
        try {
            const result = await associatedEmployeesModel.delete(RIF_proveedor, nro_orden);
            if (result.rowsAffected === 0) {
                res.status(404).json({ error: `No se pudo eliminar el proveedor asociado con RIF '${RIF_proveedor}' y orden '${nro_orden}'. Verifique que exista el registro.` });
                return;
            }
            res.status(200).json({ message: "Proveedor asociado eliminado exitosamente." });
        } catch (error) {
            console.error(`[ProveedoresAsociadosController][delete] Error al eliminar proveedor asociado (RIF: ${RIF_proveedor}, Orden: ${nro_orden}):`, error);
            res.status(500).json({ error: `Error interno al eliminar el proveedor asociado. Por favor, intente más tarde.` });
        }
    };
} 