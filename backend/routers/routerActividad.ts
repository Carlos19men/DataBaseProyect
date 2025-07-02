import { Router } from "express";
import { ActividadController } from "../controllers/ActividadController";
import { Actividades } from "../models/Actividad";

const controller = new ActividadController(Actividades);

export const createActivityRouter = () => {
    const router = Router();

    // Obtener todas las actividades
    router.get('/', controller.getAll);

    // Obtener actividades por establecimiento
    router.get('/establecimiento/:RIF', controller.getByEstablecimiento);

    // Obtener actividades por servicio
    router.get('/servicio/:nro_servicio', controller.getByServicio);

    // Obtener una actividad específica
    router.get('/:nro_servicio/:nro_correlativo', controller.getByActividad);

    // Crear una nueva actividad
    router.post('/', controller.createActividad);

    // Actualizar una actividad
    router.patch('/', controller.updateActividad);

    // Eliminar una actividad
    router.delete('/', controller.deleteActividad);

    return router;
}; 