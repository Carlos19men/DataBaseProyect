import { Request, Response } from 'express';
import { getDbPool } from "../config/SQLserverConection";

export class ComprasController {

    // Obtener todas las compras
    static async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const result = await getDbPool().query('');
            
            console.log(result['recordset']);
            if (!result['recordset']) {
                res.status(404).json({ message: 'No se encontraron compras.' });
                return;
            }

            res.status(200).json(result['recordset']);
            return;
        } catch (error) {
            console.error('Error al obtener compras:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener compras.' });
            return;
        }
    }

    // Obtener compra por ID
    static async getByID(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const compraId = parseInt(id);

        if (!id || isNaN(compraId) || compraId <= 0) {
            res.status(400).json({ message: 'ID de compra válido es requerido.' });
            return;
        }

        try {
            const request = getDbPool().request();
            request.input('id', compraId);

            const result = await request.query('');

            if (!result['recordset'] || result['recordset'].length === 0) {
                res.status(404).json({ message: 'Compra no encontrada.' });
                return;
            }

            res.status(200).json(result['recordset'][0]);
            return;
        } catch (error) {
            console.error('Error al obtener compra por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener compra.' });
            return;
        }
    }

    // Eliminar compra por ID
    static async deleteByID(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const compraId = parseInt(id);

        if (!id || isNaN(compraId) || compraId <= 0) {
            res.status(400).json({ message: 'ID de compra válido es requerido.' });
            return;
        }

        try {
            const request = getDbPool().request();
            request.input('id', compraId);

            const result = await request.query('');

            if (result.rowsAffected[0] === 0) {
                res.status(404).json({ message: 'Compra no encontrada.' });
                return;
            }

            res.status(200).json({ message: 'Compra eliminada con éxito.' });
            return;
        } catch (error) {
            console.error('Error al eliminar compra:', error);
            res.status(500).json({ message: 'Error interno del servidor al eliminar compra.' });
            return;
        }
    }
} 