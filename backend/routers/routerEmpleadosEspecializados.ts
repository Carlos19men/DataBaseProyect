import { Router } from 'express';
import { EmpleadosEspecializadosController } from '../controllers/EmpleadosEspecializadosController';

export const createEmpleadosEspecializadosRouter = () => {
    const EmpleadosEspecializadosRouter = Router();
    const EmpleadosEspecializadosControllerInstance = new EmpleadosEspecializadosController();

    // Rutas
    EmpleadosEspecializadosRouter.get('/', EmpleadosEspecializadosControllerInstance.getAll);
    
    EmpleadosEspecializadosRouter.get('/ci/:CI', EmpleadosEspecializadosControllerInstance.getByCI);
    
    EmpleadosEspecializadosRouter.get('/rif/:RIF', EmpleadosEspecializadosControllerInstance.getByRIF);
    
    EmpleadosEspecializadosRouter.get('/service/:nro_servicio', EmpleadosEspecializadosControllerInstance.getByService);
    
    EmpleadosEspecializadosRouter.post('/', EmpleadosEspecializadosControllerInstance.addSpecialization);
    
    EmpleadosEspecializadosRouter.delete('/', EmpleadosEspecializadosControllerInstance.deleteSpecialization);

    return EmpleadosEspecializadosRouter;
}; 