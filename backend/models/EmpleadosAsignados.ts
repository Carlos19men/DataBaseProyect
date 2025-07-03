import { getDbPool } from "../config/SQLserverConection";

export class employeeAsigModel {


    static async getByEstablecimiento(RIF: string) {

        const request = getDbPool().request();
        request.input('RIF', RIF);

        const result = await request.query('SELECT * FROM empleadosAsignadosSer(@RIF);');
        return result['recordset'];
    }

    static async getByService(RIF:string,id_servicio:number){

        const request = getDbPool().request()
    
        request.input('RIF',RIF)
        request.input('id_servicio',id_servicio)

        const result = await request.query('SELECT * FROM empleadosAsignadosSer(@RIF) WHERE ID_servicio = @id_servicio;')

        return result['recordset']
    }

    static async asigEmployee(RIF: string, id_servicio: number, Ci_emp: string) {
        const request = getDbPool().request();

        request.input('RIF_establecimiento', RIF);
        request.input('id_servicio', id_servicio);
        request.input('CI_empleado', Ci_emp);

        const result = await request.query('EXEC asigEmpleado @RIF_establecimiento, @id_servicio, @CI_empleado;');

        return { rowsAffected: result['rowsAffected'][0] };
    }

    static async unasigEmployee(id_servicio: number, Ci_emp: string) {
        const request = getDbPool().request();

        request.input('id_servicio', id_servicio);
        request.input('Ci_emp', Ci_emp);
        const result = await request.query('DELETE FROM EmpleadosAsignados WHERE nro_servicio = @id_servicio AND CI_empleado = @Ci_emp;');

        return { rowsAffected: result['rowsAffected'][0] };
    }

    static async getByEmployee(RIF: string, Ci_emp: string) {
        const request = getDbPool().request();
        request.input('RIF', RIF);
        request.input('Ci_emp', Ci_emp);

        const result = await request.query('SELECT * FROM empleadosAsignadosSer(@RIF) WHERE CedulaEmpleado = @Ci_emp;');
        return result['recordset'][0];
    }

    static async getEmployeesNotAssigned(RIF: string) {

        const request = getDbPool().request();
        request.input('RIF', RIF);

        const result = await request.query('SELECT * FROM empleadosNoAsignados(@RIF);');
        return result['recordset'];
    }

}