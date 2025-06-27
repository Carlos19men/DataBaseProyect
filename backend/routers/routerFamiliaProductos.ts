import {Router} from 'express';
import { FamilyProductsController } from '../controllers/FamiliaProductosController';
import { FamilyProductsModel } from '../models/FamiliaProductos';

export const createFamilyProductsRouter = () => {
    const FamilyProductsRouter = Router();

    const familyProductsController = new FamilyProductsController(FamilyProductsModel);

    FamilyProductsRouter.get('/', familyProductsController.getAll);
    FamilyProductsRouter.get('/:id_family', familyProductsController.getbyFamily);
    FamilyProductsRouter.post('/', familyProductsController.addFamily);
    FamilyProductsRouter.put('/:id_family', familyProductsController.updateFamily);
    FamilyProductsRouter.delete('/:id_family', familyProductsController.deleteFamily);

    return FamilyProductsRouter;
}