import { getDbPool } from '../config/SQLserverConection';
import * as sql from 'mssql';

//creamos las interfaces 
interface ActividadOS{
    nro_servicio: number;
    nro_correlativo: number;
    id_producto: number;
    precio_producto: number;
    precio_actividad:number;
    cantidad_producto:number;
    ci_empleAsig: string;
}

interface OrdenServicioCompleta{
    codigo_vehiculo: number;
    fecha_entrada: Date;
    hora_entrada: string;
    hora_estimada_salida: string;
    persona_autoriza: string;
    actividades: ActividadOS[];
    id_rif: string
}

export class OrdenesServicioModel {

    static async getAll() {
        const result = await getDbPool().query('');
        return result['recordset'];
    }

    static async getByRif(id_rif: string){
        const request = getDbPool().request();
        request.input('id_rif', id_rif);

        const result = await request.query('');
        return result['recordset'];
    } 

    static async getById(id: number){
        const request = getDbPool().request();
        request.input('id', id);
        const result = await request.query('');
        return result['recordset'][0];
    }

    static async create(order:OrdenServicioCompleta){
        const pool = getDbPool();
        const transaction = new sql.Transaction(pool)
        
        try{
            await transaction.begin();

            //crear table de parámetros 
            const table = new sql.Table('ActividadType')
            table.columns.add('nro_servicio', sql.Int, {nullable: false})
            table.columns.add('nro_correlativo', sql.Int, {nullable: false})
            table.columns.add('id_producto', sql.Int, {nullable: false})
            table.columns.add('precio_producto', sql.Float, {nullable: false})
            table.columns.add('precio_actividad', sql.Float, {nullable: false})
            table.columns.add('cantidad_producto', sql.Int, {nullable: false})

            //agreaga datos a la tabla
            order.actividades.map(actividad => ({
                nro_servicio: actividad.nro_servicio,
                nro_correlativo: actividad.nro_correlativo,
                id_producto: actividad.id_producto,
                precio_producto: actividad.precio_producto,
                precio_actividad: actividad.precio_actividad,
                cantidad_producto: actividad.cantidad_producto,
                ci_empleAsig: actividad.ci_empleAsig
            }))

            // creamos la request con la transacción para la orden de servicio y actividades
            const request = new sql.Request(transaction);
            request.input('codigo_vehiculo', sql.Int, order.codigo_vehiculo);
            request.input('fecha_entrada', sql.Date, order.fecha_entrada);
            request.input('hora_entrada', sql.VarChar(5), order.hora_entrada);
            request.input('hora_estimada_salida', sql.VarChar(5), order.hora_estimada_salida);
            request.input('persona_autoriza', sql.VarChar(50), order.persona_autoriza);
            request.input('actividades', table);
            request.input('id_rif',sql.VarChar(20), order.id_rif);

            await request.execute('');

            await transaction.commit();
            return true;
        }catch(error){
            await transaction.rollback();
            throw error;
        }
    }

    static async deleteByID(id: number) {
        const request = getDbPool().request();
        request.input('id', id);

        const result = await request.query('');
        return {rowsAffected: result['recordset'][0]}
    }
} 