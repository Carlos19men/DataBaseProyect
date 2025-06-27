import { Router } from 'express';
import { InvoicePaymentsController } from '../controllers/PagosFacturaController';
import { InvoicePaymentsModel } from '../models/PagosFactura';

export const createInvoicePaymentsRouter = () => {
    const invoicePaymentsRouter = Router();
    const invoicePaymentsController = new InvoicePaymentsController(InvoicePaymentsModel);

    invoicePaymentsRouter.get('/:id_invoice', invoicePaymentsController.getByInvoice);
    invoicePaymentsRouter.post('/:id_invoice/:id_payment', invoicePaymentsController.addPayment);
    invoicePaymentsRouter.delete('/:id_invoice/:id_payment', invoicePaymentsController.deletePayment);

    return invoicePaymentsRouter;
}