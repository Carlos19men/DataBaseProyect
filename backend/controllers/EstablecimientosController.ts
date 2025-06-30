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
    edit = async (req: Request, res: Response<{ message: string } | {error: string}>): Promise<void> => {
        const { RIF, name, city } = req.body;

        try {
            const result = await establishmentsModel.edit(RIF, name, city);
            if (!result) {
                res.status(400).json({error: 'Error al editar el establecimiento. Verifica los datos proporcionados.'  });
                return;
            }
            res.status(200).json({message: 'Establecimiento editado con éxito'});
        } catch (error) {
            console.error('Error al editar establecimiento:')
            console.error(error);
        }
    }

    //add Establishment
    add = async (req:Request, res:Response<{ message: string } | Establishment>): Promise<void> => {
        const { RIF, CI_PIC, name, city, date_PIC } = req.body;

        var date_E = date_PIC

        if (!RIF || RIF.length === 0) {
            res.status(400).json({ message: 'RIF es requerido.' });
            return;
        }

        if (!name || name.length === 0) {
            res.status(400).json({ message: 'Nombre del establecimiento es requerido.' });
            return;
        }

        if (!city || city.length === 0) {
            res.status(400).json({ message: 'Ciudad del establecimiento es requerida.' });
            return;
        }

        if(CI_PIC && !date_E){
            date_E = new Date().toISOString().split('T')[0]
        }

        if(!CI_PIC && date_PIC){
            res.status(400).json({message: 'Se necesita la cedula del encargado y la fecha'})
            return ;
        }

        try {
            const result = await establishmentsModel.add(RIF, CI_PIC, name, city, date_PIC);
            
            if(result['rowsAffected'] === 0){
                res.status(400).json({message:'No se agregó el establecimiento'})
            }
            
            res.status(201).json({ message: 'Establecimiento agregado con éxito.' });
            return;
        } catch (error) {
            if(error instanceof Error && error.message.includes('Cannot insert duplicate key')){
                res.status(409).json({message:'Conflicto: Establecimiento ya registrado'});
                return;
            }
            console.error('Error al agregar establecimiento:', error);
            res.status(500).json({ message: 'Internal Error:' + error });
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
            const result = await establishmentsModel.deleteEstablishment(RIF);
            if(result['rowsAffected'] === 0){
                res.status(400).json({message:'No se eliminó ningún establecimiento'})
            }
            res.status(200).json({ message: 'Establecimiento eliminado con éxito.' });
        } catch (error) {
            console.error('Error al eliminar establecimiento:', error);
            res.status(500).json({ message: 'Error interno del servidor al eliminar establecimiento.' });
        }
    }

    assignPersonInCharge = async(req: Request, res: Response<{message: string}>): Promise<void> => {
        const {RIF, CI_encargado, fecha} = req.body;

        if(!RIF || RIF.length === 0) {
            res.status(400).json({message: "Se requiere el RIF del establecimiento"});
            return;
        }

        if(!CI_encargado || CI_encargado.length === 0) {
            res.status(400).json({message: "Se requiere la cédula del encargado"});
            return;
        }

        try {
            const result = await establishmentsModel.asigPersonInCharge(RIF, CI_encargado, fecha);
            
            if(result['rowsAffected'] === 0) {
                res.status(400).json({message: 'No se asignó ningún encargado'});
                return;
            }

            res.status(200).json({message: 'Encargado asignado con éxito'});
            return;
        } catch (error) {
            console.error("Error al asignar encargado", error);
            res.status(500).json({message: "Error interno del servidor al asignar encargado"});
            return;
        }
    }

    removePersonInCharge = async(req: Request, res: Response<{message: string}>): Promise<void> => {
        const {RIF} = req.params;

        if(!RIF || RIF.length === 0) {
            res.status(400).json({message: "Se requiere el RIF del establecimiento"});
            return;
        }

        try {
            const result = await establishmentsModel.removePersonInCharge(RIF);
            
            if(result['rowsAffected'] === 0) {
                res.status(400).json({message: 'No se eliminó ningún encargado'});
                return;
            }

            res.status(200).json({message: 'Encargado eliminado con éxito'});
            return;
        } catch (error) {
            console.error("Error al eliminar encargado", error);
            res.status(500).json({message: "Error interno del servidor al eliminar encargado"});
            return;
        }
    }
}