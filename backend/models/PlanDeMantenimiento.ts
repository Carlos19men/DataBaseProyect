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
        
        if (cod_marca === undefined || cod_marca === null) {
            return { error: "Marca necesaria" }
        }

        const request = getDbPool().request()

  
        request.input('cod_marca', cod_marca);


        const result = await request.query('SELECT * FROM getByMarca(@cod_marca);');

        
        return result
    }
    
    static async getByModelo(
        cod_marca : number,
        nro_modelo : number
    ){
        if (cod_marca === undefined || cod_marca === null ) {
            return { error: "Marca necesaria" }
        }
        if (nro_modelo === undefined || nro_modelo === null ) {
            return { error: "Modelo necesario" }
        }

        const request = getDbPool().request()

        request.input('cod_marca',cod_marca);
        request.input('nro_modelo', nro_modelo);

        const result = await request.query('SELECT * FROM getByModelo(@cod_marca,@nro_modelo);');

        
        return result

    }


    static async getByPlan(
        cod_marca:number,
        nro_modelo:number,
        kilometraje:number
    ){
        
        if (cod_marca === undefined || cod_marca === null) {
            return { error: "Marca necesaria" }
        }

        if (nro_modelo === undefined || nro_modelo === null) {
            return { error: "Modelo necesario" }
        }
        if (kilometraje === undefined || kilometraje === null) {
            return { error: "Kilometraje necesario" }
        }

        const request = getDbPool().request()


        request.input('cod_marca',cod_marca);
        request.input('nro_modelo', nro_modelo);
        request.input('kilometraje',kilometraje);
        const result = await request.query('SELECT * FROM getPlan(@cod_marca,@nro_modelo);');

        
        return result
    }
    

    static async createPlan(
        cod_marca: number ,
        nro_modelo :number,
        kilolmetraje :number,
        nombre : String,
        descripcion : String
    ){

        if (cod_marca === undefined || cod_marca === null) {
            return { error: "Marca necesaria" }
        }
        if (nro_modelo === undefined || nro_modelo === null) {
            return { error: "Modelo necesario" }
        } 
        if (kilolmetraje === undefined || kilolmetraje === null) {
            return { error: "Kilometraje necesario" }
        }

        if (nombre === undefined || nombre === null || nombre.length === 0) {
            return { error: "Nombre mecesario" }
        }
        if (descripcion === undefined || descripcion === null || descripcion.length === 0) {
            return { error: "Descripcion necesaria" }
        }

        const request = getDbPool().request()


        request.input('cod_marca', cod_marca);
        request.input('nro_modelo', nro_modelo);
        request.input('kilometraje', kilolmetraje);
        request.input('nombre', nombre);
        request.input('descripcion', descripcion);
        

        const result = await request.query('EXEC createPlan @cod_marca,@nro_modelo,@kilometraje,@nombre,@descripcion;');

        
        return result

    }

    static async updatePlan(
        cod_marca: number ,
        nro_modelo :number,
        kilolmetraje :number,
        nombre? : String,
        descripcion? : String
    ){
        if (cod_marca === undefined || cod_marca === null) {
            return { error: "Marca necesaria" }
        }
        if (nro_modelo === undefined || nro_modelo === null) {
            return { error: "Modelo necesario" }
        } 
        if (kilolmetraje === undefined || kilolmetraje === null) {
            return { error: "Kilometraje necesario" }
        }

        if (nombre !== undefined) {
            if ( nombre === null || nombre.length === 0) {
                return { error: "Nombre necesario" }
            }
        }
        if (descripcion !== undefined) {
            if (descripcion === null || descripcion.length === 0) {
                return { error: "Descripcion necesaria" }
            }
        }
    

        const request = getDbPool().request();
        
        request.input('cod_marca', cod_marca);
        request.input('nro_modelo', nro_modelo);
        request.input('kilometraje', kilolmetraje);
        request.input('nombre', nombre);
        request.input('descripcion', descripcion);
        

        const result = await request.query('EXEC updatePlan @cod_marca,@nro_modelo,@kilometraje,@nombre,@descripcion;');

        return result

    }

    static async deletePlan(
        cod_marca: number ,
        nro_modelo :number,
        kilolmetraje :number
    ){
        
        if (cod_marca === undefined || cod_marca === null) {
            return { error: "Marca necesaria" }
        }
        if (nro_modelo === undefined || nro_modelo === null) {
            return { error: "Modelo necesario" }
        } 
        if (kilolmetraje === undefined || kilolmetraje === null) {
            return { error: "Kilometraje necesario" }
        }


        const request = getDbPool().request()


        request.input('cod_marca', cod_marca);
        request.input('nro_modelo', nro_modelo);
        request.input('kilometraje', kilolmetraje);


        const result = await request.query('EXEC deletePlan @cod_marca,@nro_modelo,@kilometraje;');

        return result
    }

}