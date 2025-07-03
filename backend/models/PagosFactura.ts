import { getDbPool } from "../config/SQLserverConection";

export class InvoicePaymentsModel {
    
    static async getByInvoice(id_invoice: number){

        const request = getDbPool().request();
        request.input('id_invoice', id_invoice);

        const result = await request.query('SELECT * FROM PagosFactura WHERE nro_factura = @id_invoice');
        return result['recordset'];
    }

    static async getOnePayment(id_invoice: number, id_payment: number){

        const request = getDbPool().request();
        request.input('id_invoice', id_invoice);
        request.input('id_payment', id_payment);

        const result = await request.query('SELECT * FROM PagosFactura WHERE nro_factura = @id_invoice AND id_pago = @id_payment');
        return result['recordset'][0];
    }

    static async addPayment(id_invoice: number, id_payment: number){

        const request = getDbPool().request();
        request.input('id_invoice', id_invoice);
        request.input('id_payment', id_payment);

        const result = await request.query('INSERT INTO PagosFactura (nro_factura, id_pago) VALUES (@id_invoice, @id_payment)');
        return {rowsAffected: result['rowsAffected'][0]};
    }

    static async updatePayment(id_invoice: number, id_payment: number){
        const request = getDbPool().request();
        request.input('id_invoice', id_invoice);
        request.input('id_payment', id_payment);

        const query = `Update PagosFactura set nro_factura = isNULL(@id_invoice, nro_factura), 
        id_pago = isNULL(@id_payment, id_pago) where `;

        const result = await request.query(query);
        return {rowsAffected: result['rowsAffected'][0]};
    }
    
    static async deletePayment(id_invoice: number, id_payment: number){
        const request = getDbPool().request();
        request.input('id_invoice', id_invoice);
        request.input('id_payment', id_payment);

        const result = await request.query('DELETE FROM PagosFactura WHERE nro_factura = @id_invoice AND id_pago = @id_payment');
        return {rowsAffected: result['rowsAffected'][0]};
    }
}