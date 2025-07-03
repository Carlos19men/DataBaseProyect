import {Router} from 'express';
import { FamilyProductsController } from '../controllers/FamiliaProductosController';
import { FamilyProductsModel } from '../models/FamiliaProductos';

export const createFamilyProductsRouter = () => {
    const FamilyProductsRouter = Router();

    const familyProductsController = new FamilyProductsController(FamilyProductsModel);

    FamilyProductsRouter.get('/', familyProductsController.getAll);
    FamilyProductsRouter.get('/:id_family', familyProductsController.getbyFamily);
    FamilyProductsRouter.post('/', familyProductsController.addFamily);
    FamilyProductsRouter.patch('/', familyProductsController.updateFamily);
    FamilyProductsRouter.delete('/', familyProductsController.deleteFamily);

    return FamilyProductsRouter;
}