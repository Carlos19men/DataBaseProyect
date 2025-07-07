import { Router } from "express";
import { AlertasController } from "../controllers/AlertasController";

export const createAlertasRouter = () => {
    const alertasRouter = Router();
    const alertasController = new AlertasController();

    // Obtener todas las alertas
    alertasRouter.get("/", alertasController.getAll);
    
    // Obtener alertas por establecimiento
    alertasRouter.get("/establecimiento/:RIF", alertasController.getByEstablecimiento);
    
    // Limpiar alertas antiguas
    alertasRouter.delete("/limpiar", alertasController.limpiarAlertasAntiguas);
    
    return alertasRouter;
} 