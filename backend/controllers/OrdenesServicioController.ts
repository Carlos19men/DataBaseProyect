import { Request, Response } from 'express';
import { getDbPool } from "../config/SQLserverConection";

export class OrdenesServicioController {

    // Obtener todas las órdenes de servicio
    static async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const result = await getDbPool().query('');
            
            console.log(result['recordset']);
            if (!result['recordset']) {
                res.status(404).json({ message: 'No se encontraron órdenes de servicio.' });
                return;
            }

            res.status(200).json(result['recordset']);
            return;
        } catch (error) {
            console.error('Error al obtener órdenes de servicio:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener órdenes de servicio.' });
            return;
        }
    }

    // Obtener orden de servicio por ID
    static async getByID(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const ordenId = parseInt(id);

        if (!id || isNaN(ordenId) || ordenId <= 0) {
            res.status(400).json({ message: 'ID de orden válido es requerido.' });
            return;
        }

        try {
            const request = getDbPool().request();
            request.input('id', ordenId);

            const result = await request.query('');

            if (!result['recordset'] || result['recordset'].length === 0) {
                res.status(404).json({ message: 'Orden de servicio no encontrada.' });
                return;
            }

            res.status(200).json(result['recordset'][0]);
            return;
        } catch (error) {
            console.error('Error al obtener orden de servicio por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener orden de servicio.' });
            return;
        }
    }

    // Eliminar orden de servicio por ID
    static async deleteByID(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const ordenId = parseInt(id);

        if (!id || isNaN(ordenId) || ordenId <= 0) {
            res.status(400).json({ message: 'ID de orden válido es requerido.' });
            return;
        }

        try {
            const request = getDbPool().request();
            request.input('id', ordenId);

            const result = await request.query('');

            if (result.rowsAffected[0] === 0) {
                res.status(404).json({ message: 'Orden de servicio no encontrada.' });
                return;
            }

            res.status(200).json({ message: 'Orden de servicio eliminada con éxito.' });
            return;
        } catch (error) {
            console.error('Error al eliminar orden de servicio:', error);
            res.status(500).json({ message: 'Error interno del servidor al eliminar orden de servicio.' });
            return;
        }
    }
} 