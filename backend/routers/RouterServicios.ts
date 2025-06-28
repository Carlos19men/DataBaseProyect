import {Router} from 'express'
import { ServicesController } from '../controllers/ServiciosController'

export const createServiceRouter = () =>{

    const ServiceRouter = Router();

    const ServiceController = new ServicesController()

    //rutas
    ServiceRouter.get('/',ServiceController.getAll)

    ServiceRouter.get('/:nro_servicio',ServiceController.getById)

    ServiceRouter.patch('/:nro_servicio',ServiceController.editService)

    ServiceRouter.delete('/:nro_servicio',ServiceController.deleteService)

    ServiceRouter.post('/',ServiceController.createService)

    //falta agregar servicio
    
    return ServiceRouter
}