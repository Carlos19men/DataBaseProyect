import { getDbPool } from '../config/SQLserverConection'

export class ProductModel{

    static async getAll(){
        const result = await getDbPool().query('SELECT * FROM ObtenerProductos ORDER BY nombreProducto; ')
        return result['recordset']
    }

    static async getById(id:number){
        const request = getDbPool().request();
        request.input('id', id);

        const result = await request.query('SELECT * FROM ObtenerProducto(@id);');
        return result['recordset'];
    }

    static async create(
        nombre: string, 
        tipo: string, 
        precio: number, 
        descripcion: string | null,
        minimo: number | null, 
        maximo: number | null, 
        tratamiento: string | null, 
        nivelCon: string | null, 
        inf_manejo: string | null, 
        id_familia: number | null
        ){

        const request = getDbPool().request()

        request.input('nombre', nombre);
        request.input('tipo', tipo);
        request.input('precio', precio);
        request.input('descripcion', descripcion);
        request.input('minimo', minimo);
        request.input('maximo', maximo);
        request.input('tratamiento', tratamiento);
        request.input('nivelCon', nivelCon);
        request.input('inf_manejo', inf_manejo);
        request.input('id_familia', id_familia);

        const result = await request.query('EXEC nuevoProducto @nombre @tipo @precio @descripcion @minimo @maximo @tratamiento @nivelCon @inf_manejo @id_familia;')

        return {rowsAffected: result['rowsAffected'][0]}
    }
    
    static async edit(
        id_producto: number, 
        nombre: string, 
        tipo: string, 
        precio: number, 
        descripcion: string | null,
        minimo: number | null, 
        maximo: number | null, 
        tratamiento: string | null, 
        nivelCon: string | null, 
        inf_manejo: string | null, 
        id_familia: number | null){

        const request = getDbPool().request();
        request.input('id_producto', id_producto);
        request.input('nombre', nombre);
        request.input('tipo', tipo);
        request.input('precio', precio);
        request.input('descripcion', descripcion);
        request.input('minimo', minimo);
        request.input('maximo', maximo);
        request.input('tratamiento', tratamiento);
        request.input('nivelCon', nivelCon);
        request.input('inf_manejo', inf_manejo);
        request.input('id_familia', id_familia);
        const result = await request.query('EXEC editarProducto @id_producto @nombre @tipo @precio @descripcion @minimo @maximo @tratamiento @nivelCon @inf_manejo @id_familia')

        return {rowsAffected: result['rowsAffected'][0]}
    }

    static async deleteProduct(id:number){

        const request = getDbPool().request()

        request.input('id',id)

        const result = await request.query('EXEC eliminarProducto @id;')

        return {rowsAffected: result['rowsAffected'][0]}
    }

    
}