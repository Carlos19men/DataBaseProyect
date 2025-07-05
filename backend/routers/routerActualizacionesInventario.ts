import { Router } from "express";
import { ActualizacionesInventarioController } from "../controllers/ActualizacionesInventarioController";
import { ActulizationInteroyModel } from "../models/ActualizacionesInvetario";

export const createActualizacionesInventarioRouter = () => {
    const actualizacionesInventarioRouter = Router();
    const actualizacionesInventarioController = new ActualizacionesInventarioController(ActulizationInteroyModel);

    // Obtener todas las actualizaciones por establecimiento
    actualizacionesInventarioRouter.get("/establishment/:RIF", actualizacionesInventarioController.getByEstablishment);
    
    // Obtener actualizaciones por producto específico en un establecimiento
    actualizacionesInventarioRouter.get("/establishment/:RIF/product/:id_producto", actualizacionesInventarioController.getByProduct);
    
    // Crear nueva actualización de inventario
    actualizacionesInventarioRouter.post("/", actualizacionesInventarioController.createModification);
    
    return actualizacionesInventarioRouter;
} 