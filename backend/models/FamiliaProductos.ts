import { getDbPool } from "../config/SQLserverConection";

export class FamilyProductsModel {
    static async getAll(){
        const pool = await getDbPool();

        const result = await pool.query("Select * from FamiliaProductos");

        return result['recordset'];
    }

    static async getbyFamily(id_familia: number){
        const request = await getDbPool().request();
        
        if(id_familia === null || id_familia <= 0){
            return({error: "Se requiere el id de la familia"});
            return;
        }
        
        request.input("id_familia", id_familia);
        const result = await request.query("Select * from FamiliaProductos where id_familia = @id_familia");

        return result['recordset'];
    }

    static async addFamily(nombre: string){
        const request = await getDbPool().request();
      
        request.input("name", nombre);

        const result = await request.query("Insert into FamiliaProductos (nombre) values (@name)");

        return result['recordset'][0];
    }

    static async updateFamily(id_familia: number, nombre: string){
        const request = await getDbPool().request();
        
        request.input("id_familia", id_familia);
        request.input("name", nombre);
        
        const query = `Update FamiliaProductos set nombre = isNULL(@name, nombre) where id_familia = @id_familia`;
        const result = await request.query(query);

        return result['recordset'][0];
    }

    static async deleteFamily(id_familia: number){
        const request = await getDbPool().request();
        
        request.input("id_familia", id_familia);
        
        const result = await request.query("Delete from FamiliaProductos where id_familia = @id_familia");
        
        return result['recordset'][0];
    }

}