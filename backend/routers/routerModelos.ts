import { Router } from "express";
import { ModelsController } from "../controllers/ModelosController";
import { ModelsModel } from "../models/Modelos";

export const createModelsRouter = (): Router => {
    const ModelsRouter = Router();
    const modelsController = new ModelsController(ModelsModel);

    ModelsRouter.get('/', modelsController.getAll);
    ModelsRouter.get('/:id_marca/:id_modelo', modelsController.getbyID);
    ModelsRouter.get('/:id_marca', modelsController.getbyMarca);
    ModelsRouter.post('/:id_marca', modelsController.createModel);
    ModelsRouter.patch('/:id_marca/:id_modelo', modelsController.editModel);
    ModelsRouter.delete('/:id_marca/:id_modelo', modelsController.deleteModel);

    return ModelsRouter;
}