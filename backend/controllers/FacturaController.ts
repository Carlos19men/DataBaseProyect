import { Request, Response } from "express";
import { invoice } from "../models/Factura";

export class InvoiceController {
  static async getAll(_: Request, res: Response) {
    try {
      const data = await invoice.getAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las facturas", error });
    }
  }

  static async getById(req: Request, res: Response) {
    const { nro_factura } = req.params;
    try {
      const data = await invoice.getbyID(Number(nro_factura));
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la factura", error });
    }
  }

  static async delete(req: Request, res: Response) {
    const { nro_factura } = req.params;
    try {
      const result = await invoice.deleteInvoice(Number(nro_factura));
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error al borrar la factura", error });
    }
  }

  static async getClientData(req: Request, res: Response) {
    const { cod_OS } = req.params;
    try {
      const result = await invoice.getClientData(Number(cod_OS));
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving client data", error });
    }
  }

  static async getFacturaData(req: Request, res: Response) {
    const { cod_OS } = req.params;
    try {
      const result = await invoice.getFacturaData(Number(cod_OS));
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving factura data", error });
    }
  }

  static async getVehicleData(req: Request, res: Response) {
    const { cod_OS } = req.params;
    try {
      const result = await invoice.getVehicleData(Number(cod_OS));
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving vehicle data", error });
    }
  }

  static async getPaymentData(req: Request, res: Response) {
    const { cod_OS } = req.params;
    try {
      const result = await invoice.getPaymentData(Number(cod_OS));
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving payment data", error });
    }
  }

  static async getEstablishmentData(req: Request, res: Response) {
    const { cod_OS } = req.params;
    try {
      const result = await invoice.getEstablishmentData(Number(cod_OS));
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving establishment data", error });
    }
  }

  static async getServiceData(req: Request, res: Response) {
    const { cod_OS } = req.params;
    try {
      const result = await invoice.getServiceData(Number(cod_OS));
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving service data", error });
    }
  }
}