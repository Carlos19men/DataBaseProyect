import { Request, Response } from "express";
import { employeeAsigModel } from "../models/EmpleadosAsignados";

interface EmployeeAsig {
    RIF: string;
    id_servicio: number;
    Ci_emp: string;
}

export class EmployeeAsigController {
    model: employeeAsigModel;
    
    
    constructor(model: employeeAsigModel){
        this.model = model;
    }


    getByEstablecimiento = async(req: Request, res: Response<EmployeeAsig[] | {message: string}>): Promise<void> => {
        const RIF = req.params.RIF;
        
        try{
            const result = await employeeAsigModel.getByEstablecimiento(RIF);

            if(!result || 'error' in result){
                res.status(404).json({message: "No se encontraron empleados asignados"});
                return;
            }

            res.status(200).json(result);
        } catch(error){
            console.error("Ha ocurrido un error", error);
            res.status(500).json({message: "Error al obtener los empleados asignados"});
        }
        
    }

    getByService = async(req: Request, res: Response<EmployeeAsig[] | {message: string}>): Promise<void> => {
        const RIF = req.params.RIF;
        const id_servicio = parseInt(req.params.id_servicio, 10);

        try{
            const result = await employeeAsigModel.getByService(RIF, id_servicio);

            if(!result || 'error' in result){
                res.status(404).json({message: "No se encontraron empleados asignados"});
                return;
            }

            res.status(200).json(result);
        } catch(error){
            console.error("Ha ocurrido un error", error);
            res.status(500).json({message: "Error al obtener los empleados asignados"});
        }
    }

    asignEmployee = async(req: Request, res: Response<{error: string} | {message: string}>): Promise<void> => {
        const {RIF, id_servicio, Ci_emp} = req.body;

        if(!RIF || !id_servicio || !Ci_emp){
            res.status(400).json({error: "Faltan datos"});
            return;
        }

        const id_servicio_int = parseInt(id_servicio, 10);

        try{
            const result = await employeeAsigModel.asigEmployee(RIF, id_servicio_int, Ci_emp);

            if(result.rowsAffected === 0){
                res.status(404).json({error: "No se pudo asignar el empleado"});
                return;
            }

            res.status(200).json({message: "Empleado asignado exitosamente"});
        } catch (error) {
            console.error("Ha ocurrido un error", error);
            res.status(500).json({error: "Error al asignar el empleado"});
        }
    }

    unassignEmployee = async(req: Request, res: Response<{error: string} | {message: string}>): Promise<void> => {
        const id_servicio = parseInt(req.params.id_servicio, 10);
        const Ci_emp = req.params.Ci_emp;

        try{
            const result = await employeeAsigModel.unasigEmployee(id_servicio, Ci_emp);

            if(!result || 'error' in result){
                res.status(404).json({error: "No se pudo desasignar el empleado"});
                return;
            }

            res.status(200).json({message: "Empleado desasignado exitosamente"});
        } catch(error){
            console.error("Ha ocurrido un error", error);
            res.status(500).json({error: "Error al desasignar el empleado"});
        }
    }

    getByEmployee = async(req: Request, res: Response<EmployeeAsig | {error: string}>): Promise<void> => {
        const RIF = req.params.RIF;
        const Ci_emp = req.params.Ci_emp;

        try{
            const result = await employeeAsigModel.getByEmployee(RIF, Ci_emp);

            if(!result || 'error' in result){
                res.status(404).json({error: "No se encontraron empleados asignados"});
                return;
            }

            res.status(200).json(result);
        } catch(error){
            console.error("Ha ocurrido un error", error);
            res.status(500).json({error: "Error al obtener los empleados asignados"});
        }
    }

    getEmployeesNotAssigned = async(req: Request, res: Response<EmployeeAsig[] | {error: string}>): Promise<void> => {
        const RIF = req.params.RIF;

        try{
            const result = await employeeAsigModel.getEmployeesNotAssigned(RIF);

            if(!result || 'error' in result){
                res.status(404).json({error: "No se encontraron empleados no asignados"});
                return;
            }

            res.status(200).json(result);
        } catch(error){
            console.error("Ha ocurrido un error", error);
            res.status(500).json({error: "Error al obtener los empleados no asignados"});
        }
    }
}