import { Router } from 'express';
import { ProductModel } from '../models/Productos';
import { ProductosController } from '../controllers/ProductosController';

export const createProductosRouter = () => {
    const ProductosRouter = Router();

    const productosController = new ProductosController(ProductModel);

    // Rutas para productos
    ProductosRouter.get('/', productosController.getAll);

    ProductosRouter.get('/:id', productosController.getById);

    ProductosRouter.post('/', productosController.create);

    ProductosRouter.patch('/:id', productosController.edit);

    ProductosRouter.delete('/:id', productosController.delete);

    return ProductosRouter;
} 