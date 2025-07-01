import { Router } from "express";
import { EmployeeAsigController } from "../controllers/EmpleadosAController";
import { employeeAsigModel } from "../models/EmpleadosAsignados";

export const createAsignedEmployeeRouter = () => {
    const AssignedEmployeeRouter = Router();
    const controller = new EmployeeAsigController(employeeAsigModel);

    AssignedEmployeeRouter.get('/:RIF', controller.getByEstablecimiento);
    AssignedEmployeeRouter.get('/:RIF/:id_servicio', controller.getByService);
    AssignedEmployeeRouter.post('/', controller.asignEmployee);
    AssignedEmployeeRouter.delete('/', controller.unassignEmployee);

    return AssignedEmployeeRouter;
}