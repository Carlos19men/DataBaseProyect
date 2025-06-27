import { Request, Response } from 'express';
import { getDbPool } from "../config/SQLserverConection";

export class ActividadesOSController {

    // Obtener todas las actividades de orden de servicio
    static async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const result = await getDbPool().query('');
            
            console.log(result['recordset']);
            if (!result['recordset']) {
                res.status(404).json({ message: 'No se encontraron actividades de orden de servicio.' });
                return;
            }

            res.status(200).json(result['recordset']);
            return;
        } catch (error) {
            console.error('Error al obtener actividades de orden de servicio:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener actividades de orden de servicio.' });
            return;
        }
    }

    // Obtener actividad de orden de servicio por ID
    static async getByID(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const actividadId = parseInt(id);

        if (!id || isNaN(actividadId) || actividadId <= 0) {
            res.status(400).json({ message: 'ID de actividad válido es requerido.' });
            return;
        }

        try {
            const request = getDbPool().request();
            request.input('id', actividadId);

            const result = await request.query('');

            if (!result['recordset'] || result['recordset'].length === 0) {
                res.status(404).json({ message: 'Actividad de orden de servicio no encontrada.' });
                return;
            }

            res.status(200).json(result['recordset'][0]);
            return;
        } catch (error) {
            console.error('Error al obtener actividad de orden de servicio por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener actividad de orden de servicio.' });
            return;
        }
    }

    // Eliminar actividad de orden de servicio por ID
    static async deleteByID(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const actividadId = parseInt(id);

        if (!id || isNaN(actividadId) || actividadId <= 0) {
            res.status(400).json({ message: 'ID de actividad válido es requerido.' });
            return;
        }

        try {
            const request = getDbPool().request();
            request.input('id', actividadId);

            const result = await request.query('');

            if (result.rowsAffected[0] === 0) {
                res.status(404).json({ message: 'Actividad de orden de servicio no encontrada.' });
                return;
            }

            res.status(200).json({ message: 'Actividad de orden de servicio eliminada con éxito.' });
            return;
        } catch (error) {
            console.error('Error al eliminar actividad de orden de servicio:', error);
            res.status(500).json({ message: 'Error interno del servidor al eliminar actividad de orden de servicio.' });
            return;
        }
    }
} 