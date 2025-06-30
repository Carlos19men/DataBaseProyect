import { Request, Response } from 'express';
import { EmpleadosEspecializadosModel } from '../models/EmpleadosEspecializados';


export class EmpleadosEspecializadosController {

    getAll = async (_req: Request, res: Response): Promise<void> => {
        try {
            const result = await EmpleadosEspecializadosModel.getAll();
            
            if (!result || result.length === 0) {
                res.status(404).json({ error: "No se encontraron empleados especializados" });
                return;
            }
            res.status(200).send(result);
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener los empleados especializados" });
            return;
        }
    }

    getByCI = async (req: Request, res: Response): Promise<void> => {
        const { CI } = req.params;
        
        if (!CI) {
            res.status(400).json({ error: "Se necesita la cédula del empleado" });
            return;
        }
        
        try {
            const result = await EmpleadosEspecializadosModel.getByCI(CI);
            
            if (result && 'error' in result) {
                res.status(400).json(result);
                return;
            }
            
            if (!result) {
                res.status(404).json({ error: "Empleado especializado no encontrado" });
                return;
            }
            
            res.status(200).send(result);
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener el empleado especializado" });
            return;
        }
    }

    getByRIF = async (req: Request, res: Response): Promise<void> => {
        const { RIF } = req.params;
        
        if (!RIF) {
            res.status(400).json({ error: "Se necesita el RIF del establecimiento" });
            return;
        }
        
        try {
            const result = await EmpleadosEspecializadosModel.getByRIF(RIF);
            
            if (result && 'error' in result) {
                res.status(400).json(result);
                return;
            }
            
            res.status(200).send(result);
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener empleados especializados por RIF" });
            return;
        }
    }

    getByService = async (req: Request, res: Response): Promise<void> => {
        const { nro_servicio } = req.params;
        
        if (!nro_servicio) {
            res.status(400).json({ error: "Se necesita el número de servicio" });
            return;
        }
        
        try {
            const result = await EmpleadosEspecializadosModel.getByService(parseInt(nro_servicio));
            
            if (result && 'error' in result) {
                res.status(400).json(result);
                return;
            }
            
            res.status(200).send(result);
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener empleados especializados por servicio" });
            return;
        }
    }

    addSpecialization = async (req: Request, res: Response): Promise<void> => {
        const { CI_emp, RIF_establecimiento, nro_servicio } = req.body;
        
        if (!CI_emp || !RIF_establecimiento || !nro_servicio) {
            res.status(400).json({ error: "Se requieren CI_emp, RIF_establecimiento y nro_servicio" });
            return;
        }
        
        try {
            const result = await EmpleadosEspecializadosModel.addSpecialization(
                CI_emp,
                RIF_establecimiento,
                nro_servicio
            );
            
            if (result.rowsAffected === 0) {
                res.status(400).json({error: "No se pudo agregar la especialización"});
                return;
            }
            
            res.status(201).json({
                message: "Especialización agregada correctamente",
                data: result
            });
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al agregar especialización" });
            return;
        }
    }

    deleteSpecialization = async (req: Request, res: Response): Promise<void> => {
        const { CI_emp, nro_servicio } = req.body;
        
        if (!CI_emp || !nro_servicio) {
            res.status(400).json({ error: "Se requieren CI_emp y nro_servicio" });
            return;
        }
        
        try {
            const result = await EmpleadosEspecializadosModel.deleteSpecialization(
                CI_emp,
                nro_servicio
            );
            
            if (result.rowsAffected === 0) {
                res.status(400).json({error: "No se pudo eliminar la especialización"});
                return;
            }
            
            res.status(200).json({
                message: "Especialización eliminada correctamente",
                data: result
            });
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al eliminar especialización" });
            return;
        }
    }
} 