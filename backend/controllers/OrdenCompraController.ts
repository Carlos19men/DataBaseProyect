import { Request,Response } from "express";
import { buysOrderModel } from "../models/OrdenCompra";

interface BuysOrder {
    id_orden: number;
    RIF_establecimiento: string;
    fecha_orden: string;
    total: number;
}

export class OrdenCompraController {
    model: buysOrderModel;

    constructor(model: buysOrderModel) {
        this.model = model;
    }

    getAll = async (_req: Request, res: Response<BuysOrder[] | { message: string }>): Promise<void> => {
        try {
            const ordenes: BuysOrder[] = await buysOrderModel.getAll();

            if (!ordenes || ordenes.length === 0) {
                res.status(404).json({ "message": "No se encontraron órdenes de compra" });
                return;
            }

            res.status(200).json(ordenes);
            return;
        } catch (error) {
            console.error("Error al obtener órdenes de compra", error);
            res.status(500).json({ message: "Error interno del servidor al encontrar órdenes de compra" });
            return;
        }
    }

    getById = async (req: Request, res: Response<BuysOrder | { message: string }>): Promise<void> => {
        const { id_orden } = req.params;

        if (!id_orden) {
            res.status(400).json({ "message": "Se requiere un ID válido de la orden de compra" });
            return;
        }

        try {
            const orden_data: BuysOrder = await buysOrderModel.getByID(parseInt(id_orden, 10));

            if (!orden_data) {
                res.status(404).json({ message: "No se encontró una orden de compra con ese ID" });
                return;
            }

            res.status(200).json(orden_data);
            return;
        } catch (error) {
            console.error("Error al obtener la orden de compra con ese ID", error);
            res.status(500).json({ message: "Error interno del servidor al conseguir una orden de compra" });
            return;
        }
    }

    newOrdenCompra = async (req: Request, res: Response<{ message: string }>): Promise<void> => {
        
        const {nro_OC, fecha_compra,RIF_Est,total} = req.body;

        try {
            
            const ordenCompraData = await buysOrderModel.create(fecha_compra,RIF_Est,);

            if (!ordenCompraData || !ordenCompraData.CI_empleado || !ordenCompraData.fecha_orden || !ordenCompraData.total) {
                res.status(400).json({ message: "Datos incompletos para crear una nueva orden de compra" });
                return;
            }

            await this.model.create(ordenCompraData);
            res.status(201).json({ message: "Orden de compra creada exitosamente" });
        } catch (error) {
            console.error("Error al crear la orden de compra", error);
            res.status(500).json({ message: "Error interno del servidor al crear una orden de compra" });
        }
    }

    updateOrdenCompra = async (req: Request, res: Response<{ message: string }>): Promise<void> => {
        const { id_orden } = req.params;
        const ordenCompraData: BuysOrder = req.body;

        if (!id_orden || id_orden.length === 0) {
            res.status(400).json({ "message": "Se requiere un ID válido de la orden de compra" });
            return;
        }

        try {
            await this.model.update(id_orden, ordenCompraData);
            res.status(200).json({ message: "Orden de compra actualizada exitosamente" });
        } catch (error) {
            console.error("Error al actualizar la orden de compra", error);
            res.status(500).json({ message: "Error interno del servidor al actualizar una orden de compra" });
        }
    }
}