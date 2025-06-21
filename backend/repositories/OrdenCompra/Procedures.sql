USE MU_DB; 

-- funcion para obtener una orden de compra por pu id
CREATE FUNCTION ObtenerOrdenCompra(
	@numOC int  --parametro
)
RETURNS TABLE
AS
RETURN(
	SELECT nro_OC as NumeroOrdenCompra, fecha_compra, RIF_est as RIF_Establecimiento
	FROM OrdenesCompra
	WHERE nro_OC = @numOC;
);

-- funcion para obtener las ordenes de compras por establecimiento
CREATE FUNCTION ObtenerOrdenCompraPorFecha(@RIF_Establecimiento)
RETURNS TABLE
AS
RETURN(
	SELECT nro_OC as NumeroOrdenCompra, fecha_compra, RIF_est as RIF_Establecimiento
	FROM OrdenesCompra
	WHERE RIF_est = @RIF_Establecimiento;
);


-- Crear nueva orden de compra
CREATE PROCEDURE nuevaOrdenCompra
	--declaracion de las variables
	@fecha_compra date,
	@RIF_est varchar(20),
	@RIF_proveedor varchar(20),
	@id_producto int,
	@cant_producto int,
	@precio decimal(10,2),
	@nuevoID int
	
AS
BEGIN
	-- Configuracion Inicial
	SET NOCOUNT ON; -- Suprimimos los mensajes de filas afectadas

	-- Declaramos las variables de control de transacción
	-- NVARCHAR(4000) es más común para mensajes de error, 400 es muy corto
	DECLARE @TranCounter INT;
	DECLARE @ErrorMessage NVARCHAR(4000);
	DECLARE @ErrorSeverity INT;
	DECLARE @ErrorState INT;
	
	BEGIN TRY
		SELECT @TranCounter = @@TRANCOUNT;
	
		IF @TranCounter = 0 -- Si @@TRANCOUNT es 0, este SP inicia una nueva transacción
			BEGIN TRANSACTION;
		ELSE
			-- Si @@TRANCOUNT > 0, es porque ya estamos dentro de una transacción y creamos un SAVEPOINT
			-- El nombre del SAVEPOINT debe ser usado consistentemente en el CATCH.
			SAVE TRANSACTION SP_puntoControl;
		
		--LOGICA DEL PROCEDIMIENTO 
		
		--crear orden de compra
		IF (EXISTS 1 FROM Establecimientos WHERE RIF = @RIF_establecimiento)
		BEGIN
			INSERT INTO OrdenesCompra(fecha_compra,RIF_est) VALUES(@fecha_compra,@RIF_est);  --crear orden de compra
			SET @nuevoID = SCOPE_IDENTITY();  --obtener ID que se acaba de crear
		END
		ELSE
		BEGIN
			RAISERROR('El RIF de ese establecimiento no existe', 16, 10);  --16: nivel de gravedad, 10: numero del modelo para ser identificado 
		END
		
		IF (EXISTS  1 FROM OrdenesCompra WHERE nro_OC = @nuevoID)
		BEGIN
			--Registar Compra
			IF (EXISTS 1 FROM Productos WHERE id_producto = @id_producto)
			BEGIN
				INSERT INTO Compras(nro_ordencompra, id_producto, cantidad_producto, precio_und) VALUES (@nuevoID,@id_producto,@cant_producto, @precio);
			END
			ELSE
			BEGIN
				RAISERROR('El id del producto no existe', 16, 10);  --16: nivel de gravedad, 10: numero del modelo para ser identificado 
			END
			-- Registrar Proveedor Asociado
			IF (EXISTS 1 FROM Proveedores WHERE RIF = @RIF_proveedor)
			BEGIN
				INSERT INTO ProveedoresAsociados(RIF_proveedor,nro_orden ) VALUES (@RIF_proveedor,@nuevoID);
			END
			ELSE
			BEGIN
				RAISERROR('El proveedor no existe', 16, 10);  --16: nivel de gravedad, 10: numero del modelo para ser identificado 
			END
		END
		ELSE
		BEGIN
			RAISERROR('La orden de compra no existe', 16, 10);  --16: nivel de gravedad, 10: numero del modelo para ser identificado 
		END
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
	END CATCH
END

-- procedimiento para eliminar una orden de compra
CREATE PROCEDURE eliminarOrdenCompra(@numOC int) AS
BEGIN
	-- Configuracion Inicial
	SET NOCOUNT ON; -- Suprimimos los mensajes de filas afectadas

	-- Declaramos las variables de control de transacción
	-- NVARCHAR(4000) es más común para mensajes de error, 400 es muy corto
	DECLARE @TranCounter INT;
	DECLARE @ErrorMessage NVARCHAR(4000);
	DECLARE @ErrorSeverity INT;
	DECLARE @ErrorState INT;
	
	BEGIN TRY
		SELECT @TranCounter = @@TRANCOUNT;
	
		IF @TranCounter = 0 -- Si @@TRANCOUNT es 0, este SP inicia una nueva transacción
			BEGIN TRANSACTION;
		ELSE
			-- Si @@TRANCOUNT > 0, es porque ya estamos dentro de una transacción y creamos un SAVEPOINT
			-- El nombre del SAVEPOINT debe ser usado consistentemente en el CATCH.
			SAVE TRANSACTION SP_puntoControl;
		
		--LOGICA DEL PROCEDIMIENTO 
		IF EXISTS (SELECT * FROM ObtenerOrdenCompra(@numOC))
		BEGIN
			--SI EXISTE LO BORRAMOS 
			DELETE OrdenesCompra WHERE nro_OC = @numOC;
		END; 

		THROW 50001,'Este cliente no se encuentra registrado',1;
		
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
	END CATCH
END

