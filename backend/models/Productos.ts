import { getDbPool } from '../config/SQLserverConection'

export class ProductModel{

    static async getAll(){
        const result = await getDbPool().query('SELECT * FROM ObtenerProductos ORDER BY nombreProducto; ')
        return result['recordset']
    }

    static async getById(id:number){
        if (id === undefined || id === null || id <= 0) {
            return { error: "Se necesita el ID del Producto" };
        }

        const request = getDbPool().request();
        request.input('id', id);

        const result = await request.query('SELECT * FROM ObtenerProducto(@id);');
        console.log(result['recordset']);
        return result['recordset'];
    }

    static async create({nombre,tipo,precio,descripcion,minimo,maximo,tratamiento,nivelCon,inf_manejo,id_familia}:
        {nombre: string, tipo: string, precio: number, descripcion: string | null,
        minimo: number | null, maximo: number | null, tratamiento: string | null, nivelCon: string | null, inf_manejo: string | null, id_familia: number | null}){

            if (nombre === undefined || nombre.length === 0) {
                return { error: "El nombre del producto es inválido" };
            }
            if (tipo === undefined || tipo.length === 0) {
                return { error: "El tipo del producto es inválido" };
            }
            if (precio === undefined || precio <= 0) {
                return { error: "El precio del producto es inválido" };
            }
            if (descripcion !== null && descripcion !== undefined && descripcion.length === 0) {
                return { error: "La descripción del producto es inválida" };
            }
            if (minimo !== null && minimo !== undefined && minimo < 0) {
                return { error: "El mínimo del producto es inválido" };
            }
            if (maximo !== null && maximo !== undefined && maximo < 0) {
                return { error: "El máximo del producto es inválido" };
            }
            if (tratamiento !== null && tratamiento !== undefined && tratamiento.length === 0) {
                return { error: "El tratamiento del producto es inválido" };
            }
            if (nivelCon !== null && nivelCon !== undefined && nivelCon.length === 0) {
                return { error: "El nivel de control del producto es inválido" };
            }
            if (inf_manejo !== null && inf_manejo !== undefined && inf_manejo.length === 0) {
                return { error: "La información de manejo del producto es inválida" };
            }
            if (id_familia !== null && id_familia !== undefined && id_familia <= 0) {
                return { error: "El ID de la familia del producto es inválido" };
            }

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

        return result['rowsAffected']
    }
    
    static async edit({id_producto,nombre,tipo,precio,descripcion,minimo,maximo,tratamiento,nivelCon,inf_manejo,id_familia}:
        {id_producto: number, nombre: string, tipo: string, precio: number, descripcion: string | null,
        minimo: number | null, maximo: number | null, tratamiento: string | null, nivelCon: string | null, inf_manejo: string | null, id_familia: number | null}){

        if (id_producto === null || id_producto === undefined || id_producto <= 0) {
            return { error: "El ID del producto es inválido" };
        }
        if (nombre === undefined || nombre.length === 0) {
            return { error: "El nombre del producto es inválido" };
        }
        if (tipo === undefined || tipo.length === 0) {
            return { error: "El tipo del producto es inválido" };
        }
        if (precio === undefined || precio <= 0) {
            return { error: "El precio del producto es inválido" };
        }
        if (descripcion !== null && descripcion !== undefined && descripcion.length === 0) {
            return { error: "La descripción del producto es inválida" };
        }
        if (minimo !== null && minimo !== undefined && minimo < 0) {
            return { error: "El mínimo del producto es inválido" };
        }
        if (maximo !== null && maximo !== undefined && maximo < 0) {
            return { error: "El máximo del producto es inválido" };
        }
        if (tratamiento !== null && tratamiento !== undefined && tratamiento.length === 0) {
            return { error: "El tratamiento del producto es inválido" };
        }
        if (nivelCon !== null && nivelCon !== undefined && nivelCon.length === 0) {
            return { error: "El nivel de control del producto es inválido" };
        }
        if (inf_manejo !== null && inf_manejo !== undefined && inf_manejo.length === 0) {
            return { error: "La información de manejo del producto es inválida" };
        }
        if (id_familia !== null && id_familia !== undefined && id_familia <= 0) {
            return { error: "El ID de la familia del producto es inválido" };
        }
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

        console.log(result['rowsAffected'])
        return result['rowsAffected']
    }

    static async deleteProduct(id:number){
        if(id === null || id === undefined){
            return {message: 'el id es requerido'}
        }

        const request = getDbPool().request()

        request.input('id',id)

        const result = await request.query('EXEC eliminarProducto @id;')

        return result['rowsAffected']
    }

    
}