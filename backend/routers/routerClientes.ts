import { Router } from 'express';
import { customerModel } from '../models/Clientes';
import { CustomerController } from '../controllers/ClientesController';

export const createCustomerRouter = () => {
    const CustomerRouter = Router();

    const customerController = new CustomerController(customerModel);

    // Rutas para clientes
    CustomerRouter.get('/', customerController.getAll);

    CustomerRouter.get('/:CI', customerController.getByCI);

    CustomerRouter.post('/', customerController.add);

    CustomerRouter.patch('/', customerController.edit);

    CustomerRouter.delete('/:CI', customerController.delete);

    return CustomerRouter;
} 