import {getDbPool} from '../config/SQLserverConection'
import * as sql from 'mssql';

export class ModelsModel{


    static async getAll(){
        const result = await getDbPool().query('SELECT * FROM ObtenerModelos;');
        return result['recordset'];
    }

    static async getById(id_marca: number,id_modelo: number) {

        const request = getDbPool().request();
        request.input('id_modelo', id_modelo);
        request.input('id_marca', id_marca);

        const result = await request.query('SELECT * FROM ObtenerModelos WHERE cod_modelo = @id_modelo AND cod_marca = @id_marca;');
        return result['recordset'][0];
    }

    static async getByMarca(id_marca:number) {
        const request = getDbPool().request();
        request.input('id_marca',id_marca);

        const result = await request.query('SELECT * FROM ObtenerModelos WHERE cod_marca = @id_marca;');
        return result['recordset'];
    }

    static async createModel(id_marca:number, nombre: string, aceite_caja:string, aceite_motor: string, octanaje: string, tipo_refrigerante:string,peso:number,descripcion:string,nro_puesto:number){
        //creamos la query 
        const request = getDbPool().request()

        //console.log({id_marca, nombre, aceite_caja, aceite_motor, octanaje, tipo_refrigerante, peso, descripcion, nro_puesto});

        request.input('ID_marca',id_marca)
        request.input('nombre', sql.NVarChar(100), nombre)
        request.input('aceite_caja',aceite_caja)
        request.input('aceite_motor',aceite_motor)
        request.input('octanaje',octanaje)
        request.input('tipo_refrigerante',tipo_refrigerante)
        request.input('descripcion',descripcion)
        request.input('nro_puesto',nro_puesto)
        request.input('peso',peso)

        //query
        const query = `INSERT INTO Modelos (cod_marca, nombre, aceite_caja, aceite_motor, octanaje, tipo_refrigerante, peso, descripcion, nro_puestos)
                        VALUES 
                        (@ID_marca, @nombre, @aceite_caja, @aceite_motor, @octanaje, @tipo_refrigerante, @peso, @descripcion, @nro_puesto); `

        const result = await request.query(query);

        return {rowsAffected: result['rowsAffected'][0]};
    }  

    static async editModel(
        id_marca: number,
        id_modelo: number,
        nombre?: string | null,
        aceite_caja?: string | null,
        aceite_motor?: string | null,
        octanaje?: string | null,
        tipo_refrigerante?: string | null,
        peso?: number | null,
        descripcion?: string | null,
        nro_puesto?: number | null
        ) {
        
        const request = getDbPool().request();
        request.input('ID_marca', id_marca);
        request.input('ID_modelo', id_modelo);
        request.input('nombre', sql.NVarChar(100), nombre);
        request.input('aceite_caja', sql.NVarChar(100), aceite_caja);
        request.input('aceite_motor', sql.NVarChar(100), aceite_motor);
        request.input('octanaje', sql.NVarChar(50), octanaje);
        request.input('tipo_refrigerante', sql.NVarChar(100), tipo_refrigerante);
        request.input('peso', sql.Int, peso);
        request.input('descripcion', sql.NVarChar(255), descripcion);
        request.input('nro_puestos', sql.Int, nro_puesto);

        console.log({
            id_marca, id_modelo, nombre, aceite_caja, aceite_motor, octanaje, tipo_refrigerante, peso, descripcion, nro_puesto
        });

        const query = `UPDATE Modelos SET
            nombre = ISNULL(@nombre, nombre),
            aceite_caja = ISNULL(@aceite_caja, aceite_caja),
            aceite_motor = ISNULL(@aceite_motor, aceite_motor),
            octanaje = ISNULL(@octanaje, octanaje),
            tipo_refrigerante = ISNULL(@tipo_refrigerante, tipo_refrigerante),
            peso = ISNULL(@peso, peso),
            descripcion = ISNULL(@descripcion, descripcion),
            nro_puestos = ISNULL(@nro_puestos, nro_puestos)
            WHERE cod_marca = @ID_marca AND nro_modelo = @ID_modelo`;

        const result = await request.query(query);
        return { rowsAffected: result['rowsAffected'][0] };
    }

    static async delete(id_marca:number,id_modelo:number){
        //creamos la query 
        const request = getDbPool().request()

        request.input('id_marca',id_marca)

        request.input('id_modelo',id_modelo)

        const result = await request.query('DELETE Modelos WHERE cod_marca = @id_marca AND nro_modelo = @id_modelo;')

        return {rowsAffected: result['rowsAffected'][0]};
    }

}
