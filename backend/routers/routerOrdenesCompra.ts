import {Router} from 'express';
import {OrdenCompraController} from '../controllers/OrdenCompraController';
import { buysOrderModel } from '../models/OrdenCompra';

export const createbuysOrderRouter = () => {
    const buysOrderRouter = Router();
    const buysOrderController = new OrdenCompraController(buysOrderModel);

    buysOrderRouter.get('/', buysOrderController.getAll);
    buysOrderRouter.get('/:id', buysOrderController.getById);
    /*buysOrderRouter.post('/', buysOrderController.create);
    buysOrderRouter.put('/:id', buysOrderController.update);
    buysOrderRouter.delete('/:id', buysOrderController.delete);*/

    return buysOrderRouter;
}