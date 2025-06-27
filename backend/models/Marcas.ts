import { getDbPool } from "../config/SQLserverConection";

export class brandModel {
    static async getAll(){
        const pool = getDbPool();
        const result = await pool.query('SELECT * FROM Marcas ORDER BY nombre;');
        return result['recordset'];
    }

    static async getById(id: number) {
        if (id === undefined || id === null) {
            return { error: "ID is required" };
        }

        const request = getDbPool().request();
        request.input('id', id);

        const result = await request.query('SELECT * FROM Marcas WHERE id = @id;');
        return result['recordset'][0];
    }

    static async editBrand({ id, name }: { id: number | null, name: string | null }) {
        if (id !== null) {
            if (id === undefined || id <= 0) {
                return { error: "ID is required" };
            }
        }

        if (name !== null) {
            if (name === undefined || name.length === 0) {
                return { error: "Name is required" };
            }
        }

        const request = getDbPool().request();
        request.input('id', id);
        request.input('name', name);

        const result = await request.query('UPDATE Marcas SET nombre = isNULL(@name, nombre_marca) WHERE id = @id;');
        return result['recordset'][0];
    }

    static async addBrand({ name }: { name: string | null }) {
        if (name === null || name === undefined || name.length === 0) {
            return { error: "Name is required" };
        }

        const request = getDbPool().request();
        request.input('name', name);

        const result = await request.query('INSERT INTO Marcas (nombre) VALUES (@name);');
        return result['recordset'][0];
    }

    static async deleteBrand(id: number) {
        if (id === undefined || id === null || id <= 0) {
            return { error: "ID is required" };
        }

        const request = getDbPool().request();
        request.input('id', id);

        const result = await request.query('DELETE FROM Marcas WHERE id = @id;');
        return result['recordset'][0];
    }
}