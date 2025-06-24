import { Router } from "express";
import { InventoryController } from "../controllers/InventarioController";
import { inventoryModel } from "../models/Inventario";

const inventoryRouter = () => {
    const InventoryRouter = Router();
    const inventoryController = new InventoryController(inventoryModel);

    InventoryRouter.get("/", inventoryController.getAll);
    
    InventoryRouter.get("/:RIF", inventoryController.getByRIF);
    
    InventoryRouter.post("/:RIF", inventoryController.addProduct);
    
    InventoryRouter.put("/:RIF/:id_producto", inventoryController.updateInventory);
    
    InventoryRouter.delete("/:RIF/:id_producto", inventoryController.deleteProduct);
    
    return inventoryRouter;
}