import {Router} from 'express'
import { ServicesController } from '../controllers/ServiciosController'

export const createServiceRouter = () =>{

    const ServiceRouter = Router();

    const ServiceController = new ServicesController()

    //rutas
    ServiceRouter.get('/',ServiceController.getAll)

    ServiceRouter.get('/:id',ServiceController.getById)

    ServiceRouter.patch('/:id',ServiceController.editService)

    ServiceRouter.delete('/:id',ServiceController.deleteService)

    //falta agregar servicio
    
    return ServiceRouter
}