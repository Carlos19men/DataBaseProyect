import { brandModel } from "../models/Marcas";
import { Request, Response } from "express";

interface Brand {
    id: number;
    name: string | null;
}

export class brandController {
    model: brandModel;

    constructor(model: brandModel){
        this.model = model;
    }

    getAll = async(_req: Request, res: Response<Brand[] | {message: string}>): Promise<void> => {
        try{
            const brands: Brand[] = await brandModel.getAll();

            if(!brands) {
                res.status(404).json({message: "No se ha podido obtener ninguna marca"});
                return;
            }

            res.status(200).json(brands);
            return;
        } catch(error) {
            console.error("Ha ocurrido un error", error);
            res.status(500).json({message: "Ha ocurrido un error en el servidor"});
            return;
        }
    }

    getbyID = async(req: Request, res: Response<Brand | {message: string}>): Promise<void> => {
        const id: number = parseInt(req.params.id, 10);
        
        if(id === null || id === undefined) {
            res.status(404).json({message: "Se requiere la cédula"});
            return;
        }

        try {
            const brand_data: Brand = await brandModel.getById(id);

            if(!brand_data){
                res.status(400).json({message: "No se pudo encontrar una marca con ese código"});
                return;
            }

            res.status(200).json(brand_data);
            return;
        } catch(error) {
            console.error("Ha ocurrido un error", error);
            res.status(500).json({message: "Ha ocurrido un error en el servidor"});
            return;
        }
    }

    editBrand = async(req: Request, res: Response<{message:string} | {error:string}>): Promise<void> => {
        const {id, name} = req.body;
        const brandId = parseInt(id);

        if(brandId === undefined || brandId <= 0) {
            res.status(404).json({message: "Se requiere el id"});
            return;
        }
        try{
            const result = await brandModel.editBrand({id: brandId, name});

            if('error' in result){
                res.status(400).json({message: "No se encontró una marca con ese código"});
                return;
            }

            res.status(200).json(result);
            return;
        } catch(error) {
            console.error("Ha ocurrido un error", error);
            res.status(500).json({message: "Ha ocurrido un error en el servidor"}); 
            return;
        }
    }

    addBrand = async(req: Request, res: Response<{message: string}>): Promise<void> => {
        const name = req.body.name;
        
        if(name === null || name.length === 0 || name === undefined){
            res.status(404).json({message: "Se requiere el nombre"});
            return;
        }

        try{
            const result = await brandModel.addBrand(name);

            if('error' in result){
                res.status(400).json({message: "No se ha podido crear el usuario"});
                return;
            }  

            if(result.rowsAffected === 0){
                res.status(400).json({message: "No se ha podido crear el usuario"});
                return;
            }

            res.status(201).json({message: "Marca creada correctamente"});
            return;
        } catch (error) {
            console.error("Ha ocurrido un error", error);
            res.status(500).json({message: "Ocurrió un error en el servidor"});
            return;
        }
    }

    deleteBrand = async(req: Request, res: Response<{message: string} | {error: string}>): Promise<void> => {
        const id: number = parseInt(req.params.id, 10);

        if(id === undefined || id <= 0) {
            res.status(404).json({error: "Se requiere el id"});
            return;
        }

        try {
            const result = await brandModel.deleteBrand(id);

            if('error' in result) {
                res.status(400).json({error: "No se encontró una marca con ese código"});
                return;
            }

            if(result.rowsAffected === 0){
                res.status(400).json({error: "No se ha podido eliminar la marca"});
                return;
            }

            res.status(200).json({message: "Marca eliminada correctamente"});
            return;
        } catch(error) {
            console.error("Ha ocurrido un error", error);
            res.status(500).json({error: "Ha ocurrido un error en el servidor"});
            return;
        }
    }
}