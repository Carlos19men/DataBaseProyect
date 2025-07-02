import { Router } from "express";
import { ActividadProductosController } from "../controllers/ActividadProductosController";
import { ActividadProductosModel } from "../models/ActividadProductos";

export const createActivityProductRouter = () => {
    const router = Router();
    const controller = new ActividadProductosController(ActividadProductosModel);

    router.get('/', controller.getAll);
    router.get('/:id_producto/:nro_servicio/:nro_correlativo', controller.getByID);
    router.post('/', controller.create);
    router.patch('/', controller.update);
    router.delete('/', controller.deleteByID);

    return router;
}