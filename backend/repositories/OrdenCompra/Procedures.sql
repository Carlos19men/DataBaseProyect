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
GO

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

		--Agreamos la orden de compra 
        INSERT INTO OrdenesCompra(fecha_compra, RIF_est)
        VALUES (@fecha_compra, @RIF_est);

        SET @nuevoID = SCOPE_IDENTITY();

        -- Verificar existencia de producto
        IF NOT EXISTS (SELECT 1 FROM Productos WHERE id_producto = @id_producto)
        BEGIN
            RAISERROR('El id del producto no existe', 16, 1);
            RETURN;
        END

		--Registramos la compra 
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
GO

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
END
GO


	 	








