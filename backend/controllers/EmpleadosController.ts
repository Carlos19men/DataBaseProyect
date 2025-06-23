import {Request, Response} from 'express';
import {employeeModel} from '../models/Empleados';

interface Employee {
    CI: string;
    name: string | null;
    lastName: string | null;
    RIF_establishment: string | null;
}

export class EmployeeController {
    model: employeeModel;

    constructor(model: employeeModel) {
        this.model = model;
    }

    getAll = async(req: Request, res: Response<Employee[] | {message: string}>): Promise<void> => {
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
            res.status(500).json({message: "Error interno del servidor al conseguir un empleado"});
            return;
        }
    }
}