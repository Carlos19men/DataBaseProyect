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
	WHERE nro_OC = @numOC
);

-- funcion para obtener las ordenes de compras por establecimiento
CREATE FUNCTION ObtenerOrdenCompraPorFecha(
@RIF_Establecimiento int
)
RETURNS TABLE
AS
RETURN(
	SELECT nro_OC as NumeroOrdenCompra, fecha_compra, RIF_est as RIF_Establecimiento
	FROM OrdenesCompra
	WHERE RIF_est = @RIF_Establecimiento
);

-- Crear nueva orden de compra
CREATE PROCEDURE nuevaOrdenCompra(
    @fecha_compra DATE,
    @RIF_est VARCHAR(20),
    @RIF_proveedor VARCHAR(20),
    @id_producto INT,
    @cant_producto INT,
    @precio DECIMAL(10,2)
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @nuevoID INT;
    DECLARE @TranCounter INT;
    DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    BEGIN TRY
        SELECT @TranCounter = @@TRANCOUNT;

        IF @TranCounter = 0 
            BEGIN TRANSACTION;
        ELSE
            SAVE TRANSACTION SP_puntoControl;

        -- Verificar existencia de establecimiento
        IF NOT EXISTS (SELECT 1 FROM Establecimientos WHERE RIF = @RIF_est)
        BEGIN
            RAISERROR('El RIF de ese establecimiento no existe', 16, 1);
            RETURN;
        END

        INSERT INTO OrdenesCompra(fecha_compra, RIF_est)
        VALUES (@fecha_compra, @RIF_est);

        SET @nuevoID = SCOPE_IDENTITY();

        -- Verificar existencia de producto
        IF NOT EXISTS (SELECT 1 FROM Productos WHERE id_producto = @id_producto)
        BEGIN
            RAISERROR('El id del producto no existe', 16, 1);
            RETURN;
        END

        INSERT INTO Compras(nro_compra, id_producto, cantidad_producto, precio_und)
        VALUES (@nuevoID, @id_producto, @cant_producto, @precio);

        -- Verificar existencia de proveedor
        IF NOT EXISTS (SELECT 1 FROM Proveedores WHERE RIF = @RIF_proveedor)
        BEGIN
            RAISERROR('El proveedor no existe', 16, 1);
            RETURN;
        END

        INSERT INTO ProveedoresAsociados(RIF_proveedor, nro_orden)
        VALUES (@RIF_proveedor, @nuevoID);

        -- Hacer commit si se inició la transacción
        IF @TranCounter = 0
            COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        SELECT
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        IF @@TRANCOUNT > 0
        BEGIN
            IF @TranCounter = 0
                ROLLBACK TRANSACTION;
            ELSE IF XACT_STATE() = 1
                ROLLBACK TRANSACTION SP_puntoControl;
        END

        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END

-- procedimiento para eliminar una orden de compra
CREATE PROCEDURE eliminarOrdenCompra(@numOC INT)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TranCounter INT;
    DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    BEGIN TRY
        SELECT @TranCounter = @@TRANCOUNT;

        IF @TranCounter = 0 
            BEGIN TRANSACTION;
        ELSE
            SAVE TRANSACTION SP_puntoControl;

        -- Validar existencia
        IF EXISTS (SELECT 1 FROM OrdenesCompra WHERE nro_OC = @numOC)
        BEGIN
            DELETE FROM OrdenesCompra WHERE nro_OC = @numOC;
        END
        ELSE
        BEGIN
            -- Lanzar error solo si la orden no existe
            THROW 50001, 'La orden de compra no se encuentra registrada.', 1;
        END

        -- Confirmar cambios si corresponde
        IF @TranCounter = 0
            COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        SELECT
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        IF @@TRANCOUNT > 0
        BEGIN
            IF @TranCounter = 0
                ROLLBACK TRANSACTION;
            ELSE IF XACT_STATE() = 1
                ROLLBACK TRANSACTION SP_puntoControl;
        END

        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END

-- procedimiento para modificar orden de compra
CREATE PROCEDURE editarOrdenCompra (
	--declaracion de las variables
	@num_compra int,
	@fecha_compra date,
	@RIF_est varchar(20),
	@RIF_proveedor varchar(20),
	@id_producto int,
	@cant_producto int,
	@precio decimal(10,2)
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
		
		--Verificar si la orden de compra existe
		IF NOT EXISTS (SELECT * FROM ObtenerOrdenCompra(@num_compra))
		BEGIN 
			THROW 50001,'Este cliente no se encuentra registrado',1; 
		END;
		
		-- verificar y modificar campos
		IF (@fecha_compra IS NOT NULL)
		BEGIN 
			UPDATE OrdenesCompra SET fecha_compra = @fecha_compra WHERE nro_OC= @num_compra; 
			PRINT 'Fecha actualizada con exito';
		END; 
		
		IF (@RIF_est  IS NOT NULL)
		BEGIN 
			UPDATE OrdenesCompra SET RIF_est = @RIF_est  WHERE nro_OC= @num_compra; 
			PRINT 'RIF actualizada con exito';
		END; 
		
		IF (@RIF_proveedor IS NOT NULL)
		BEGIN 
			UPDATE ProveedoresAsociados SET RIF_proveedor = @RIF_proveedor  WHERE nro_orden = @num_compra AND RIF_proveedor = @RIF_proveedor; 
			PRINT 'Proveedor actualizado con exito';
		END; 
		
		IF (@cant_producto IS NOT NULL)
		BEGIN 
			UPDATE Compras SET cantidad_producto = @cant_producto  WHERE nro_compra  = @num_compra AND id_producto = @id_producto; 
			PRINT 'Cantidad de prooducto actualizada con exito';
		END;
		
		IF (@precio IS NOT NULL)
		BEGIN 
			UPDATE Compras SET precio_und = @precio WHERE nro_compra  = @num_compra AND id_producto = @id_producto; 
			PRINT 'Cantidad de prooducto actualizada con exito';
		END; 
		
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
END

SELECT * FROM OrdenesCompra;
SELECT * FROM Compras;
SELECT * FROM ProveedoresAsociados;

EXECUTE editarOrdenCompra
	@num_compra = 2,
	@fecha_compra = '2025-06-22',
	@RIF_est =  'J-11223344-5',
	@RIF_proveedor = 'J-50011223-5',
	@id_producto = 4,
	@cant_producto = 5,
	@precio = 10;

@fecha_compra date,
	@RIF_est varchar(20),
	@RIF_proveedor varchar(20),
	@id_producto int,
	@cant_producto int,
	@precio decimal(10,2)
	
	
	 	








