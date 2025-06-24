import {getDbPool} from '../config/SQLserverConection'

export class ModelsModel{


    static async getAll(){
        const result = await getDbPool().query('SELECT * FROM Modelos;');
        return result['recordset'];
    }

    static async getById(id_marca: number,id_modelo: number) {
        if (id_modelo === null || id_modelo === undefined || id_modelo <= 0) {
            return { message: 'ID del modelo requerido' };
        }

        if( id_marca === null || id_marca === undefined || id_marca <= 0) {
            return { message: 'ID de la marca requerido' };
        }

        const request = getDbPool().request();
        request.input('id_modelo', id_modelo);
        request.input('id_marca', id_marca);

        const result = await request.query('SELECT * FROM Modelos WHERE id_modelo = @id_modelo AND cod_marca = @id_marca;');
        return result['recordset'];
    }

    static async getByMarca(marca:string) {
        if (marca === null || marca === undefined || marca.length === 0) {
            return { message: 'Marca requerida' };
        }
    
        const request = getDbPool().request();
        request.input('marca', marca.trim().toUpperCase());

        const result = await request.query('SELECT * FROM ObtenerModelos WHERE UPPER(Marca) = UPPER(@marca);');
        return result['recordset'];
    }

    static async createModel({id_marca,nombre, aceite_caja, aceite_motor, octanaje, tipo_refrigerante, peso, descripcion, nro_puesto}:{id_marca:number, nombre: string, aceite_caja:string, aceite_motor: string, octanaje: string, tipo_refrigerante:string,peso:number,descripcion:string,nro_puesto:number}){

        if(id_marca === null || id_marca === undefined){
            return {message:'id marca requerido'}
        }

        if(nombre === null || nombre === undefined || nombre.length === 0){
            return {message: 'nombre del modelo es requeriodo'}
        }

        if(aceite_caja === null || nombre === undefined || aceite_caja.length === 0){
            return {menssage:'aceite de caja requerido'}
        }

        if(aceite_motor === null || aceite_motor === undefined || aceite_motor.length === 0){
            return {message: 'aceite de motor requerido'}
        }

        if(octanaje === null || octanaje === undefined){
            return {message: 'octanaje requerido'}
        }

        if(tipo_refrigerante === null || tipo_refrigerante === undefined || tipo_refrigerante.length === 0){
            return {message: 'tipo refrigerante requerido'}
        }

        if(peso === null || peso === undefined){
            return {message: 'peso requeredio'}
        }

        if(descripcion === null || descripcion === undefined || descripcion.length === 0){
            return {message: 'descripcion requerida'}
        }

        if(nro_puesto === null || nro_puesto === undefined){
            return {message: 'numero de puestos es requerido'}
        }

        //creamos la query 
        const request = getDbPool().request()

        request.input('ID_marca',id_marca)
        request.input('nombre',nombre)
        request.input('aceite_caja',aceite_caja)
        request.input('aceite_motor',aceite_motor)
        request.input('octanaje',octanaje)
        request.input('tipo_refrigerante',tipo_refrigerante)
        request.input('descripcion',descripcion)
        request.input('nro_puesto',nro_puesto)

        //query
        const query = `INSERT INTO Modelos (cod_marca, nombre, aceite_caja, aceite_motor, octanaje, tipo_refrigerante, peso, descripcion, nro_puestos)
                        VALUES 
                            (@id_marca, @nombre_modelo, @aceite_caja, @aceite_motor, @octanaje, @tipo_refrigerante, @peso, @descripcion, @nro_puesto); `

        const result = await request.query(query)

        return result['rowsAffected']
    }  

    static async editModel({id_marca,id_modelo,nombre, aceite_caja, aceite_motor, octanaje, tipo_refrigerante, peso, descripcion, nro_puesto}:{id_marca:number,id_modelo:number, nombre: string, aceite_caja:string, aceite_motor: string, octanaje: string, tipo_refrigerante:string,peso:number,descripcion:string,nro_puesto:number}){

        if(id_marca === null || id_marca === undefined){
            return {message:'id marca requerido'}
        }

        if(id_marca === null || id_modelo === undefined){
            return {message:'id del modelo es requerido'}
        }

        if(nombre === undefined || nombre.length === 0){
            return {message: 'nombre del modelo es requeriodo'}
        }

        if(nombre === undefined || aceite_caja.length === 0){
            return {menssage:'aceite de caja requerido'}
        }

        if(aceite_motor === undefined || aceite_motor.length === 0){
            return {message: 'aceite de motor requerido'}
        }

        if(octanaje === undefined){
            return {message: 'octanaje requerido'}
        }

        if(tipo_refrigerante === undefined || tipo_refrigerante.length === 0){
            return {message: 'tipo refrigerante requerido'}
        }

        if( peso === undefined){
            return {message: 'peso requeredio'}
        }

        if(descripcion === undefined || descripcion.length === 0){
            return {message: 'descripcion requerida'}
        }

        if(nro_puesto === undefined){
            return {message: 'numero de puestos es requerido'}
        }

        //creamos la request
        const request = getDbPool().request()

        request.input('ID_marca',id_marca)
        request.input('ID_modelo',id_modelo)
        request.input('nombre',nombre)
        request.input('aceite_caja',aceite_caja)
        request.input('aceite_motor',aceite_motor)
        request.input('octanaje',octanaje)
        request.input('tipo_refrigerante',tipo_refrigerante)
        request.input('descripcion',descripcion)
        request.input('nro_puesto',nro_puesto)

        const query = `UPDATE Modelos SET
                            nombre = ISNULL(@nombre,nombre),
                            aceite_caja = ISNULL(@aceite_caja,aceite_caja),
                            aceite_motor = ISNULL(@aceite_motor,aceite_motor),
                            octanaje = ISNULL(@octanaje,octanaje),
                            peso = ISNULL(@peso,peso),
                            descripcion = ISNULL(@descripcion,descripcion),
                            nro_puestos = ISNULL(@nro_puestos,nro_puestos),
                            tipo_refrigerante = ISNULL(@tipo_refrigerante,tipo_refrigerante)
                        WHERE
                        cod_marca = @ID_marca and nro_modelo = @ID_modelo`

        const result = await request.query(query)

        return result['rowsAffected']
    }

    static async delete({id_marca,id_modelo}:{id_marca:number,id_modelo:number}){

        if(id_marca === null || id_marca === undefined){
            return {message:'id marca requerido'}
        }

        if(id_marca === null || id_modelo === undefined){
            return {message:'id del modelo es requerido'}
        }

        //creamos la query 
        const request = getDbPool().request()

        request.input('id_marca',id_marca)

        request.input('id_modelos',id_modelo)

        const result = await request.query('DELETE Modelos WHERE cod_marcar = @id_marca AND nro_modelo = @id_modelo;')

        return result['rowsAffected']
    }

}
