import { Request, Response } from "express";
import { inventoryModel } from "../models/Inventario";

interface Inventory {
    RIF: string;
    id_producto: number;
    cantidad: number;
}

export class InventoryController {
    model: inventoryModel;

    constructor(model: inventoryModel) {
        this.model = model;
    }

    getAll = async (_req: Request, res: Response<Inventory[] | {error: string}>): Promise<void> => {
        try {
            const inventory = await inventoryModel.getAll();
            res.status(200).json(inventory);
        } catch (error) {
            console.error("Error buscando el inventario", error);
            res.status(500).json({ error: "Error al buscar el inventario"});
        }
    }

    getByRIF = async (req: Request, res: Response<Inventory[] | {error: string}>): Promise<void> => {
        const { RIF } = req.params;
        
        if (!RIF) {
            res.status(400).json({ error: "RIF es requerido" });
            return;
        }

        try {
            const inventory = await inventoryModel.getByRIF(RIF);
            
            if (!inventory || inventory.length === 0) {
                res.status(404).json({ error: "No se encontró el inventario para el RIF proporcionado" });
                return;
            }

            res.status(200).json(inventory);
        } catch (error) {
            console.error("Error buscando el inventario por RIF", error);
            res.status(500).json({ error: "Error al buscar el inventario por RIF" });
        }
    }

    addProduct = async (req: Request, res: Response<{error: string} | {message: string}>): Promise<void> => {
        const {RIF,id_producto, cantidad} = req.body;

        if (!RIF || !id_producto || !cantidad) {
            res.status(400).json({ error: "RIF, id_producto y cantidad son requeridos" });
            return;
        }

        try {
            const newProduct = await inventoryModel.addProduct( RIF, id_producto, cantidad );

            if(newProduct.rowsAffected === 0){
                res.status(400).json({ error: "No se pudo agregar el producto al inventario" });
                return;
            }

            res.status(201).json({message: "Producto agregado al inventario con éxito"});
        } catch (error) {
            console.error("Error agregando un nuevo producto al inventario", error);
            res.status(500).json({ error: "Error al agregar un producto al inventario" });
        }
    }

    updateInventory = async (req: Request, res: Response<{error: string} | {message: string}>): Promise<void> => {
        
        const {RIF, id_producto_str, cantidad} = req.body;

        const id_producto = parseInt(id_producto_str, 10);

        if (!RIF) {
            res.status(400).json({ error: "El RIF es requerido" });
            return;
        }

        if(!id_producto) {
            res.status(400).json({ error: "El id_producto es requerido" });
            return;
        }

        if (!cantidad) {
            res.status(400).json({ error: "La cantidad es requerida" });
            return;
        }

        try {
            const updatedInventory = await inventoryModel.updateInventory(RIF, id_producto, cantidad);

            if(updatedInventory.rowsAffected === 0){
                res.status(400).json({ error: "No se pudo actualizar el inventario" });
                return;
            }

            res.status(200).json({message: "Inventario actualizado con éxito"});
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el inventario" });
        }
    }

    deleteProduct = async (req: Request, res: Response<{error: string} | {message: string}>): Promise<void> => {
        const {RIF, id_producto_str} = req.body;
        const id_producto = parseInt(id_producto_str, 10);

        if (!RIF) {
            res.status(400).json({ error: "El RIF es requerido" });
            return;
        }

        if (!id_producto) {
            res.status(400).json({ error: "El id_producto es requerido" });
            return;
        }

        try {
            await inventoryModel.deleteProduct(RIF, id_producto);
            res.status(200).json({ message: "Producto eliminado del inventario exitosamente" });
        } catch (error) {
            console.error("Error deleting product from inventory:", error);
            res.status(500).json({ error: "Error al eliminar el producto del inventario" });
        }
    }
}