import {Request, Response} from 'express';
import { ModelsModel } from '../models/Modelos';

interface Model {
    id_marca: number;
    nro_modelo : number;
    nombre: string;
    aceite_caja: string;
    aceite_motor: string;
    octanaje: string;
    tipo_refrigerante: string;
    peso: number;
    descripcion: string;
    nro_puesto: number;
}

export class ModelsController {
    model: ModelsModel;

    constructor(model: ModelsModel){
        this.model = model;
    }

    getAll = async (_req: Request, res: Response<Model[] | {message: string}>): Promise<void> => {
        try {
            const result: Model[] = await ModelsModel.getAll();

            if(!result){
                res.status(404).json({ message: 'No se encontraron modelos' });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            console.error('Error al obtener los modelos:', error);
            res.status(500).json({ message: 'Error al obtener los modelos'});
        }
    }

    getbyID = async(req: Request, res: Response<Model | {message: string}>): Promise<void> => {
        const id_marca = parseInt(req.params.id_marca, 10);
        const id_modelo = parseInt(req.params.id_modelo, 10);

        try{
            const result: Model = await ModelsModel.getById(id_marca,id_modelo);

            if (!result) {
                res.status(404).json({ message: 'Modelo no encontrado' });
                return;
            }
            res.status(200).json(result);
        } catch(error) {
            console.error("Ha ocurrido un error", error);
            res.status(500).json({message: ""});
        }
    }

    getbyMarca = async(req: Request, res: Response<Model[] | {error: string}>): Promise<void> => {
        //const id_marca = parseInt(req.params.id_marca, 10);
        const id_marca = req.params.id_marca;

        try {
            const result = await ModelsModel.getByMarca(parseInt(id_marca));

            if('error' in result){
                res.status(400).json({error: result.error as string});
                return;
            }

            const brand_data: Model[] = result;
            res.status(200).json(brand_data);
        } catch(error) {
            console.error("Ha ocurrido un error", error);
            res.status(500).json({error: "Ha ocurrido un error en el servidor"});
        }
    }

    createModel = async(req: Request, res: Response<{message: string} | {error: string}>): Promise<void> => {
        const id_marca = parseInt(req.params.id_marca, 10);
        const {nombre, aceite_caja, aceite_motor, octanaje, tipo_refrigerante, peso_str, descripcion, nro_puesto_str} = req.body; 
        
        const peso = parseInt(peso_str, 10);
        const nro_puesto = parseInt(nro_puesto_str,10);

        try{
            const result = await ModelsModel.createModel(id_marca, nombre, aceite_caja, aceite_motor, octanaje, tipo_refrigerante, peso, descripcion, nro_puesto); 

            if('error' in result && result.error !== undefined){
                res.status(400).json({error: result.error as string});
                return;
            }

            if(result.rowsAffected === 0){
                res.status(400).json({error: "No se pudo crear el modelo"});
                return;
            }

            res.status(201).json({message: "Modelo creado correctamente"});
        } catch(error){
            console.error("Ha ocurrido un error", error);
            res.status(500).json({error: "Ha ocurrido un error en el servidor"});
        }
    }

    editModel = async(req: Request, res: Response<{message: string} | {error: string}>): Promise<void> => {
        const {
            id_marca,
            id_modelo,
            nombre = null,
            aceite_caja = null,
            aceite_motor = null,
            octanaje = null,
            tipo_refrigerante = null,
            descripcion = null,
            peso_str = null,
            nro_puesto_str = null
        } = req.body;

        const marcaId = parseInt(id_marca);
        const modeloId = parseInt(id_modelo);
        let peso: number | null = (peso_str != null && peso_str !== '') ? Number(peso_str) : null;
        let nro_puesto: number | null = (nro_puesto_str != null && nro_puesto_str !== '') ? Number(nro_puesto_str) : null;

        peso = isNaN(peso as number) ? null : peso;
        nro_puesto = isNaN(nro_puesto as number) ? null : nro_puesto;

        try{
            const result = await ModelsModel.editModel(
                marcaId,
                modeloId,
                nombre,
                aceite_caja,
                aceite_motor,
                octanaje,
                tipo_refrigerante,
                peso,
                descripcion,
                nro_puesto
            );

            if('error' in result && result.error !== undefined){
                res.status(400).json({error: result.error as string});
                return;
            }

            if(result.rowsAffected === 0){
                res.status(400).json({error: "No se pudo editar el modelo"});
                return;
            }

            res.status(200).json({message: "Modelo editado correctamente"});
        } catch(error){
            console.error("Ha ocurrido un error", error);
            res.status(500).json({error: "Ha ocurrido un error en el servidor"});
        }
    }

    deleteModel = async(req: Request, res: Response<{message: string} | {error: string}>): Promise<void> => {
        const id_marca = parseInt(req.params.id_marca, 10);
        const id_modelo = parseInt(req.params.id_modelo, 10);

        try{
            const result = await ModelsModel.delete(id_marca, id_modelo);

            if('error' in result && result.error !== undefined){
                res.status(400).json({error: result.error as string});
                return;
            }

            if(result.rowsAffected === 0){
                res.status(400).json({error: "No se pudo eliminar el modelo"});
                return;
            }

            res.status(200).json({message: "Modelo eliminado correctamente"});
        } catch(error){
            console.error("Ha ocurrido un error", error);
            res.status(500).json({error: "Ha ocurrido un error en el servidor"});
        }
    }
}