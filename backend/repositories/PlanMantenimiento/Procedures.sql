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
@nro_modelo int,
@kilolmetraje int,
@nombre varchar(50),
@descripcion varchar(200))
AS 
BEGIN
-- Configuramos la parte inicial
	SET NOCOUNT ON; -- Suprimimos los mensajes de filas afectadas

	-- Declaramos las variables de control de transacción
	-- CORRECCIÓN: NVARCHAR(4000) es más común para mensajes de error, 400 es muy corto
	DECLARE @TranCounter INT;
	DECLARE @ErrorMessage NVARCHAR(4000);
	DECLARE @ErrorSeverity INT;
	DECLARE @ErrorState INT;


	-- Iniciamos el bloque TRY
	BEGIN TRY
		-- CORRECCIÓN: La asignación de @@TRANCOUNT debe ser así.
		-- La línea `SELECT @TranCounter INT;` estaba incorrecta.
		-- La línea `IF @TranCounter = @@TRANCOUNT;` era una condición IF sin cuerpo y era redundante/mal colocada.
		SELECT @TranCounter = @@TRANCOUNT;

		IF @TranCounter = 0 -- Si @@TRANCOUNT es 0, este SP inicia una nueva transacción
			BEGIN TRANSACTION;
		ELSE
			-- Si @@TRANCOUNT > 0, es porque ya estamos dentro de una transacción y creamos un SAVEPOINT
			-- CORRECCIÓN: El nombre del SAVEPOINT debe ser usado consistentemente en el CATCH.
			SAVE TRANSACTION SP_puntoControl;

		--LOGICA DEL PROCEDIMIENTO 
		
		
		IF EXISTS (SELECT * FROM getPlan(@cod_marca,@nro_modelo,@kilolmetraje))
		BEGIN
			;THROW 50001,'Este plan ya existe',1; 
		END; 


		--Si no existe la actividad, la cramos
		INSERT INTO PlanesMantenimiento(cod_marca,descripcion,kilometraje,nombre,nro_modelo) values 
		(@cod_marca,@nro_modelo ,@kilolmetraje ,@nombre ,@descripcion)


		-- Finalización de la Transacción: COMMIT (Solo si este SP la inició)
		IF @TranCounter = 0
			COMMIT TRANSACTION;
		-- Si se usó SAVEPOINT, la transacción padre es la responsable del COMMIT.

	END TRY
	BEGIN CATCH
		-- Manejo de Errores y ROLLBACK

		-- Capturar los detalles del error que ocurrió
		SELECT
			@ErrorMessage = ERROR_MESSAGE(),
			@ErrorSeverity = ERROR_SEVERITY(),
			@ErrorState = ERROR_STATE();

		-- Determinar qué tipo de ROLLBACK hacer
		IF @@TRANCOUNT > 0 -- Solo si hay una transacción activa para revertir
		BEGIN
			IF @TranCounter = 0 -- Si este SP fue quien inició la transacción principal
			BEGIN
				-- XACT_STATE() <> 0 significa que la transacción no está en estado "commitable"
				-- Un error de severidad alta (>16) suele poner la transacción en estado irrecuperable (-1)
				IF XACT_STATE() <> 0
					ROLLBACK TRANSACTION; -- Revertir toda la transacción
				PRINT 'Error: Transacción completa revertida por el SP.';
			END
			ELSE -- Si el SP fue llamado dentro de otra transacción (anidada)
			BEGIN
				-- Si XACT_STATE() = 1, la transacción padre sigue committable.
				-- Revertir solo a nuestro SAVEPOINT para no afectar la transacción padre.
				-- CORRECCIÓN: Usar el nombre del SAVEPOINT definido en el TRY.
				IF XACT_STATE() = 1
					ROLLBACK TRANSACTION SP_puntoControl;
				PRINT 'Error: Cambios revertidos a punto de guardado en SP anidado.';
			END;
		END;

		-- Re-lanzar el error para que la aplicación cliente o el procedimiento padre lo capture
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);

	END CATCH;
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
-- Configuramos la parte inicial
	SET NOCOUNT ON; -- Suprimimos los mensajes de filas afectadas

	-- Declaramos las variables de control de transacción
	-- CORRECCIÓN: NVARCHAR(4000) es más común para mensajes de error, 400 es muy corto
	DECLARE @TranCounter INT;
	DECLARE @ErrorMessage NVARCHAR(4000);
	DECLARE @ErrorSeverity INT;
	DECLARE @ErrorState INT;


	-- Iniciamos el bloque TRY
	BEGIN TRY
		-- CORRECCIÓN: La asignación de @@TRANCOUNT debe ser así.
		-- La línea `SELECT @TranCounter INT;` estaba incorrecta.
		-- La línea `IF @TranCounter = @@TRANCOUNT;` era una condición IF sin cuerpo y era redundante/mal colocada.
		SELECT @TranCounter = @@TRANCOUNT;

		IF @TranCounter = 0 -- Si @@TRANCOUNT es 0, este SP inicia una nueva transacción
			BEGIN TRANSACTION;
		ELSE
			-- Si @@TRANCOUNT > 0, es porque ya estamos dentro de una transacción y creamos un SAVEPOINT
			-- CORRECCIÓN: El nombre del SAVEPOINT debe ser usado consistentemente en el CATCH.
			SAVE TRANSACTION SP_puntoControl;

		--LOGICA DEL PROCEDIMIENTO 
			
		IF NOT EXISTS (SELECT * FROM getPlan(@cod_marca,@nro_modelo,@kilolmetraje))
		BEGIN
			;THROW 50001,'Este plan no existe',1; 
		END; 


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




		-- Finalización de la Transacción: COMMIT (Solo si este SP la inició)
		IF @TranCounter = 0
			COMMIT TRANSACTION;
		-- Si se usó SAVEPOINT, la transacción padre es la responsable del COMMIT.

	END TRY
	BEGIN CATCH
		-- Manejo de Errores y ROLLBACK

		-- Capturar los detalles del error que ocurrió
		SELECT
			@ErrorMessage = ERROR_MESSAGE(),
			@ErrorSeverity = ERROR_SEVERITY(),
			@ErrorState = ERROR_STATE();

		-- Determinar qué tipo de ROLLBACK hacer
		IF @@TRANCOUNT > 0 -- Solo si hay una transacción activa para revertir
		BEGIN
			IF @TranCounter = 0 -- Si este SP fue quien inició la transacción principal
			BEGIN
				-- XACT_STATE() <> 0 significa que la transacción no está en estado "commitable"
				-- Un error de severidad alta (>16) suele poner la transacción en estado irrecuperable (-1)
				IF XACT_STATE() <> 0
					ROLLBACK TRANSACTION; -- Revertir toda la transacción
				PRINT 'Error: Transacción completa revertida por el SP.';
			END
			ELSE -- Si el SP fue llamado dentro de otra transacción (anidada)
			BEGIN
				-- Si XACT_STATE() = 1, la transacción padre sigue committable.
				-- Revertir solo a nuestro SAVEPOINT para no afectar la transacción padre.
				-- CORRECCIÓN: Usar el nombre del SAVEPOINT definido en el TRY.
				IF XACT_STATE() = 1
					ROLLBACK TRANSACTION SP_puntoControl;
				PRINT 'Error: Cambios revertidos a punto de guardado en SP anidado.';
			END;
		END;

		-- Re-lanzar el error para que la aplicación cliente o el procedimiento padre lo capture
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);

	END CATCH;
END;
GO

IF OBJECT_ID('dbo.deletePlan', 'P') IS NOT NULL
    DROP PROCEDURE dbo.createPlan;
GO

CREATE PROCEDURE deletePlan(
@cod_marca int ,
@nro_modelo int,
@kilolmetraje int

)
AS BEGIN
-- Configuramos la parte inicial
	SET NOCOUNT ON; -- Suprimimos los mensajes de filas afectadas

	-- Declaramos las variables de control de transacción
	-- CORRECCIÓN: NVARCHAR(4000) es más común para mensajes de error, 400 es muy corto
	DECLARE @TranCounter INT;
	DECLARE @ErrorMessage NVARCHAR(4000);
	DECLARE @ErrorSeverity INT;
	DECLARE @ErrorState INT;


	-- Iniciamos el bloque TRY
	BEGIN TRY
		-- CORRECCIÓN: La asignación de @@TRANCOUNT debe ser así.
		-- La línea `SELECT @TranCounter INT;` estaba incorrecta.
		-- La línea `IF @TranCounter = @@TRANCOUNT;` era una condición IF sin cuerpo y era redundante/mal colocada.
		SELECT @TranCounter = @@TRANCOUNT;

		IF @TranCounter = 0 -- Si @@TRANCOUNT es 0, este SP inicia una nueva transacción
			BEGIN TRANSACTION;
		ELSE
			-- Si @@TRANCOUNT > 0, es porque ya estamos dentro de una transacción y creamos un SAVEPOINT
			-- CORRECCIÓN: El nombre del SAVEPOINT debe ser usado consistentemente en el CATCH.
			SAVE TRANSACTION SP_puntoControl;

		--LOGICA DEL PROCEDIMIENTO 
		
		IF EXISTS (SELECT * FROM getPlan(@cod_marca,@nro_modelo,@kilolmetraje))
		BEGIN 
			Delete FROM PlanesMantenimiento WHERE @cod_marca = cod_marca AND @nro_modelo = nro_modelo and @kilolmetraje = kilometraje;  
		END 
		ELSE
			BEGIN
			;THROW 50001,'Este Plan de mantenimiento no existe',1; 
			END

		-- Finalización de la Transacción: COMMIT (Solo si este SP la inició)
		IF @TranCounter = 0
			COMMIT TRANSACTION;
		-- Si se usó SAVEPOINT, la transacción padre es la responsable del COMMIT.

	END TRY
	BEGIN CATCH
		-- Manejo de Errores y ROLLBACK

		-- Capturar los detalles del error que ocurrió
		SELECT
			@ErrorMessage = ERROR_MESSAGE(),
			@ErrorSeverity = ERROR_SEVERITY(),
			@ErrorState = ERROR_STATE();

		-- Determinar qué tipo de ROLLBACK hacer
		IF @@TRANCOUNT > 0 -- Solo si hay una transacción activa para revertir
		BEGIN
			IF @TranCounter = 0 -- Si este SP fue quien inició la transacción principal
			BEGIN
				-- XACT_STATE() <> 0 significa que la transacción no está en estado "commitable"
				-- Un error de severidad alta (>16) suele poner la transacción en estado irrecuperable (-1)
				IF XACT_STATE() <> 0
					ROLLBACK TRANSACTION; -- Revertir toda la transacción
				PRINT 'Error: Transacción completa revertida por el SP.';
			END
			ELSE -- Si el SP fue llamado dentro de otra transacción (anidada)
			BEGIN
				-- Si XACT_STATE() = 1, la transacción padre sigue committable.
				-- Revertir solo a nuestro SAVEPOINT para no afectar la transacción padre.
				-- CORRECCIÓN: Usar el nombre del SAVEPOINT definido en el TRY.
				IF XACT_STATE() = 1
					ROLLBACK TRANSACTION SP_puntoControl;
				PRINT 'Error: Cambios revertidos a punto de guardado en SP anidado.';
			END;
		END;

		-- Re-lanzar el error para que la aplicación cliente o el procedimiento padre lo capture
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);

	END CATCH;
END;
GO