--CRUD DE Actividades
USE MU_DB; 
GO 

CREATE FUNCTION getByEstablecimiento(
@RIF varchar(20)

)
RETURNS TABLE
AS
RETURN
(
	SELECT E.nombre as Establecimiento ,S.nombre_ser as Servicio,A.nombre as Actividad
    FROM Actividades A, Servicios S , ServiciosOfrecidos SO, Establecimientos E 
    WHERE E.RIF = @RIF and S.nro_servicio= A.nro_servicio  and  SO.nro_servicio=S.nro_servicio and SO.RIF_establecimiento = E.RIF 
)
GO

CREATE FUNCTION getByServicio(
@nro_serv  int
)
RETURNS TABLE
AS
RETURN
(
	SELECT S.nombre_ser, A.nombre 
    FROM Actividades A, Servicios S 
    WHERE S.nro_servicio= A.nro_servicio and S.nro_servicio = @nro_serv

)
GO

CREATE FUNCTION getActividad(
@nro_serv  int,
@nro_act int 
)
RETURNS TABLE
AS
RETURN
(
	SELECT S.nombre_ser, A.nombre 
    FROM Actividades A, Servicios S 
    WHERE S.nro_servicio= A.nro_servicio and S.nro_servicio = @nro_serv and A.nro_correlativo= @nro_act

)
GO



IF OBJECT_ID('dbo.createActividad', 'P') IS NOT NULL
    DROP PROCEDURE dbo.createActividad;
GO


CREATE PROCEDURE createActividad(
	@nro_servicio int ,
	@nro_correlativo int,
	@nombre varchar(255),
	@descripcion varchar(200),
	@costo decimal(10,2) 
)
AS
BEGIN
		--Si no existe la actividad, la cramos
		INSERT INTO Actividades (costo,descripcion,nombre,nro_correlativo,nro_servicio) values 
		(@costo,@descripcion,@nombre,@nro_servicio)
END;
GO


IF OBJECT_ID('dbo.updateActividad', 'P') IS NOT NULL
    DROP PROCEDURE dbo.editarCliente;
GO

CREATE PROCEDURE updateActividad(
	@nro_servicio int ,
	@nro_correlativo int,
	@nombre varchar(255),
	@descripcion varchar(200),
	@costo decimal(10,2) 
)
AS

BEGIN
-- Configuramos la parte inicial
	SET NOCOUNT ON; -- Suprimimos los mensajes de filas afectadas

	-- Declaramos las variables de control de transacci�n
	-- CORRECCI�N: NVARCHAR(4000) es m�s com�n para mensajes de error, 400 es muy corto
	DECLARE @TranCounter INT;
	DECLARE @ErrorMessage NVARCHAR(4000);
	DECLARE @ErrorSeverity INT;
	DECLARE @ErrorState INT;


	-- Iniciamos el bloque TRY
	BEGIN TRY
		-- CORRECCI�N: La asignaci�n de @@TRANCOUNT debe ser as�.
		-- La l�nea `SELECT @TranCounter INT;` estaba incorrecta.
		-- La l�nea `IF @TranCounter = @@TRANCOUNT;` era una condici�n IF sin cuerpo y era redundante/mal colocada.
		SELECT @TranCounter = @@TRANCOUNT;

		IF @TranCounter = 0 -- Si @@TRANCOUNT es 0, este SP inicia una nueva transacci�n
			BEGIN TRANSACTION;
		ELSE
			-- Si @@TRANCOUNT > 0, es porque ya estamos dentro de una transacci�n y creamos un SAVEPOINT
			-- CORRECCI�N: El nombre del SAVEPOINT debe ser usado consistentemente en el CATCH.
			SAVE TRANSACTION SP_puntoControl;

		--LOGICA DEL PROCEDIMIENTO 
		
		
		--Verificamos si la cedula se encuentra registrada 
		--IF NOT EXISTS (SELECT * FROM getActividad(@nro_servicio,@nro_correlativo))
		--BEGIN 
		--	;THROW 50001,'Esta actividad no existe',1; 
		--	END;

		--verificamos si los campos se van a modificar 
		IF (@nombre IS NOT NULL)
		BEGIN 
			UPDATE Actividades SET nombre = @nombre WHERE nro_correlativo = @nro_correlativo AND nro_servicio = @nro_servicio; 
			PRINT 'Nombre actualizado con exito';
		END; 

		--verificamos si los campos se van a modificar 
		IF (@descripcion IS NOT NULL)
		BEGIN 
			UPDATE Actividades SET descripcion= @descripcion WHERE nro_correlativo = @nro_correlativo AND nro_servicio = @nro_servicio; 
			PRINT 'Descripci�n actualizada con exito';
		END; 

		--verificamos si los campos se van a modificar 
		IF (@costo IS NOT NULL)
		BEGIN 
			UPDATE Actividades SET costo = @costo WHERE nro_correlativo = @nro_correlativo AND nro_servicio = @nro_servicio; 
			PRINT 'Costo actualizado con exito';
		END; 

		-- Finalizaci�n de la Transacci�n: COMMIT (Solo si este SP la inici�)
		IF @TranCounter = 0
			COMMIT TRANSACTION;
		-- Si se us� SAVEPOINT, la transacci�n padre es la responsable del COMMIT.

	END TRY
	BEGIN CATCH
		-- Manejo de Errores y ROLLBACK

		-- Capturar los detalles del error que ocurri�
		SELECT
			@ErrorMessage = ERROR_MESSAGE(),
			@ErrorSeverity = ERROR_SEVERITY(),
			@ErrorState = ERROR_STATE();

		-- Determinar qu� tipo de ROLLBACK hacer
		IF @@TRANCOUNT > 0 -- Solo si hay una transacci�n activa para revertir
		BEGIN
			IF @TranCounter = 0 -- Si este SP fue quien inici� la transacci�n principal
			BEGIN
				-- XACT_STATE() <> 0 significa que la transacci�n no est� en estado "commitable"
				-- Un error de severidad alta (>16) suele poner la transacci�n en estado irrecuperable (-1)
				IF XACT_STATE() <> 0
					ROLLBACK TRANSACTION; -- Revertir toda la transacci�n
				PRINT 'Error: Transacci�n completa revertida por el SP.';
			END
			ELSE -- Si el SP fue llamado dentro de otra transacci�n (anidada)
			BEGIN
				-- Si XACT_STATE() = 1, la transacci�n padre sigue committable.
				-- Revertir solo a nuestro SAVEPOINT para no afectar la transacci�n padre.
				-- CORRECCI�N: Usar el nombre del SAVEPOINT definido en el TRY.
				IF XACT_STATE() = 1
					ROLLBACK TRANSACTION SP_puntoControl;
				PRINT 'Error: Cambios revertidos a punto de guardado en SP anidado.';
			END;
		END;

		-- Re-lanzar el error para que la aplicaci�n cliente o el procedimiento padre lo capture
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);

	END CATCH;
END;

GO

IF OBJECT_ID('deleteActividad', 'P') IS NOT NULL
    DROP PROCEDURE dbo.eliminarCliente;
GO

CREATE PROCEDURE deleteActividad(
	@nro_servicio int ,
	@nro_correlativo int
)
AS
BEGIN
-- Configuramos la parte inicial
	SET NOCOUNT ON; -- Suprimimos los mensajes de filas afectadas

	-- Declaramos las variables de control de transacci�n
	-- CORRECCI�N: NVARCHAR(4000) es m�s com�n para mensajes de error, 400 es muy corto
	DECLARE @TranCounter INT;
	DECLARE @ErrorMessage NVARCHAR(4000);
	DECLARE @ErrorSeverity INT;
	DECLARE @ErrorState INT;


	-- Iniciamos el bloque TRY
	BEGIN TRY
		-- CORRECCI�N: La asignaci�n de @@TRANCOUNT debe ser as�.
		-- La l�nea `SELECT @TranCounter INT;` estaba incorrecta.
		-- La l�nea `IF @TranCounter = @@TRANCOUNT;` era una condici�n IF sin cuerpo y era redundante/mal colocada.
		SELECT @TranCounter = @@TRANCOUNT;

		IF @TranCounter = 0 -- Si @@TRANCOUNT es 0, este SP inicia una nueva transacci�n
			BEGIN TRANSACTION;
		ELSE
			-- Si @@TRANCOUNT > 0, es porque ya estamos dentro de una transacci�n y creamos un SAVEPOINT
			-- CORRECCI�N: El nombre del SAVEPOINT debe ser usado consistentemente en el CATCH.
			SAVE TRANSACTION SP_puntoControl;

		--LOGICA DEL PROCEDIMIENTO 
			
		IF EXISTS (SELECT * FROM getActividad(@nro_servicio,@nro_correlativo))
		BEGIN 
			Delete FROM Actividades WHERE nro_correlativo = @nro_correlativo AND nro_servicio = @nro_servicio; 
		END 
		ELSE
			BEGIN
			;THROW 50001,'Esta actividad no existe',1; 
			END
		-- Finalizaci�n de la Transacci�n: COMMIT (Solo si este SP la inici�)
		IF @TranCounter = 0
			COMMIT TRANSACTION;
		-- Si se us� SAVEPOINT, la transacci�n padre es la responsable del COMMIT.

	END TRY
	BEGIN CATCH
		-- Manejo de Errores y ROLLBACK

		-- Capturar los detalles del error que ocurri�
		SELECT
			@ErrorMessage = ERROR_MESSAGE(),
			@ErrorSeverity = ERROR_SEVERITY(),
			@ErrorState = ERROR_STATE();

		-- Determinar qu� tipo de ROLLBACK hacer
		IF @@TRANCOUNT > 0 -- Solo si hay una transacci�n activa para revertir
		BEGIN
			IF @TranCounter = 0 -- Si este SP fue quien inici� la transacci�n principal
			BEGIN
				-- XACT_STATE() <> 0 significa que la transacci�n no est� en estado "commitable"
				-- Un error de severidad alta (>16) suele poner la transacci�n en estado irrecuperable (-1)
				IF XACT_STATE() <> 0
					ROLLBACK TRANSACTION; -- Revertir toda la transacci�n
				PRINT 'Error: Transacci�n completa revertida por el SP.';
			END
			ELSE -- Si el SP fue llamado dentro de otra transacci�n (anidada)
			BEGIN
				-- Si XACT_STATE() = 1, la transacci�n padre sigue committable.
				-- Revertir solo a nuestro SAVEPOINT para no afectar la transacci�n padre.
				-- CORRECCI�N: Usar el nombre del SAVEPOINT definido en el TRY.
				IF XACT_STATE() = 1
					ROLLBACK TRANSACTION SP_puntoControl;
				PRINT 'Error: Cambios revertidos a punto de guardado en SP anidado.';
			END;
		END;

		-- Re-lanzar el error para que la aplicaci�n cliente o el procedimiento padre lo capture
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);

	END CATCH;
END;
GO
