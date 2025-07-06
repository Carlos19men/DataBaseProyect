import { Router } from "express";
import { InvoiceController } from "../controllers/FacturaController";
import { invoice } from "../models/Factura";

export const createInvoiceRouter = () => {
    const router = Router();
    const controller = new InvoiceController(invoice);

    router.get("/", controller.getAll);
    router.get("/:nro_factura", controller.getById);
    router.delete("/:nro_factura", controller.delete);

    // Related to cod_OS
    router.get("/cliente/:cod_OS", controller.getClientData);
    router.get("/factura/:cod_OS", controller.getFacturaData);
    router.get("/vehiculo/:cod_OS", controller.getVehicleData);
    router.get("/pago/:cod_OS", controller.getPaymentData);
    router.get("/establecimiento/:cod_OS", controller.getEstablishmentData);
    router.get("/servicio/:cod_OS", controller.getServiceData);
    router.get("/montos/:cod_OS", controller.getMontosData);
    router.post("/crear", controller.createFromOrder);

    return router;
}