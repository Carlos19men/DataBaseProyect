import { getDbPool } from "../config/SQLserverConection";

export class establishmentsModel{
    static async getAll() {
        const pool = getDbPool();
        const result = await pool.query('SELECT * FROM obtenerEstablecimientos ORDER BY nombre;');
        
        return result['recordset'];
    }

    static async getByRIF(RIF: string) {
        if (RIF === undefined || RIF === null || RIF.length === 0) {
            return { error: "Se necesita el RIF" };
        }

        const request = getDbPool().request();
        request.input('RIF', RIF);

        const result = await request.query('SELECT * FROM obtenerEstablecimientos WHERE RIF = @RIF;');
        return result['recordset'][0];
    }

    static async edit({RIF, CI_PIC, name, city, date_PIC}: {RIF: string | null, CI_PIC: string | null, name: string | null, city: string | null, date_PIC: Date | null}){
        if(RIF != null){
            if(RIF === undefined || RIF.length === 0){
                return {error: "Se necesita el RIF"};
            }
        }
        
        if(CI_PIC != null){
            if(CI_PIC === undefined || CI_PIC.length === 0){
                return {error: "Se necesita la cédula del propietario"};
            }
        }
        
        if(name != null){
            if(name === undefined || name.length === 0){
                return {error: "Se necesita el nombre del establecimiento"};
            }
        }

        if(city != null){
            if(city === undefined || city.length === 0){
                return {error: "Se necesita la ciudad del establecimiento"};
            }
        }

        if(date_PIC != null){
            if(date_PIC === undefined || !(date_PIC instanceof Date)){
                return {error: "Se necesita la fecha de inscripción del establecimiento"};
            }
        }

        const request = getDbPool().request();

        request.input('RIF', RIF);
        request.input('CI_PIC', CI_PIC);
        request.input('name', name);
        request.input('city', city);
        request.input('date_PIC', date_PIC);

        const query = 
        `
            Update Establecimientos
            set CI_PIC = isNULL(@CI_PIC, CI_PIC),
                name = isNULL(@name, nombre),
                city = isNULL(@city, ciudad),
                date_PIC = isNULL(@date_PIC, fecha_encargado)
            where RIF = @RIF;
        `

        const result = await request.query(query);
        return result['recordset'][0];
    }

    static async add({RIF, CI_PIC, name, city, date_PIC}:{RIF: string, CI_PIC: string, name: string, city: string, date_PIC: Date}){
        if(RIF != null){
            if(RIF === undefined || RIF.length === 0){
                return {error: "Se necesita el RIF"};
            }
        }
        
        if(CI_PIC != null){
            if(CI_PIC === undefined || CI_PIC.length === 0){
                return {error: "Se necesita la cédula del propietario"};
            }
        }
        
        if(name != null){
            if(name === undefined || name.length === 0){
                return {error: "Se necesita el nombre del establecimiento"};
            }
        }

        if(city != null){
            if(city === undefined || city.length === 0){
                return {error: "Se necesita la ciudad del establecimiento"};
            }
        }

        if(date_PIC != null){
            if(date_PIC === undefined || !(date_PIC instanceof Date)){
                return {error: "Se necesita la fecha de inscripción del establecimiento"};
            }
        }

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

        return result['recordset'];
    }

    static async asigPersonInCharge({RIF,CI_encargado}:{RIF:string,CI_encargado:string}){
        const request = getDbPool().request();

        request.input("RIF",RIF)
        request.input("CI_encargado",CI_encargado)

        const result = await request.query(`UPDATE Establecimientos 
                                            SET CI_encargado = @CI_encargado 
                                            WHERE RIF_establecimiento = @RIF;`)

        return {rowsAffected: result['rowsAffected']}
    }

    static async deleteEstablishment(RIF: string){

        const request = getDbPool().request();

        request.input('RIF', RIF);

        const query = ` Delete from Establecimientos where RIF = @RIF;`;

        const result = await request.query(query);

        return result['rowsAffected'];
    }

    static async removePersonInCharge(RIF: string) {
        if (RIF === undefined || RIF === null || RIF.length === 0) {
            return { error: "Se necesita el RIF del establecimiento" };
        }

        const request = getDbPool().request();
        request.input('RIF', RIF);

        const query = `
            UPDATE Establecimientos 
            SET 
            CI_encargado = NULL 
            fecha_encargado = NULL
            WHERE RIF = @RIF;
        `;

        const result = await request.query(query);
        return { rowsAffected: result['rowsAffected'] };
    }

    static async assignNewPersonInCharge({RIF, CI_encargado}: {RIF: string, CI_encargado: string}) {
        if (RIF === undefined || RIF === null || RIF.length === 0) {
            return { error: "Se necesita el RIF del establecimiento" };
        }

        if (CI_encargado === undefined || CI_encargado === null || CI_encargado.length === 0) {
            return { error: "Se necesita la cédula del nuevo encargado" };
        }

        const request = getDbPool().request();
        request.input('RIF', RIF);
        request.input('CI_encargado', CI_encargado);

        const query = `
            UPDATE Establecimientos 
            SET CI_encargado = @CI_encargado 
            WHERE RIF = @RIF;
        `;

        const result = await request.query(query);
        return { rowsAffected: result['rowsAffected'] };
    }
}