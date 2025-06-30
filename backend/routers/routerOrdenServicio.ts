import { Router } from 'express';
import { OrdenesServicioController } from '../controllers/OrdenesServicioController';


export const  createRouterBusyOrder = () => {
    const router = Router();
    const busyOrderController = new OrdenesServicioController()
        
    // Obtener todas las órdenes de servicio
    router.get('/', OrdenesServicioController.getAll);

    // Obtener orden de servicio por ID
    router.get('/:id', OrdenesServicioController.getByID);

    // Obtener órdenes de servicio por RIF
    router.get('/rif/:id_rif', OrdenesServicioController.getByRif);

    // Crear nueva orden de servicio completa
    router.post('/', OrdenesServicioController.create);

    // Eliminar orden de servicio por ID
    router.delete('/:id', OrdenesServicioController.deleteByID);    

    return busyOrderController
}
