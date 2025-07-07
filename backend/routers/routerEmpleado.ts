import {Router} from 'express'
import { employeeModel } from '../models/Empleados'
import { EmployeeController } from '../controllers/EmpleadosController'
import { authorize } from '../middelware/auth';

export const createEmployeeRouter = () => {
    const EmployeeRouter = Router();

    const employeeController = new EmployeeController(employeeModel);

    // Rutas.
    EmployeeRouter.get('/', authorize(['Administrador']), employeeController.getAll);

    EmployeeRouter.get('/:CI', employeeController.getbyCI)

    EmployeeRouter.get('/RIF/:RIF', employeeController.getbyRIF);

    EmployeeRouter.patch('/', employeeController.editEmployee);

    EmployeeRouter.delete('/:CI', employeeController.deleteEmployee);

    EmployeeRouter.post('/', employeeController.addEmployee);
    

    return EmployeeRouter;
}