import { getDbPool } from "../config/SQLserverConection";

export class employeeAsigModel {


    static async getByEstablecimiento(RIF: string) {
        if (RIF === undefined || RIF === null || RIF.length === 0) {
            return { error: "Se requiere el RIF" };
        }

        const request = getDbPool().request();
        request.input('RIF', RIF);

        const result = await request.query('SELECT * FROM empleadosAsignadosSer(@RIF);');
        console.log(result['recordset']);
        return result['recordset'];
    }

    static async getByService(RIF:string,id_servicio:number){
        if (RIF === undefined || RIF === null || RIF.length === 0) {
            return { error: "Se requiere el RIF" };
        }

        if(id_servicio === null || id_servicio === undefined){
            return {messasge:'se requiere el id del servicio'}
        }

        const request = getDbPool().request()

    
        request.input('RIF',RIF)
        request.input('id_servicio',id_servicio)

        const result = await request.query('SELECT * FROM empleadosAsignadosSer(@RIF) WHERE ID_servicio = @id_servicio;')

        return result['recordset']
    }

    static async asigEmployee(RIF:string,id_servicio:number,Ci_emp:string){
        if (RIF === undefined || RIF === null || RIF.length === 0) {
            return { error: "Se requiere el RIF" };
        }

        if(id_servicio === null || id_servicio === undefined){
            return {messasge:'se requiere el id del servicio'}
        }

        if(Ci_emp === null || Ci_emp === undefined || Ci_emp.length === 0){
            return{messasge:'Se requiere la cedula del empleado'}
        }

        const request = getDbPool().request()

        request.input('RIF',RIF)
        request.input('id_servicio',id_servicio)
        request.input('Ci_emp',Ci_emp)

        const result = await request.query('EXEC asigEmpleado(@RIF,@id_servicio,@Ci_emp);')

        return result['rowsAffected']
    }

    static async unasigEmployee(id_servicio:number,Ci_emp:string){
        if(id_servicio === null || id_servicio === undefined){
            return {messasge:'se requiere el id del servicio'}
        }

        if(Ci_emp === null || Ci_emp === undefined || Ci_emp.length === 0){
            return{messasge:'Se requiere la cedula del empleado'}
        }

        const request = getDbPool().request()

        request.input('id_servicio',Ci_emp)
        request.input('Ci_emp',Ci_emp)

        const result = await request.query('DELETE EmpleadosAsignados WHERE ID_servicio = @id_servicio AND Ci_emp = @Ci_emp;');

        return result['recordset']
    }

    static async getByEmployee(RIF: string, Ci_emp: string) {
        if (RIF === undefined || RIF === null || RIF.length === 0) {
            return { error: "Se requiere el RIF" };
        }

        if (Ci_emp === undefined || Ci_emp === null || Ci_emp.length === 0) {
            return { error: "Se requiere la cedula del empleado" };
        }

        const request = getDbPool().request();
        request.input('RIF', RIF);
        request.input('Ci_emp', Ci_emp);

        const result = await request.query('SELECT * FROM empleadosAsignadosSer(@RIF) WHERE CedulaEmpleado = @Ci_emp;');
        return result['recordset'];
    }

    static async getEmployeesNotAssigned(RIF: string) {
        if (RIF === undefined || RIF === null || RIF.length === 0) {
            return { error: "Se requiere el RIF" };
        }

        const request = getDbPool().request();
        request.input('RIF', RIF);

        const result = await request.query('SELECT * FROM empleadosNoAsignados(@RIF);');
        return result['recordset'];
    }

}