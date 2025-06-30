--CRUD DE PlanMantenimiento
USE MU_DB;
GO

CREATE FUNCTION	getByMarca(
@cod_marca int
)
RETURNS TABLE 
AS
RETURN 
(
	SELECT MA.nombre_marca,MO.nro_modelo,PM.kilometraje,PM.nombre,PM.descripcion  
	FROM Marcas Ma, Modelos Mo, PlanesMantenimiento PM
	WHERE Ma.cod_marca= @cod_marca AND Ma.cod_marca=Mo.cod_marca AND MO.nro_modelo =PM.nro_modelo 
)
GO

CREATE FUNCTION	getByModelo(
@cod_marca int ,
@nro_modelo int
)
RETURNS TABLE 
AS
RETURN 
(
	SELECT MA.nombre_marca,MO.nro_modelo,PM.kilometraje,PM.nombre,PM.descripcion  
	FROM Marcas Ma, Modelos Mo, PlanesMantenimiento PM
	WHERE Ma.cod_marca= @cod_marca AND Ma.cod_marca=Mo.cod_marca AND @nro_modelo = Mo.nro_modelo  AND MO.nro_modelo = PM.nro_modelo 
)
GO

CREATE FUNCTION	getPlan(
@cod_marca int ,
@nro_modelo int,
@kilolmetraje int 
)
RETURNS TABLE 
AS
RETURN 
(
	SELECT MA.nombre_marca,MO.nro_modelo,PM.kilometraje,PM.nombre,PM.descripcion  
	FROM Marcas Ma, Modelos Mo, PlanesMantenimiento PM
	WHERE Ma.cod_marca= @cod_marca AND Ma.cod_marca=Mo.cod_marca AND @nro_modelo = Mo.nro_modelo  AND MO.nro_modelo = PM.nro_modelo AND @kilolmetraje = PM.kilometraje
)
GO


IF OBJECT_ID('dbo.createPlan', 'P') IS NOT NULL
    DROP PROCEDURE dbo.createPlan;
GO

CREATE PROCEDURE createPlan(
@cod_marca int ,
@kilolmetraje int,
@nombre varchar(50),
@descripcion varchar(200))
AS 
BEGIN
		--LOGICA DEL PROCEDIMIENTO 


		--Si no existe la actividad, la cramos
		INSERT INTO PlanesMantenimiento(cod_marca,descripcion,kilometraje,nombre,nro_modelo) values 
		(@cod_marca,@kilolmetraje ,@nombre ,@descripcion)

END;
GO

IF OBJECT_ID('dbo.updatePlan', 'P') IS NOT NULL
    DROP PROCEDURE dbo.updatePlan;
GO

CREATE PROCEDURE	updatePlan(
@cod_marca int ,
@nro_modelo int,
@kilolmetraje int,
@nombre varchar(50),
@descripcion varchar(200)
)
AS
BEGIN
		--LOGICA DEL PROCEDIMIENTO 
		--verificamos si los campos se van a modificar 
		IF (@nombre IS NOT NULL)
		BEGIN 
			UPDATE PlanesMantenimiento SET nombre = @nombre WHERE @cod_marca = cod_marca AND @nro_modelo = nro_modelo and @kilolmetraje = kilometraje; 
			PRINT 'Nombre actualizado con exito';
		END; 

		--verificamos si los campos se van a modificar 
		IF (@descripcion IS NOT NULL)
		BEGIN 
			UPDATE PlanesMantenimiento SET descripcion= @descripcion WHERE @cod_marca = cod_marca AND @nro_modelo = nro_modelo and @kilolmetraje = kilometraje; 
			PRINT 'Descripción actualizada con exito';
		END; 
END;
GO