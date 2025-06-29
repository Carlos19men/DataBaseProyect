import { Request, Response } from "express";
import { SuppliersModel } from "../models/Proveedores";

interface Suppliers{
    RIF: string,
    razon_social: string,
    direccion: string, 
    local: string
}

export class SuppliersController {
    model: SuppliersModel;

    constructor(model: SuppliersModel){
        this.model = model;
    }


    // Get all suppliers
    getAll = async (_req: Request, res: Response<Suppliers[] | {message: string}>): Promise<void> => {
        try {
            const suppliers: Suppliers[] = await SuppliersModel.getAll();

            if(!suppliers || suppliers.length === 0) {
                res.status(404).json({ message: 'No suppliers found' });
                return;
            }

            res.status(200).json(suppliers);
        } catch (error) {
            console.error("Ha ocurrido un error al obtener los proveedores:", error);
            res.status(500).json({ message: 'Error retrieving suppliers'});
        }
    }

    // Get supplier by RIF
    getByRif = async (req: Request, res: Response<Suppliers | { message: string }>): Promise<void> => {
        const { RIF } = req.params;
        try {
            const supplier = await SuppliersModel.getByRif(RIF);
            
            if (!supplier) {
                res.status(404).json({ message: 'Supplier not found' });
                return;
            }

            res.status(200).json(supplier);
        } catch (error) {
            console.error("Ha ocurrido un error ", error);
            res.status(500).json({ message: 'Error retrieving supplier'});
        }
    }

    // Create a new supplier
    addSupplier = async(req: Request, res: Response<{message: string} | { error: string }>): Promise<void> => {
        const {RIF} = req.params;
        const {razonSo, direccion, local_, telefono, persona_contacto } = req.body;

        try {
            const result = await SuppliersModel.create({ RIF, razonSo, direccion, local_, telefono, persona_contacto });

            if(result.rowsAffected === 0){
                res.status(400).json({error: "No se pudo encontrar un proveedor con ese RIF"});
                return;
            }

            res.status(201).json({message: "Proveedor creado correctamente"});
        } catch (error) {
            res.status(500).json({ message: 'Error creating supplier'});
        }
    }

    updateSupplier = async(req: Request, res: Response<{error: string} | {message: string}>): Promise<void> => {
        const {RIF} = req.params;
        const {razonSo = null, direccion = null, local_ = null, telefono = null, persona_contacto = null } = req.body;

        console.log({razonSo, direccion, local_, telefono, persona_contacto});
        try{
            const result = await SuppliersModel.update({RIF, razonSo, direccion, local_, telefono, persona_contacto});

            if(result.rowsAffected === 0){
                res.status(400).json({error: "No se pudo realizar la actualización del proveedor"});
                return;
            }

            res.status(200).json({message: "Proveedor actualizado correctamente"});
        } catch(error){
            console.error("Ha ocurrido un error", error);
            res.status(500).json({error: "Ocurrió un error interno en el servidor"});
        }
    }

    deleteSupplier = async(req: Request, res: Response<{error: string} | {message: string}>): Promise<void> => {
        const RIF: string = req.params.RIF;

        try{
            const result = await SuppliersModel.deleted(RIF);

            if (result.rowsAffected === 0) {
                res.status(404).json({ error: "Supplier not found" });
                return;
            }

            res.status(200).json({ message: "Proveedor eliminado correctamente" });
        } catch(error){
            console.error("Ha ocurrido un error al eliminar el proveedor", error);
            res.status(500).json({ error: "Error eliminando a un proveedor"});
        }
    }
}