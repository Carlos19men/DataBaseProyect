import {Router} from 'express'
import { employeeModel } from '../models/Empleados'
import { EmployeeController } from '../controllers/EmpleadosController'

export const createEmployeeRouter = () => {
    const EmployeeRouter = Router();

    const employeeController = new EmployeeController(employeeModel);

    // Rutas.
    EmployeeRouter.get('/', employeeController.getAll);

    EmployeeRouter.get('/:CI', employeeController.getbyCI)

    EmployeeRouter.get('/RIF/:RIF', employeeController.getbyRIF);

    EmployeeRouter.patch('/edit', employeeController.editEmployee);

    EmployeeRouter.delete('/:CI', employeeController.deleteEmployee);

    EmployeeRouter.post('/', employeeController.addEmployee);
    

    return EmployeeRouter;
}