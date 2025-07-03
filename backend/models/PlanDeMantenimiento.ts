// depende de modelo y marca 
import { getDbPool } from "../config/SQLserverConection";
//con este pool podran hacer las consultas a la base de datos
//creamos la clase para el manejo de todos los modelos 
export class PlanesMantenimiento{

    //obtener toda las actividades para cada plan de servicio especificamos por la marca 
    static async getAll(){
	      const result =await  getDbPool().query('SELECT * FROM PlanesMantenimiento');
        return result
    }
    
    static async getByMarca(
        cod_marca:number
    ){
        const request = getDbPool().request()

        request.input('cod_marca', cod_marca);

        const result = await request.query('SELECT * FROM getByMarca(@cod_marca);');

        return result['recordset']
    }
    
    static async getByModelo(
        cod_marca : number,
        nro_modelo : number
    ){
        const request = getDbPool().request()

        request.input('cod_marca',cod_marca);
        request.input('nro_modelo', nro_modelo);

        const result = await request.query('SELECT * FROM getByModelo(@cod_marca,@nro_modelo);');

        return result['recordset']

    }


    static async getByPlan(
        cod_marca:number,
        nro_modelo:number,
        kilolmetraje:number
    ){
        const request = getDbPool().request()


        request.input('cod_marca',cod_marca);
        request.input('nro_modelo', nro_modelo);
        request.input('kilometraje', kilolmetraje);
        const result = await request.query('SELECT * FROM getPlan(@cod_marca,@nro_modelo,@kilometraje);');

        return result['recordset']
    }
    

    static async createPlan(
        cod_marca: number ,
        nro_modelo :number,
        kilolmetraje :number,
        nombre : String,
        descripcion : String
    ){
        const request = getDbPool().request()

        request.input('cod_marca', cod_marca);
        request.input('nro_modelo', nro_modelo);
        request.input('kilometraje', kilolmetraje);
        request.input('nombre', nombre);
        request.input('descripcion', descripcion);
        

        const result = await request.query('EXEC createPlan @cod_marca,@nro_modelo,@kilometraje,@nombre,@descripcion;');

        return {rowsAffected: result['rowsAffected'][0]}
    }

    static async updatePlan(
        cod_marca: number ,
        nro_modelo :number,
        kilolmetraje :number,
        nombre? : String,
        descripcion? : String
    ){
        const request = getDbPool().request();
        
        request.input('cod_marca', cod_marca);
        request.input('nro_modelo', nro_modelo);
        request.input('kilometraje', kilolmetraje);
        request.input('nombre', nombre);
        request.input('descripcion', descripcion);
        

        const result = await request.query('EXEC updatePlan @cod_marca,@nro_modelo,@kilometraje,@nombre,@descripcion;');

        return {rowsAffected: result['rowsAffected'][0]}

    }

    static async deletePlan(
        cod_marca: number ,
        nro_modelo :number,
        kilolmetraje :number
    ){
        const request = getDbPool().request()

        request.input('cod_marca', cod_marca);
        request.input('nro_modelo', nro_modelo);
        request.input('kilometraje', kilolmetraje);

        const result = await request.query('Delete FROM PlanesMantenimiento WHERE @cod_marca = cod_marca AND @nro_modelo = nro_modelo and @kilolmetraje = kilometraje;');

        return {rowsAffected: result['rowsAffected'][0]}
    }
}