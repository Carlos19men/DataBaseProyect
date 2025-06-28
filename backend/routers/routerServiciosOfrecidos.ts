import { Router } from 'express';
import { ServiciosOfrecidosModel } from '../models/ServicioOfrecidos';
import { ServiciosOfrecidosController } from '../controllers/ServiciosOfrecidosController';

export const createOfferedServicesRouter = () => {
    const OfferedServicesRouter = Router();

    const serviciosOfrecidosController = new ServiciosOfrecidosController(ServiciosOfrecidosModel);

    // Rutas para servicios ofrecidos
    OfferedServicesRouter.get('/', serviciosOfrecidosController.getAll);

    // Obtener servicios por RIF y número de servicio
    OfferedServicesRouter.get('/rif/:RIF/servicio/:nro_servicio', serviciosOfrecidosController.getByRIFAndService);

    // Obtener servicios por RIF
    OfferedServicesRouter.get('/rif/:RIF', serviciosOfrecidosController.getByRIF);

    // Obtener servicios por número de servicio
    OfferedServicesRouter.get('/servicio/:nro_servicio', serviciosOfrecidosController.getByService);

    // Agregar servicio ofrecido
    OfferedServicesRouter.post('/', serviciosOfrecidosController.addService);

    // Eliminar servicio ofrecido
    OfferedServicesRouter.delete('/', serviciosOfrecidosController.deleteService);

    // Obtener servicios no ofrecidos
    OfferedServicesRouter.get('/no-ofrecidos', serviciosOfrecidosController.getServicesNotOffered);

    // Obtener servicios no ofrecidos por RIF
    OfferedServicesRouter.get('/no-ofrecidos/rif/:RIF', serviciosOfrecidosController.getServicesNotOfferedRIF);

    return OfferedServicesRouter;
} 