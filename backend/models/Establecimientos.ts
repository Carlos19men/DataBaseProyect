import { getDbPool } from "../config/SQLserverConection";

export class establishmentsModel{
    static async getAll() {
        const pool = getDbPool();
        const result = await pool.query('SELECT * FROM obtenerEstablecimientos ORDER BY nombre;');
        
        return result['recordset'];  
    }

    static async getByRIF(RIF: string) {
        const request = getDbPool().request();
        request.input('RIF', RIF);

        const result = await request.query('SELECT * FROM obtenerEstablecimientos WHERE RIF = @RIF;');
        return result['recordset'][0];
    }

    static async edit(RIF: string, name: string | null, city: string | null){

        const request = getDbPool().request();

        request.input('RIF', RIF);
        request.input('name', name);
        request.input('city', city);

        const query = 
        `
            Update Establecimientos
            set 
                nombre = isNULL(@name, nombre),
                ciudad = isNULL(@city, ciudad)
            where RIF = @RIF;
        `

        const result = await request.query(query);
        return {rowsAffected: result['recordset'][0]};
    }

    static async add(RIF: string, CI_PIC: string | null, name: string, city: string, date_PIC: Date | null){
        
        const request = getDbPool().request();
        
        request.input('RIF', RIF);
        request.input('CI_PIC', CI_PIC);
        request.input('name', name);
        request.input('city', city);
        request.input('date_PIC', date_PIC);

        const query = 
        `
            Insert into Establecimientos
            values(@RIF, @CI_PIC, @name, @city, @date_PIC);
        `

        const result = await request.query(query);

        return {rowsAffected: result['rowsAffected'][0]};
    }

    static async asigPersonInCharge(RIF:string,CI_encargado:string | null,fecha:Date | null){
        const request = getDbPool().request();

        request.input("RIF",RIF)
        request.input("CI_encargado",CI_encargado)
        request.input("fecha_encargado",fecha)

        const result = await request.query(`UPDATE Establecimientos 
                                            SET CI_encargado = @CI_encargado,
                                            fecha_encargado = @fecha
                                            WHERE RIF_establecimiento = @RIF;`)

        return {rowsAffected: result['rowsAffected'][0]}
    }

    static async removePersonInCharge(RIF: string) {
        return this.asigPersonInCharge(RIF,null,null);
    }

    static async deleteEstablishment(RIF: string){

        const request = getDbPool().request();

        request.input('RIF', RIF);

        const query = ` Delete from Establecimientos where RIF = @RIF;`;

        const result = await request.query(query);

        return {rowsAffected: result['rowsAffected'][0]};
    }

    
}