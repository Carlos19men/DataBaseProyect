import { Request, Response } from "express";
import { invoice } from "../models/Factura";

export class InvoiceController {
  model: typeof invoice;

  constructor(model: typeof invoice) {
    this.model = model;
  }

  getAll = async (_: Request, res: Response) => {
    try {
      const data = await this.model.getAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las facturas", error });
    }
  };

  getById = async (req: Request, res: Response) => {
    const { nro_factura } = req.params;
    try {
      const data = await this.model.getbyID(Number(nro_factura));
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la factura", error });
    }
  };

  delete = async (req: Request, res: Response) => {
    const { nro_factura } = req.params;
    try {
      const result = await this.model.deleteInvoice(Number(nro_factura));
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error al borrar la factura", error });
    }
  };

  getClientData = async (req: Request, res: Response) => {
    const { cod_OS } = req.params;
    try {
      const result = await this.model.getClientData(Number(cod_OS));
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving client data", error });
    }
  };

  getFacturaData = async (req: Request, res: Response) => {
    const { cod_OS } = req.params;
    try {
      const result = await this.model.getFacturaData(Number(cod_OS));
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving factura data", error });
    }
  };

  getVehicleData = async (req: Request, res: Response) => {
    const { cod_OS } = req.params;
    try {
      const result = await this.model.getVehicleData(Number(cod_OS));
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving vehicle data", error });
    }
  };

  getPaymentData = async (req: Request, res: Response) => {
    const { cod_OS } = req.params;
    try {
      const result = await this.model.getPaymentData(Number(cod_OS));
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving payment data", error });
    }
  };

  getEstablishmentData = async (req: Request, res: Response) => {
    const { cod_OS } = req.params;
    try {
      const result = await this.model.getEstablishmentData(Number(cod_OS));
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving establishment data", error });
    }
  };

  getServiceData = async (req: Request, res: Response) => {
    const { cod_OS } = req.params;
    try {
      const result = await this.model.getServiceData(Number(cod_OS));
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving service data", error });
    }
  };

  getMontosData = async (req: Request, res: Response) => {
    const { cod_OS } = req.params;
    try {
      const result = await this.model.getMontosData(Number(cod_OS));
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving montos data", error });
    }
  };

  createFromOrder = async (req: Request, res: Response) => {
    const { cod_OS, iva, fecha_emision } = req.body;
    console.log('FacturaController.createFromOrder - body:', req.body);
    try {
      const result = await this.model.createFromOrder(Number(cod_OS), iva, fecha_emision);
      console.log('FacturaController.createFromOrder - result:', result);
      res.status(200).json(result);
    } catch (error) {
      console.error('FacturaController.createFromOrder - error:', error);
      res.status(500).json({ message: "Error al crear la factura desde la orden de servicio", error });
    }
  };
}