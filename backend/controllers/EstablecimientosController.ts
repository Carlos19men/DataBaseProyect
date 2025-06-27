import { Request, Response } from 'express'; // Importa los tipos de Express
import { establishmentsModel } from '../models/Establecimientos'

interface Establishment {
    ID: number;
    RIF: string;
    CI_PIC: string | null;
    name: string | null;
    city: string | null;
    date_PIC: Date | null;
}

export class EstablishmentController{

    model: establishmentsModel;

    // Constructor
    constructor(model: establishmentsModel) {
        this.model = model;
    }

    // Get all establishments
    getAll = async (_req: Request, res: Response<Establishment[] | { message: string }>): Promise<void> => {
        try {
            const establishmentsList: Establishment[] = await establishmentsModel.getAll();
            if (!establishmentsList || establishmentsList.length === 0) {
                res.status(404).json({ message: 'No se encontraron establecimientos.' });
                return;
            }
            res.status(200).json(establishmentsList);
        } catch (error) {
            console.error('Error al obtener establecimientos:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener establecimientos.' });
        }
    }

    // Get establishment by RIF
    getByRIF = async (req: Request, res: Response<Establishment | { message: string }>): Promise<void> => {
        const { RIF } = req.params;

        if (!RIF || RIF.length === 0) {
            res.status(400).json({ message: 'RIF es requerido.' });
            return;
        }

        try {
            const establishmentData: Establishment = await establishmentsModel.getByRIF(RIF);
            
            
            if (!establishmentData) {
                res.status(404).json({ message: 'Establecimiento no encontrado.' });
                return;
            }
            res.status(200).json(establishmentData);
        } catch (error) {
            console.error('Error al obtener establecimiento por RIF:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener establecimiento por RIF.' });
        }
    }

    // Edit establishment
    edit = async (req: Request, res: Response<{ message: string } | Establishment>): Promise<void> => {
        const { RIF, CI_PIC, name, city, date_PIC } = req.body;

        try {
            const result = await establishmentsModel.edit({ RIF, CI_PIC, name, city, date_PIC });
            if (!result) {
                res.status(400).json({ message: 'Error al editar el establecimiento. Verifica los datos proporcionados.'  });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            console.error('Error al editar establecimiento:')
            console.error(error);
        }
    }

    //add Establishment
    add = async (req:Request, res:Response<{ message: string } | Establishment>): Promise<void> => {
        const { RIF, CI_PIC, name, city, date_PIC } = req.body;

        if (!RIF || RIF.length === 0) {
            res.status(400).json({ message: 'RIF es requerido.' });
            return;
        }

            
            
        try {

            const result = await establishmentsModel.add({ RIF, CI_PIC, name, city, date_PIC });
            const result = await establishmentsModel.add({ RIF, CI_PIC, name, city, date_PIC: new Date(date_PIC) });
            res.status(201).json({ message: 'Establecimiento agregado con éxito.', ...result });
            return;
        } catch (error) {
            console.error('Error al agregar establecimiento:', error);
            res.status(500).json({ message: 'Error interno del servidor al agregar establecimiento.' });
            return; 
        }
    }

    // Delete establishment
    delete = async (req: Request, res: Response<{ message: string } | Establishment>): Promise<void> => {

        const { RIF } = req.params;

        if (!RIF || RIF.length === 0) {
            res.status(400).json({ message: 'RIF es requerido.' });
            return;
        }

        try {
            const establishmentData = await establishmentsModel.deleteEstablishment(RIF);
            if (!establishmentData) {
                res.status(404).json({ message: 'Establecimiento no encontrado.' });
                return;
            }
            res.status(200).json({ message: 'Establecimiento eliminado con éxito.' });
        } catch (error) {
            console.error('Error al eliminar establecimiento:', error);
            res.status(500).json({ message: 'Error interno del servidor al eliminar establecimiento.' });
        }
    }
}