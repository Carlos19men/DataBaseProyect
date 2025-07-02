import { Router } from "express";
import { ProveedoresAsociadosController } from "../controllers/ProveedoresAsociadosController";
import { associatedEmployeesModel } from "../models/ProveedoresAsociados";



export const createProveedoresAsociadosRouter = () => {
    const router = Router();
    const AssociatedSuppliersController = new ProveedoresAsociadosController(associatedEmployeesModel);    

    // Obtener todos los proveedores asociados
    router.get('/', AssociatedSuppliersController.getAll);

    // Obtener proveedores asociados por RIF
    router.get('/:RIF', AssociatedSuppliersController.getByRif);

    // Insertar un nuevo proveedor asociado
    router.post('/', AssociatedSuppliersController.insert);

    // Actualizar un proveedor asociado
    router.patch('/', AssociatedSuppliersController.update);

    // Eliminar un proveedor asociado
    router.delete('/', AssociatedSuppliersController.delete);

    return router;
}; 