IF OBJECT_ID('ObtenerEmpleados', 'V') IS NOT NULL
    DROP VIEW ObtenerEmpleados;
GO

Create view ObtenerEmpleados as
select CI_emp, RIF_establecimiento, nombre, apellido,sueldo,direccion
from Empleados;
go

IF OBJECT_ID('addEmpleado','P') IS NOT NULL
	drop procedure AddEmpleado;
GO	

create proc AddEmpleado
    @CI VARCHAR(50),
    @RIF VARCHAR(50),
    @name VARCHAR(50),
    @lastname VARCHAR(50),
    @cellphone VARCHAR(50),
    @address VARCHAR(100),
    @salary DECIMAL(10,2)
AS
BEGIN
    INSERT INTO Empleados (CI_emp, RIF_establecimiento, nombre, apellido, telefono, direccion, sueldo)
    VALUES (@CI, @RIF, @name, @lastname, @cellphone, @address, @salary);
END;
go

CREATE PROCEDURE AddEncargado
@RIF varchar(100),
@CI varchar(100),
@fecha DATE
AS
BEGIN 
	--VALIDAR QUE EL EMPLEADO TRABAJE EN ESTE ESTABLECIMIETNO 
	IF NOT EXISTS (SELECT 1 FROM Establecimientos Est, Empleados Em WHERE @RIF = Em.RIF_establecimiento AND Est.RIF = @RIF AND Em.CI_emp = @CI)
		THROW 50001, 'Este empleado no trabaja en ese establecimiento',1; 

	--ASIGNAR EL ENCARGADO 
	UPDATE Establecimientos SET CI_encargado = @CI WHERE RIF = @RIF;
END; 
GO


SELECT * FROM Establecimientos;