import { getDbPool } from "../config/SQLserverConection";

export class brandModel {
    static async getAll(){
        const pool = getDbPool();
        const result = await pool.query('SELECT * FROM Marcas ORDER BY cod_marca;');
        return result['recordset'];
    }

    static async getById(id: number) {
        const request = getDbPool().request();
        request.input('id', id);

        const result = await request.query('SELECT * FROM Marcas WHERE cod_marca = @id;');
        return result['recordset'][0];
    }

    static async editBrand( id: number | null, name: string | null ) {

        const request = getDbPool().request();
        request.input('id', id);
        request.input('name', name);

        const result = await request.query('UPDATE Marcas SET nombre_marca = ISNULL(@name, nombre_marca) WHERE cod_marca = @id;');
        return {rowsAffected: result['rowsAffected'][0]};
    }

    static async addBrand(name: string) {
        if (name === null || name === undefined || name.length === 0) {
            return { error: "Name is required" };
        }

        const request = getDbPool().request();
        request.input('name', name);

        const result = await request.query('INSERT INTO Marcas (nombre_marca) VALUES (@name);');
        return {rowsAffected: result['rowsAffected'][0]};
        
    }

    static async deleteBrand(id: number) {
        if (id === undefined || id === null || id <= 0) {
            return { error: "ID is required" };
        }

        const request = getDbPool().request();
        request.input('id', id);

        const result = await request.query('DELETE FROM Marcas WHERE cod_marca = @id;');
        return {rowsAffected: result['rowsAffected'][0]};
    }
}