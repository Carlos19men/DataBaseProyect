import { Router } from "express";
import { InvoiceController } from "../controllers/FacturaController";

export const createInvoiceRouter = () => {
    const router = Router();

    router.get("/", InvoiceController.getAll);
    router.get("/:nro_factura", InvoiceController.getById);
    router.delete("/:nro_factura", InvoiceController.delete);

    // Related to cod_OS
    router.get("/cliente/:cod_OS", InvoiceController.getClientData);
    router.get("/factura/:cod_OS", InvoiceController.getFacturaData);
    router.get("/vehiculo/:cod_OS", InvoiceController.getVehicleData);
    router.get("/pago/:cod_OS", InvoiceController.getPaymentData);
    router.get("/establecimiento/:cod_OS", InvoiceController.getEstablishmentData);
    router.get("/servicio/:cod_OS", InvoiceController.getServiceData);
    router.get("/montos/:cod_OS", InvoiceController.getMontosData);

    return router;
}