import {Request, Response} from 'express';
import {employeeModel} from '../models/Empleados';

export interface Employee {
    CI: string;
    name?: string | null;
    lastName?: string | null;
    cellphone?: string | null;
    address?: string | null;
    salary?: number | null;
    RIF_establishment: string | null;
}

export class EmployeeController {
    model: employeeModel;

    constructor(model: employeeModel) {
        this.model = model;
    }

    getAll = async(_req: Request, res: Response<Employee[] | {message: string}>): Promise<void> => {
        try {
            const employees: Employee[] = await employeeModel.getAll();

            if(!employees || employees.length === 0){
                res.status(404).json({"message": "No se encontraron empleados"});
                return;
            }

            res.status(200).json(employees);
            return;
        } catch (error){
            console.error("Error al obtener clientes", error)
            res.status(500).json({message: "Error interno del servidor al encontrar empleados"});
            return;
        }

    }

    getbyCI = async(req: Request, res: Response<Employee | {message: string}>): Promise<void> => {
        const {CI} = req.params;

        if(CI != null) {
            if(!CI || CI.length === 0) {
                res.status(400).json({"message": "Se requiere la cédula del empleado"});
                return;
            }
        }

        try {
            const employee_data: Employee = await employeeModel.getByCI(CI);

            if(!employee_data){
                res.status(404).json({message: "No se consiguió un empleado con esa cédula"})
                return;
            }

            res.status(200).json(employee_data);
            return;
        } catch(error) {
            console.error("Error al obtener el empleado con esa CI", error);
            res.status(500).json({message: "Error interno: "+ error});
            return;
        }
    }

    getbyRIF = async(req: Request, res: Response <Employee[] | {message: string}>): Promise<void> => {
        const {RIF} = req.params;

        if (RIF != null) {
            if(!RIF || RIF.length === 0) {
                res.status(400).json({message: "Se requiere el RIF"});
                return;
            }
        }

        try {
            const result = await employeeModel.getbyRIF(RIF);

            if ('error' in result) {
                res.status(400).json({message: 'error al obtener empleados'+result['error']});
                return;
            }

            const employees: Employee[] = result;
            res.status(200).json(employees);
            return;
        } catch (error) {
            console.error("Error al obtener empleados con ese RIF", error)
            res.status(500).json({message: "Internal error: "+error});
            return;
        }
    }

    editEmployee = async(req: Request, res: Response<{error: string} | {message: string}>): Promise<void> => {
        const {CI, name = null, lastName = null, cellphone = null, address = null, salary = null} = req.body;

        if (CI != null) {
            if (!CI || CI.length === 0) {
                res.status(400).json({error: "Se requiere la cédula del empleado"});
                return;
            }
        }
        
        //console.log({CI, name, lastName, cellphone, address, salary})
        try {
            const result = await employeeModel.editEmployee(CI, name, lastName, cellphone, address, salary);

            if (result['rowsAffected'] === 0) {
                res.status(400).json({error: 'No se editó ningún empleado'});
                return;
            }

            res.status(200).json({message:'empleado modificado con éxito'});
            return;
        } catch (error) {
            console.error("Error al editar el empleado", error);
            res.status(500).json({error: "Error interno del servidor al editar el empleado"});
            return;
        }
    }

    deleteEmployee = async(req: Request, res: Response<{message: string}>): Promise<void> => {
        const {CI} = req.params;

        if(CI === null || CI.length === 0 || CI === undefined){
            res.status(404).json({message: "Se requiere la cédula del empleado"});
            return;
        }

        try{
            const result = await employeeModel.deleteEmpleado(CI);
            
            console.log(result)

            if(result['rowsAffected'] === 0){
                res.status(404).json({message: 'El empleado no encontrado'});
                return;
            }

            res.status(200).json({message:'Empleado eliminado con existo'});
            return;
        } catch(error) {
            console.error("Ha ocurrido un error", error);
            res.status(500).json({message: "internal error: " + error});
            return;
        }  
    }

    addEmployee = async(req: Request, res: Response<{error: string} | {message:string}>): Promise<void> => {
        const {CI,name, lastName, cellphone, address, salary, RIF} = req.body;

        if(CI === null || CI.length === 0 || CI === undefined){
            res.status(404).json({message: "Se requiere la cédula del empleado"});
            return;
        }
        if(RIF === null || RIF.length === 0 || RIF === undefined){
            res.status(404).json({message: "Se requiere el RIF"});
            return;
        }
        if(salary === null || salary === undefined || salary === ''){
            res.status(404).json({message: "Se requiere el salario"});
        }

        try {
            const result = await employeeModel.addEmpleado(CI, name, lastName, cellphone, address, parseInt(salary), RIF);
            
            if('error' in result){
                res.status(400).json({error: result['error'] as string});
                return;
            }
   
            res.status(200).json({message: 'Empleado agregado con exito'});
            return;
        } catch (error) {

            if(error instanceof Error && error.message.includes('Cannot insert duplicate key')){
                res.status(409).json({message:'Conflicto: Empleado ya registrado'});
                return;
            }
            console.error("Ha ocurrido un error", error);
            res.status(500).json({message: "Error interno: "+ error})
            return;
        }
    }
}