//Depende de servicio 
import { connectToDatabase } from "../config/SQLserverConection";
import { getDbPool } from "../config/SQLserverConection";


//con este pool podran hacer las consultas a la base de datos
//creamos la clase para el manejo de todos los modelos 



export class Actividades {

    //obtener todas las actividades ofrecidas
    static async getAll() {
        const result = await getDbPool().query('SELECT * FROM Actividades');
        return result
    }

    //obtener toda las actividades ofrecidas por establecimiento
    static async getByEstablecimiento(RIF: string) {

        if (RIF === undefined || RIF === null || RIF.length === 0) {
            return { error: "RIF necesario" }
        }

        const request = getDbPool().request()

        //agg the ci
        request.input('RIF', RIF);


        const result = await request.query('SELECT * FROM getByEstablecimiento(@RIF);');

        console.log(result['recordset'])
        return result

    }

    //obtener toda las actividades ofrecidas por servicio
    static async getByServicio(nro_s: number) {

        if (nro_s === undefined || nro_s === null) {
            return { error: "Servicio necesario" }
        }

        const request = getDbPool().request()

        //agg the ci
        request.input('nro_s', nro_s);


        const result = await request.query('SELECT * FROM getByServicio(@nro_s);');

        console.log(result['recordset'])
        return result

    }

    //obtener una actividad especíifica
    static async getByActividad(nro_s: number, nro_corr: number) {

        if (nro_s === undefined || nro_s === null) {
            return { error: "Servicio necesario" }
        }
        if (nro_corr === undefined || nro_corr === null) {
            return { error: "Actividad necesaria" }
        }

        const request = getDbPool().request()


        request.input('nro_s', nro_s);
        request.input('nro_corr', nro_corr);


        const result = await request.query('SELECT * FROM getByServicio(@nro_s,@nro_corr);');

        console.log(result['recordset'])
        return result

    }

    static async createActividad({ nro_s, nro_a, nomb, desc, monto }: { nro_s: number, nro_a: number, nomb: string, desc: String, monto: number }) {

        if (nro_s === undefined || nro_s === null) {
            return { error: "Servicio necesario" }
        }
        if (nro_a === undefined || nro_a === null) {
            return { error: "Actividad necesaria" }
        }
        if (nomb === undefined || nomb === null || nomb.length === 0) {
            return { error: "Nombre is required" }
        }
        if (desc === undefined || desc === null || desc.length === 0) {
            return { error: "Descripcion is required" }
        }
        if (monto === undefined || monto === null) {
            return { error: "Monto is required" }
        }

        const request = getDbPool().request()


        request.input('nro_s', nro_s);
        request.input('nro_corr', nro_a);
        request.input('nomb', nomb);
        request.input('desc', desc);
        request.input('monto', monto);

        const result = await request.query('EXEC createActividad @nro_s,@nro_a,@nomb,@desc,@monto;');

        console.log(result['recordset'])
        return result

    }

    static async updateActividad({ nro_s, nro_a, nomb, desc, monto }: { nro_s?: number, nro_a?: number, nomb?: string, desc?: String, monto?: number }) {

        if (nro_s !== undefined) {
            if (nro_s === null) {
                return { error: "Servicio necesario" }
            }
        }
        if (nro_a !== undefined) {
            if ( nro_a === null) {
                return { error: "Actividad necesaria" }
            }
        }
        if (nomb !== undefined) {
            if ( nomb === null || nomb.length === 0) {
                return { error: "Nombre is required" }
            }
        }
        if (desc !== undefined) {
            if (desc === null || desc.length === 0) {
                return { error: "Descripcion is required" }
            }
        }
        if (monto!==undefined){
        if ( monto === null) {
            return { error: "Monto is required" }
            }
        }
    

        const request = getDbPool().request();
        
        request.input('nro_s', nro_s); 
        request.input('nro_a', nro_a); 
        request.input('nomb', nomb);
        request.input('desc', desc);
        request.input('monto', monto);

        const result = await request.query('EXEC updateActividad @nro_s,@nro_a,@nomb,@desc,@monto;');

        console.log(result['recordset'])
        return result

    }

   static async deleteActividad(nro_s: number, nro_corr: number) {

        if (nro_s === undefined || nro_s === null) {
            return { error: "Servicio necesario" }
        }
        if (nro_corr === undefined || nro_corr === null) {
            return { error: "Actividad necesaria" }
        }

        const request = getDbPool().request()


        request.input('nro_s', nro_s);
        request.input('nro_corr', nro_corr);


        const result = await request.query('EXEC deleteActividad @nro_s,@nro_corr;');

        console.log(result['recordset'])
        return result

    }




}


async function main() {

    await connectToDatabase();
    console.log("aaa0");
    console.log(await Actividades.getAll());
}

main().catch((err) => {console.error("error de ejecucion",err)})