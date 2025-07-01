import { Router } from "express";
import { ComprasController } from "../controllers/ComprasController";
import { ComprasModel } from "../models/Compras";

export const createComprasRouter = () => {
    const ComprasRouter = Router();
    const comprasController = new ComprasController(ComprasModel);

    ComprasRouter.get("/", comprasController.getAll);
    
    ComprasRouter.get("/:nro_compra", comprasController.getByID);
    
    ComprasRouter.delete("/:nro_compra", comprasController.deleteByID);
    
    return ComprasRouter;
}