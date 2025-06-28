USE MU_DB
GO

CREATE FUNCTION ObtenerPorPlaca(
	@placa VARCHAR(50)
)
RETURNS TABLE
AS
RETURN(
	SELECT * FROM ObtenerVehiculos WHERE placa = @placa
);

GO


--Crear un nuevo vehiculo 
IF (OBJECT_ID('dbo.nuevoVehiculo','P') IS NOT NULL)

	DROP PROCEDURE dbo.editarTelefono; 
	
GO

CREATE PROCEDURE nuevoVehiculo(
	@plate VARCHAR(100),
	@oil_box VARCHAR(100),
	@oil_motor VARCHAR(100),
	@maintenance VARCHAR(100),
	@months_use INT,
	@mileage DECIMAL(10,2),
	@id_marca INT,
	@id_model INT,
	@CI_owner VARCHAR(100)
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

		--Logica del procedimiento incluyendo las validaciones 
		
		--VALIDAMOS QUE LA PLACA NO EXISTA 
		IF EXISTS (SELECT 1 FROM ObtenerPorPlaca(@plate))
			THROW 50001,'Esta placa ya se encuentra registrada',1; 

		--VALIDAMOS QUE EL CLIENTE EXISTA 
		IF NOT EXISTS (SELECT 1 FROM ObtenerCliente(@CI_owner))
			THROW 50002, 'Cliente no registrado',1; 
		
		--VALIDAMOS QUE EL MES Y EL KILOMETRAJE SEAN VALIDOS 
		IF @mileage < 0
			THROW 50003, 'Kilometraje menor que 0',1; 

		IF @months_use < 0
			THROW 50004,'meses de uso menores que 0',1; 

		--VALIDAMOS QUE EL MODELO CORRESPONDA CON LA MARCA 
		IF NOT EXISTS (SELECT 1 FROM Modelos WHERE cod_marca = @id_marca AND nro_modelo = @id_model)
			THROW 50005,'El modelo no corresponde con la marca',1; 

		--Insertamos los datos 
		INSERT INTO Vehiculos (placa, aceite_utilizado_motor,aceite_utilizado_caja,resumen_mantenimiento, meses_uso, kilometraje, id_modelo,id_marca,CI_dueño)
		VALUES (@plate, @oil_motor, @oil_box,@maintenance, @months_use, @mileage, @id_model,@id_marca,@CI_owner); 

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

CREATE PROCEDURE eliminarVehiculo (
	@placa VARCHAR(100)
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

		--Logica del procedimiento incluyendo las validaciones 
		
		--VALIDAMOS QUE LA PLACA EXISTA 
		IF NOT EXISTS (SELECT 1 FROM ObtenerPorPlaca(@placa))
			THROW 50001,'Placa no resgistrada',1; 

		--Eliminamos el vehiculo 
		DELETE Vehiculos WHERE placa = @placa; 

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


CREATE PROCEDURE actualizarVehiculo(
	@plate VARCHAR(100),
	@oil_box VARCHAR(100),
	@oil_motor VARCHAR(100),
	@maintenance VARCHAR(100),
	@months_use INT,
	@mileage DECIMAL(10,2),
	@id_marca INT,
	@id_model INT,
	@CI_owner VARCHAR(100)
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

		--Logica del procedimiento incluyendo las validaciones 
		
		--VALIDAMOS QUE LA PLACA EXISTA 
		IF NOT EXISTS (SELECT 1 FROM ObtenerPorPlaca(@Plate))
			THROW 50001,'placa no registrada',1; 

		IF NOT EXISTS (SELECT 1 FROM ObtenerCliente(@CI_owner))
			THROW 50002,'Cliente no registrado',1;

		--actualizamos los valores que no sean nulos
		UPDATE Vehiculos 
		SET placa = ISNULL(@plate,placa),
			aceite_utilizado_caja = ISNULL(@oil_box,aceite_utilizado_caja),
			aceite_utilizado_motor = ISNULL(@oil_motor,aceite_utilizado_motor),
			resumen_mantenimiento = ISNULL(@maintenance,resumen_mantenimiento),
			meses_uso = ISNULL(@months_use,meses_uso),
			kilometraje = ISNULL(@mileage,kilometraje),
			id_modelo = ISNULL(@id_model,id_modelo),
			id_marca = ISNULL(@id_marca,id_marca),
			CI_dueño = ISNULL(@CI_owner,CI_dueño)
		WHERE 
			placa = @plate;

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