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
    persona_autoriza?: string; // Opcional
    actividades: ActividadOS[];
    id_rif: string
}

interface OrdenServicioUpdate{
    codigo_vehiculo?: number;
    fecha_entrada?: Date;
    hora_entrada?: string;
    hora_estimada_salida?: string;
    hora_real_salida?: string;
    fecha_salida?: Date;
    justificacion?: string;
    persona_autoriza?: string;
    id_rif?: string;
}

export class OrdenesServicioModel {

    static async getAll() {
        const result = await getDbPool().query('SELECT * FROM OrdenesServicio;');
        return result['recordset'];
    }

    static async getByRif(id_rif: string){
        const request = getDbPool().request();
        request.input('id_rif', id_rif);

        const result = await request.query('SELECT * FROM OrdenesServicio WHERE RIF_establecimiento = @id_rif;');
        return result['recordset'];
    } 

    static async getById(id: number){
        const request = getDbPool().request();
        request.input('id', id);
        const result = await request.query('SELECT * FROM OrdenesServicio WHERE cod_OS = @id;');
        return result['recordset'][0];
    }

    static async create(order: OrdenServicioCompleta){
        const pool = getDbPool();
        const transaction = new sql.Transaction(pool)
        
        try{
            await transaction.begin();

            // Crear tabla con las 7 columnas exactas del tipo ActividadOSType
            const table = new sql.Table('ActividadOSType')
            table.columns.add('nro_servicio', sql.Int, {nullable: false})
            table.columns.add('nro_correlativo', sql.Int, {nullable: false})
            table.columns.add('CI_empAsig', sql.VarChar(20), {nullable: false})
            table.columns.add('id_producto', sql.Int, {nullable: false})
            table.columns.add('precio_producto', sql.Decimal(10,2), {nullable: false})
            table.columns.add('precio_actividad', sql.Decimal(10,2), {nullable: false})
            table.columns.add('cantidad', sql.Int, {nullable: false})

            // Agregar datos en el orden correcto
            order.actividades.forEach(actividad => {
                table.rows.add(
                    actividad.nro_servicio,        // 1
                    actividad.nro_correlativo,     // 2
                    actividad.ci_empleAsig,        // 3
                    actividad.id_producto,         // 4
                    actividad.precio_producto,     // 5
                    actividad.precio_actividad,    // 6
                    actividad.cantidad_producto    // 7
                );
            });

            // Crear request con parámetros correctos
            const request = new sql.Request(transaction);
            
            // Validar que la fecha sea un objeto Date válido
            if (!(order.fecha_entrada instanceof Date) || isNaN(order.fecha_entrada.getTime())) {
                throw new Error('El campo fecha_entrada debe ser un objeto Date válido.');
            }
            
            console.log("🔧 ENVIANDO PARÁMETROS AL PROCEDIMIENTO ALMACENADO:");
            console.log("RIF_establecimiento:", order.id_rif);
            console.log("codigo_vehiculo:", order.codigo_vehiculo);
            console.log("fecha_entrada:", order.fecha_entrada);
            console.log("fecha_entrada tipo:", typeof order.fecha_entrada);
            console.log("fecha_entrada.toISOString():", order.fecha_entrada.toISOString());
            console.log("hora_entrada:", order.hora_entrada);
            console.log("hora_estimada_salida:", order.hora_estimada_salida);
            console.log("persona_autorizada:", order.persona_autoriza);
            console.log("actividades:", order.actividades);
            
            console.log("🔍 VALORES EXACTOS QUE SE ENVÍAN AL PROCEDIMIENTO:");
            console.log("RIF_establecimiento:", order.id_rif, "tipo:", typeof order.id_rif);
            console.log("codigo_vehiculo:", order.codigo_vehiculo, "tipo:", typeof order.codigo_vehiculo);
            console.log("fecha_entrada:", order.fecha_entrada, "tipo:", typeof order.fecha_entrada, "es Date:", order.fecha_entrada instanceof Date);
            console.log("hora_entrada:", order.hora_entrada, "tipo:", typeof order.hora_entrada);
            console.log("hora_estimada_salida:", order.hora_estimada_salida, "tipo:", typeof order.hora_estimada_salida);
            console.log("persona_autorizada:", order.persona_autoriza, "tipo:", typeof order.persona_autoriza);
            console.log("actividades count:", order.actividades.length);
            
            request.input('RIF_establecimiento', sql.VarChar(20), order.id_rif);
            request.input('codigo_vehiculo', sql.Int, order.codigo_vehiculo);
            request.input('fecha_entrada', sql.Date, order.fecha_entrada);
            request.input('hora_entrada', sql.Time, new Date(`2000-01-01T${order.hora_entrada}:00`));
            request.input('hora_estimada_salida', sql.Time, new Date(`2000-01-01T${order.hora_estimada_salida}:00`));
            request.input('persona_autorizada', sql.VarChar(50), order.persona_autoriza || null);
            request.input('actividades', table);
            request.output('cod_OS', sql.Int);

            await request.execute('CrearOrdenServicioCompleta');

            await transaction.commit();
            return true;
        }catch(error){
            await transaction.rollback();
            throw error;
        }
    }

    static async update(id: number, orderData: OrdenServicioUpdate) {
        const request = getDbPool().request();
        
        // Configurar parámetros del procedimiento almacenado
        request.input('cod_OS', sql.Int, id);
        
        if (orderData.codigo_vehiculo !== undefined) {
            request.input('codigo_vehiculo', sql.Int, orderData.codigo_vehiculo);
        } else {
            request.input('codigo_vehiculo', sql.Int, null);
        }
        
        if (orderData.fecha_entrada !== undefined) {
            request.input('fecha_entrada', sql.Date, orderData.fecha_entrada);
        } else {
            request.input('fecha_entrada', sql.Date, null);
        }
        
        if (orderData.hora_entrada !== undefined) {
            request.input('hora_entrada', sql.Time, new Date(`2000-01-01T${orderData.hora_entrada}:00`));
        } else {
            request.input('hora_entrada', sql.Time, null);
        }
        
        if (orderData.hora_estimada_salida !== undefined) {
            request.input('hora_estimada_salida', sql.Time, new Date(`2000-01-01T${orderData.hora_estimada_salida}:00`));
        } else {
            request.input('hora_estimada_salida', sql.Time, null);
        }
        
        if (orderData.persona_autoriza !== undefined) {
            request.input('persona_autorizada', sql.VarChar(50), orderData.persona_autoriza);
        } else {
            request.input('persona_autorizada', sql.VarChar(50), null);
        }
        
        if (orderData.id_rif !== undefined) {
            request.input('RIF_establecimiento', sql.VarChar(20), orderData.id_rif);
        } else {
            request.input('RIF_establecimiento', sql.VarChar(20), null);
        }
        
        const result = await request.execute('ActualizarOrdenServicio');
        return {rowsAffected: Array.isArray(result['rowsAffected']) ? result['rowsAffected'][0] : result['rowsAffected']};
    }

    static async deleteByID(id: number) {
        const request = getDbPool().request();
        request.input('id', id);

        const result = await request.query('DELETE FROM OrdenesServicio WHERE cod_OS = @id;');
        return {rowsAffected: Array.isArray(result['rowsAffected']) ? result['rowsAffected'][0] : result['rowsAffected']}
    }
} 