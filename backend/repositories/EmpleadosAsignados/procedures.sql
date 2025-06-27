use MU_DB
GO

CREATE FUNCTION empleadosAsignadosSer(
@RIF varchar(100)
)
RETURNS TABLE
AS
RETURN (
	SELECT Ser.nro_servicio ID_servicio, Ser.nombre_ser,CI_emp CedulaEmpleado,Em.nombre,Em.apellido 
	FROM 
		Servicios Ser,Empleados Em, EmpleadosAsignados EA, Establecimientos Est
	WHERE 
		Ser.nro_servicio = EA.nro_servicio AND Em.CI_emp = EA.CI_empleado
);
GO

GO

CREATE FUNCTION empleadosNoAsignados(
@RIF varchar(100)
)
RETURNS TABLE
AS
RETURN (
	SELECT * FROM Empleados EM WHERE CI_emp NOT IN (SELECT CedulaEmpleado FROM empleadosAsignadosSer(@RIF)) AND RIF_establecimiento = @RIF
);
GO
--asignar empleado 
CREATE PROCEDURE asigEmpleado
@RIF_establecimiento VARCHAR(100),
@id_servicio INT,
@CI_empleado VARCHAR(100)
AS
BEGIN 
	--VALIDAMOS QUE EL RIF DEL ESTABLECIMIENTO SEA EL MISMO DONDE TRABAJA EL EMPLEADO
	IF @RIF_establecimiento <> (SELECT RIF_establecimiento FROM Empleados WHERE CI_emp = @CI_empleado)
		THROW 50001,'El RIF del establecimiento debe coincidor con el rif del establecimiento donde trabaja el empleado',1; 

	--VALIDAMOS QUE EL SERVICIO SEA OFRECIDO POR EL ESTABLECIMIENTO 
	IF not EXISTS (SELECT 1 FROM ServiciosOfrecidos WHERE RIF_establecimiento = @RIF_establecimiento AND nro_servicio = @id_servicio)
		THROW 50002,'El establecimiento no ofrece ese servicio',1;
	
	INSERT INTO EmpleadosAsignados (nro_servicio, CI_empleado) VALUES (@id_servicio,@CI_empleado); 

	print 'empleado asignado con exito'
END; 
GO
