import {Router} from 'express';
import { SuppliersController } from '../controllers/ProveedoresController';
import { SuppliersModel } from '../models/Proveedores';

export const createSuppliersrouter = () => {
    const suppliersRouter = Router();

    const suppliersController = new SuppliersController(SuppliersModel);

    // Rutas.
    suppliersRouter.get('/', suppliersController.getAll);
    suppliersRouter.get('/:RIF', suppliersController.getByRif);
    suppliersRouter.post('/:RIF', suppliersController.addSupplier);
    suppliersRouter.patch('/:RIF', suppliersController.updateSupplier);
    suppliersRouter.delete('/:RIF', suppliersController.deleteSupplier);
    
    return suppliersRouter;
}