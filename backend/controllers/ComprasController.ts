import { Request, Response } from 'express';
import { getDbPool } from "../config/SQLserverConection";
import { ComprasModel } from '../models/Compras';

interface Compras {
    nro_compra: number;
    id_producto: number;
    cantidad_producto: number;
    precio_und: number;
}
export class ComprasController {
    model: ComprasModel;

    constructor(model: ComprasModel) {
        this.model = model;
    }

    // Obtener todas las compras
    getAll = async (_req: Request, res: Response<Compras[] | {error: string}>): Promise<void> => {
        try {
            const result = await getDbPool().query('Select * from Compras;');
            
            if (!result['recordset']) {
                res.status(404).json({ error: 'No se encontraron compras.' });
                return;
            }

            res.status(200).json(result['recordset']);
            return;
        } catch (error) {
            console.error('Error al obtener compras:', error);
            res.status(500).json({error: 'Error interno del servidor al obtener compras.' });
            return;
        }
    }

    // Obtener compra por ID
    getByID = async (req: Request, res: Response<Compras[] | {error: string}>): Promise<void> => {
        const { nro_compra } = req.params;
        const compraId = parseInt(nro_compra);

        if (!nro_compra || isNaN(compraId) || compraId <= 0) {
            res.status(400).json({ error: 'ID de compra válido es requerido.' });
            return;
        }

        try {
            const request = getDbPool().request();
            request.input('id', compraId);

            const result = await request.query('');

            if (!result['recordset'] || result['recordset'].length === 0) {
                res.status(404).json({ error: 'Compra no encontrada.' });
                return;
            }

            res.status(200).json(result['recordset'][0]);
            return;
        } catch (error) {
            console.error('Error al obtener compra por ID:', error);
            res.status(500).json({ error: 'Error interno del servidor al obtener compra.' });
            return;
        }
    }

    // Eliminar compra por ID
    deleteByID = async (req: Request, res: Response<{error: string} | {message: string}>): Promise<void> => {
        const { nro_compra } = req.params;
        const compraId = parseInt(nro_compra);

        if (!nro_compra || isNaN(compraId) || compraId <= 0) {
            res.status(400).json({ error: 'ID de compra válido es requerido.' });
            return;
        }

        try {
            const result = await ComprasModel.deleteByID(compraId);

            if (result.rowsAffected === 0) {
                res.status(404).json({ error: 'Compra no encontrada.' });
                return;
            }

            res.status(200).json({ message: 'Compra eliminada con éxito' });
            return;
        } catch (error) {
            console.error('Error al eliminar compra:', error);
            res.status(500).json({ error: 'Error interno del servidor al eliminar compra.' });
            return;
        }
    }
} 