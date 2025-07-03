import { FamilyProductsModel } from "../models/FamiliaProductos";
import { Request, Response } from "express";

interface FamilyProducts{
    id_family: number;
    name: string;
}

export class FamilyProductsController {
    model: FamilyProductsModel; 
    
    constructor(model: FamilyProductsModel){
        this.model = model;
    }

    getAll = async (_req: Request, res: Response<FamilyProducts[] | {error: string}>): Promise<void> => {
        try{
            const result = await FamilyProductsModel.getAll();

            if(!result){
                res.status(404).json({error: "No se encontraron familias de productos"});
                return;
            }
    
            res.status(200).json(result);
        } catch(error){
            res.status(500).json({error: "Error al obtener las familias de productos"});
            return;
        }  
    }

    getbyFamily = async(req: Request, res: Response<FamilyProducts[] | {error: string}>): Promise<void> => {
        const id_familia = parseInt(req.params.id_family,10);

        try{
            const result = await FamilyProductsModel.getbyFamily(id_familia);

            if(!result){
                res.status(404).json({error: "No se encontró la familia de productos"});
                return;
            }
            
            res.status(200).json(result);
        } catch(error) {
            res.status(500).json({error: "Error al obtener la familia de productos"});
            return;
        }
    }   
    
    addFamily = async(req: Request, res: Response<{message: string} | {error: string}>): Promise<void> => {
        const {name} = req.body;

        try{
            const result = await FamilyProductsModel.addFamily(name);

            if(result.rowsAffected === 0){
                res.status(404).json({error: "No se pudo agregar la familia de productos"});
                return;
            }

            res.status(200).json({message: "Familia de productos agregada con éxito"});
        } catch(error){
            console.error("Error al agregar la familia de productos", error);
            res.status(500).json({error: "Error interno del servidor al agregar la familia de productos"});
            return;
        }
    }

    updateFamily = async(req: Request, res: Response<{message: string} | {error: string}>): Promise<void> => {
        const {id_family, name} = req.body;

        try{
            const result = await FamilyProductsModel.updateFamily(id_family, name);

            if(result.rowsAffected === 0){
                res.status(404).json({error: "No se pudo actualizar la familia de productos"});
                return;
            }
            
            res.status(200).json({message: "Familia de productos actualizada con éxito"});
        } catch(error){
            res.status(500).json({error: "Error al actualizar la familia de productos"});
            return;
        }
    }

    deleteFamily = async(req: Request, res: Response<{message: string} | {error: string}>): Promise<void> => {
        const id_family = parseInt(req.body.id_family,10);

        try{
            const result = await FamilyProductsModel.deleteFamily(id_family);

            if(result.rowsAffected === 0){
                res.status(404).json({error: "No se pudo eliminar la familia de productos"});
                return;
            }

            res.status(200).json({message: "Familia de productos eliminada con éxito"});
        } catch(error){
            res.status(500).json({error: "Error al eliminar la familia de productos"});
            return;
        }
    }
}