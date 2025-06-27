import { Request, Response } from 'express';
import { getDbPool } from "../config/SQLserverConection";

export class ActividadProductosController {

    // Obtener todas las actividades de productos
    static async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const result = await getDbPool().query('');
            
            console.log(result['recordset']);
            if (!result['recordset']) {
                res.status(404).json({ message: 'No se encontraron actividades de productos.' });
                return;
            }

            res.status(200).json(result['recordset']);
            return;
        } catch (error) {
            console.error('Error al obtener actividades de productos:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener actividades de productos.' });
            return;
        }
    }

    // Obtener actividad de producto por ID
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
                res.status(404).json({ message: 'Actividad de producto no encontrada.' });
                return;
            }

            res.status(200).json(result['recordset'][0]);
            return;
        } catch (error) {
            console.error('Error al obtener actividad de producto por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener actividad de producto.' });
            return;
        }
    }

    // Eliminar actividad de producto por ID
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
                res.status(404).json({ message: 'Actividad de producto no encontrada.' });
                return;
            }

            res.status(200).json({ message: 'Actividad de producto eliminada con éxito.' });
            return;
        } catch (error) {
            console.error('Error al eliminar actividad de producto:', error);
            res.status(500).json({ message: 'Error interno del servidor al eliminar actividad de producto.' });
            return;
        }
    }
} 