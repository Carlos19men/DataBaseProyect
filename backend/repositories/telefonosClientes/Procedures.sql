USE MU_DB; -- Make sure this is the correct database.
GO


--obtenemos los telefonos de un cliente especifico 
CREATE FUNCTION GetTelefonosClientes(
    @cedula VARCHAR(100) -- Good, you've added the length!
)
RETURNS TABLE
AS
RETURN
(
    -- Corrected column name here
    SELECT numero
    FROM telefonosCliente
    WHERE CI_cliente = @cedula
);
GO
--select * from GetTelefonosCliente('cedula'); 

--Registrar nuevos telefonos 
IF OBJECT_ID('dbo.registrarTelefonos', 'P') IS NOT NULL
    DROP PROCEDURE dbo.registrarTelefonos;
GO

CREATE PROCEDURE registrarTelefonos
	-- Declaración de parámetros
	@CI varchar(50),
	@tel1 varchar(50),
	@tel2 varchar(50)
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

		-- Lógica del procedimiento
		--IF la cedula existe es porque ya tiene numeros asociados 
		IF EXISTS (SELECT 1 FROM telefonosCliente WHERE CI_cliente = @CI)
		BEGIN 
			;THROW 50000,'Este cliente ya tiene telefonos asociados',1;
		END; 

		-- Los números deben ser diferentes
		IF (@tel1 = @tel2)
		BEGIN
			;THROW 50001, 'Los números de teléfono no deben ser iguales.', 1; -- CORRECCIÓN: Añadido el 'state' (1) a THROW
		END;

		IF (LEN(@tel1) < 10) OR (LEN(@tel2) < 10)
		BEGIN
			;THROW 50002, 'Lo números ingresados no son validos',1;
		END; 
		-- CORRECCIÓN: El mensaje en THROW debe ser claro sobre la acción (o falta de ella).
		IF EXISTS (SELECT 1 FROM telefonosCliente WHERE numero = @tel1) OR
			EXISTS (SELECT 1 FROM telefonosCliente WHERE numero = @tel2)
		BEGIN
			;THROW 50003, 'Uno o ambos números de teléfono ya se encuentran registrados. No se realizará ninguna inserción.', 1;
		END
		ELSE
		BEGIN
			-- El teléfono es nuevo y efectivamente lo registramos
			INSERT INTO telefonosCliente (numero,CI_cliente) VALUES
				(@tel1,@CI),
				(@tel2,@CI);

			-- CORRECCIÓN: Para concatenar con números (como @CI si es un INT o si quieres asegurarte), usa CAST o CONCAT
			PRINT 'Ambos teléfonos se han registrado exitosamente para el cliente ' + @CI + '.';
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


--editar un numero existente
IF OBJECT_ID('dbo.editarTelefono','P') IS NOT NULL
	DROP PROCEDURE dbo.editarTelefono; 
GO

CREATE PROCEDURE editarTelefono
	@CI varchar(50),
	@telf varchar(50),
	@newTelf varchar(50)
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

		--Logica del procedimiento incluyendo las validaciones 
		IF NOT EXISTS (SELECT 1 FROM telefonosCliente WHERE CI_cliente = @CI)
		BEGIN
			;THROW 50001,'Este cliente no se encuentra registrado',1;
		END; 

		IF NOT EXISTS (SELECT 1 FROM telefonosCliente WHERE numero = @telf)
		BEGIN
			;THROW 50002,'El numero a editar no se encuentra registrado',1;
		END; 

		IF EXISTS (SELECT 1 FROM telefonosCliente WHERE numero = @newTelf) 
		BEGIN 
			;THROW 50003,'El numero nuevo ya se encuentra registrado',1;
		END; 

		--EDITAMOS EL NUEVO NUMERO 

		UPDATE telefonosCliente SET numero = @newTelf WHERE CI_cliente=@CI AND numero = @telf; 
		PRINT 'La modificación del numero '+@telf+' a '+@newTelf+' se ha realizado con exito'; 

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
