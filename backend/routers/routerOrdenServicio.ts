import { Router } from 'express';
import { OrdenesServicioController } from '../controllers/OrdenesServicioController';


export const  createRouterServiceOrder = () => {
    const router = Router();
        
    // Obtener todas las órdenes de servicio
    router.get('/', OrdenesServicioController.getAll);

    // Obtener orden de servicio por ID
    router.get('/:id', OrdenesServicioController.getByID);

    // Obtener órdenes de servicio por RIF
    router.get('/rif/:id_rif', OrdenesServicioController.getByRif);

    // Crear nueva orden de servicio completa
    router.post('/', OrdenesServicioController.create);

    // Actualizar orden de servicio por ID
    router.put('/:id', OrdenesServicioController.update);

    // Eliminar orden de servicio por ID
    router.delete('/:id', OrdenesServicioController.deleteByID);    

    return router
}
