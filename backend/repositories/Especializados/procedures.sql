USE MU_DB;

CREATE VIEW Especializados AS
SELECT 
	EM.CI_emp, EM.apellido apellidoEmpleado, EM.nombre nombreEmpleado,EM.RIF_establecimiento RIF, SER.nro_servicio, SER.nombre_ser servicio
FROM 
	EspecializacionEmpleados EE, Empleados EM, Servicios SER
WHERE 
	Em.CI_emp = EE.CI_empleado AND
	SER.nro_servicio = EE.nro_servicio;

--Especializados de un establecimiento y un servicio especifico 
CREATE FUNCTION especialistasEstablecimiento(
@RIF varchar(100)
)
RETURNS TABLE
AS
RETURN(
	SELECT CI_emp,apellidoEmpleado,nombreEmpleado,nro_servicio,servicio FROM Especializados WHERE RIF = @rif
);

--bontener todos los empleados y el servicio en el que se especializan 

--nuevo especializacion 
CREATE PROCEDURE addEspecializacion
@RIF_establecimiento varchar(100),
@ci_empleado varchar(100),
@nro_servicio int
AS
BEGIN
	
	
	--verificar si el empledo trabaje en ese establecimiento 
	IF NOT EXISTS (SELECT 1 FROM Empleados WHERE CI_emp = @ci_empleado AND RIF_establecimiento = @RIF_establecimiento)
		THROW 50001,'Este empleado no trabaja en este establecimiento',1; 

	--verificamos si el servicio es ofrecido en dicho establecimiento 
	IF NOT EXISTS (SELECT 1 FROM ServiciosOfrecidos WHERE RIF_establecimiento = @RIF_establecimiento AND nro_servicio = @nro_servicio)
		THROW 50002,'Este servicio no es ofrecido por este establecimiento',1;

	
	--asignamos el servicio al empleado 
	INSERT INTO EspecializacionEmpleados (nro_servicio,CI_empleado) values (@nro_servicio, @ci_empleado);
END;
