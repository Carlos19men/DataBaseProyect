import { getDbPool } from "../config/SQLserverConection";

export class establishmentsModel{
    static async getAll() {
        const pool = getDbPool();
        const result = await pool.query('SELECT RIF, nombre, ciudad FROM Establecimientos ORDER BY nombre;');
        
        console.log(result['recordset']);
        return result['recordset'];
    }

    static async getByRIF(RIF: string) {
        if (RIF === undefined || RIF === null || RIF.length === 0) {
            return { error: "Se necesita el RIF" };
        }

        const request = getDbPool().request();
        request.input('RIF', RIF);

        const result = await request.query('SELECT * FROM Establecimientos WHERE RIF = @RIF;');
        console.log(result['recordset']);
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
        console.log(result['recordset']);
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
        console.log(result['recordset']);

        return result['recordset'];
    }

    static async deleteEstablishment(RIF: string){
        if(RIF === undefined || RIF === null || RIF.length == 0){
            return {error: 'Se necesita el RIF'}
        }

        const request = getDbPool().request();

        request.input('RIF', RIF);

        const query = ` Delete from Establecimientos where RIF = @RIF;`;

        const result = await request.query(query);
        console.log(result['rowsAffected']);

        return result['rowsAffected'];
    }
}