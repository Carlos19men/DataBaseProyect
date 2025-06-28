import { Request, Response } from 'express';
import { InvoicePaymentsModel } from '../models/PagosFactura';

interface InvoicePayments{
    id_invoice: number;
    id_payment: number;
}

export class InvoicePaymentsController {
    model: InvoicePaymentsModel;

    constructor(model: InvoicePaymentsModel){
        this.model = model;
    }
    
    getByInvoice = async(req: Request, res: Response<InvoicePayments[] | {error: string}>): Promise<void> => {
        const id_invoice = parseInt(req.params.id_invoice, 10);

        try{
            const result = await InvoicePaymentsModel.getByInvoice(id_invoice);

            if(!result){
                res.status(404).json({error: "No se encontraron pagos para la factura"});
                return;
            }
            
            res.status(200).json(result);
        } catch(error){
            res.status(500).json({error: "Error al obtener los pagos de la factura"});
        }
    }

    addPayment = async(req: Request, res: Response<InvoicePayments | {error: string}>): Promise<void> => {
        const id_invoice = parseInt(req.params.id_invoice, 10);
        const id_payment = parseInt(req.params.id_payment, 10);

        try{
            const result = await InvoicePaymentsModel.addPayment(id_invoice, id_payment);

            if(!result){
                res.status(404).json({error: "No se pudo agregar el pago a la factura"});
                return;
            }
            
            res.status(200).json(result);
        } catch(error){
            res.status(500).json({error: "Error al agregar el pago a la factura"});
        }
    }

    deletePayment = async(req: Request, res: Response<InvoicePayments | {error: string}>): Promise<void> => {
        const id_invoice = parseInt(req.params.id_invoice, 10);
        const id_payment = parseInt(req.params.id_payment, 10);

        try{
            const result = await InvoicePaymentsModel.deletePayment(id_invoice, id_payment);

            if(!result){
                res.status(404).json({error: "No se pudo eliminar el pago de la factura"});
                return;
            }
            
            res.status(200).json(result);
        } catch(error){
            res.status(500).json({error: "Error al eliminar el pago de la factura"});
        }
    }
}