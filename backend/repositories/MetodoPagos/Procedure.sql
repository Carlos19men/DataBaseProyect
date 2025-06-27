use MU_DB;

-- funcion para obtener un metodo de pago por pu id
CREATE FUNCTION ObtenerMetodoPago(
	@id_pago varchar(15)  --parametro
)
RETURNS TABLE
AS
RETURN(
	SELECT id_pago as NumeroMetodoPago,tipo_moneda,monto_ef,fechaPago_Tar,tipo_tarjeta,banco,nro_tarjeta,monto_tar,referenciaPM,fecha_PM,monto_PM,telefono
	FROM MetodosPago
	WHERE id_pago = @id_pago
);

-- funcion para obtener pagos por clientes
CREATE FUNCTION ObtenerMetodoPagoPorCliente(
	@id_cliente int  --parametro
)
RETURNS TABLE
AS
RETURN(
	SELECT C.nombre_cli,C.CI_cliente,M.id_pago as NumeroMetodoPago,M.tipo_moneda,M.monto_ef,M.fechaPago_Tar,M.tipo_tarjeta,M.banco,M.nro_tarjeta,M.monto_tar,M.referenciaPM,M.fecha_PM,M.monto_PM,M.telefono, F.nro_factura as FacturaCorrespondiente
	FROM Clientes C
	JOIN Vehiculos V ON C.CI_cliente = V.CI_dueño
	JOIN OrdenesServicio OS ON V.codigo = OS.codigo_vehiculo
    JOIN Facturas F ON OS.cod_OS = F.cod_OS
    JOIN PagosFactura PF ON F.nro_factura = PF.nro_factura
    JOIN MetodosPago M ON PF.id_pago = M.id_pago
    WHERE C.CI_cliente = @id_cliente
);

CREATE PROCEDURE nuevaMetodoPago(
	@tipo_moneda varchar(40),
	@monto_ef decimal(10,2),
	@fechaPago_Tar date,
	@tipo_tarjeta varchar(40),
	@banco varchar(30),
	@nro_tarjeta varchar(30),
	@monto_tar decimal(10,2),
	@referenciaPM varchar(30),
	@fecha_PM date,
	@monto_PM decimal(10,2),
	@telefono varchar(15)
)
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

        INSERT INTO MetodosPago(tipo_moneda,monto_ef,fechaPago_Tar,tipo_tarjeta,banco,nro_tarjeta,monto_tar,referenciaPM,fecha_PM,monto_PM,telefono)
        VALUES (@tipo_moneda,@monto_ef,@fechaPago_Tar,@tipo_tarjeta,@banco,@nro_tarjeta,@monto_tar,@referenciaPM,@fecha_PM,@monto_PM,@telefono);

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
END;

CREATE PROCEDURE eliminarMetodoPago(@id_pago int)
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
        IF EXISTS (SELECT 1 FROM MetodosPago WHERE id_pago = @id_pago)
        BEGIN
            DELETE FROM MetodosPago WHERE id_pago = @id_pago;
        END
        ELSE
        BEGIN
            -- Lanzar error solo si la orden no existe
            THROW 50001, 'El metodo de pago no se encuentra registrado.', 1;
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
END;

-- procedimiento para modificar un metodo de pago
CREATE PROCEDURE editarMetodoPago (
	@id_pago int,
	@tipo_moneda varchar(40),
	@monto_ef decimal(10,2),
	@fechaPago_Tar date,
	@tipo_tarjeta varchar(40),
	@banco varchar(30),
	@nro_tarjeta varchar(30),
	@monto_tar decimal(10,2),
	@referenciaPM varchar(30),
	@fecha_PM date,
	@monto_PM decimal(10,2),
	@telefono varchar(15)
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
		
		--Verificar si el pago existe
		IF NOT EXISTS (SELECT * FROM ObtenerMetodoPago(@id_pago))
		BEGIN 
			THROW 50001,'Este pago no se encuentra registrado',1; 
		END;
		
		-- verificar y modificar campos 
		UPDATE MetodosPago SET tipo_moneda = @tipo_moneda WHERE id_pago = @id_pago; 
		PRINT 'Tipo de moneda actualizada con exito';
		
		UPDATE MetodosPago SET monto_ef = @monto_ef  WHERE id_pago = @id_pago; 
		PRINT 'Monto actualizado con exito';
		
		UPDATE MetodosPago SET fechaPago_Tar = @fechaPago_Tar  WHERE id_pago = @id_pago; 
		PRINT 'Fecha de pago actualizada con exito';
		
		UPDATE MetodosPago SET tipo_tarjeta = @tipo_tarjeta WHERE id_pago = @id_pago; 
		PRINT 'Tipo de tarjeta actualizada con exito';
		 
		UPDATE MetodosPago SET banco = @banco WHERE id_pago = @id_pago; 
		PRINT 'Banco actualizado con exito';
		
		UPDATE MetodosPago SET nro_tarjeta = @nro_tarjeta WHERE id_pago = @id_pago; 
		PRINT 'Numero de tarjeta actualizada con exito';
	
		UPDATE MetodosPago SET monto_tar = @monto_tar WHERE id_pago = @id_pago; 
		PRINT 'Monto de tarjeta actualizada con exito';
		
		UPDATE MetodosPago SET referenciaPM = @referenciaPM WHERE id_pago = @id_pago; 
		PRINT 'Referencia de tarjeta actualizada con exito';
		
		UPDATE MetodosPago SET fecha_PM = @fecha_PM WHERE id_pago = @id_pago; 
		PRINT 'Fecha Pago Movil actualizada con exito';
		
		UPDATE MetodosPago SET monto_PM = @monto_PM WHERE id_pago = @id_pago; 
		PRINT 'Monto Pago Movil actualizada con exito';
		
		UPDATE MetodosPago SET telefono = @telefono WHERE id_pago = @id_pago; 
		PRINT 'Telefono Pago Movil actualizada con exito';
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


SELECT * FROM MetodosPago;

DROP PROCEDURE eliminarMetodoPago;

EXEC nuevaMetodoPago
    @tipo_moneda = 'DOLARES',
    @monto_ef = 120.50,
    @fechaPago_Tar = '2025-06-22',
    @tipo_tarjeta = 'VISA',
    @banco = 'Banco Nacional',
    @nro_tarjeta = '4111111111111111',
    @monto_tar = 250.75,
    @referenciaPM = 'PM12345678',
    @fecha_PM = '2025-06-20',
    @monto_PM = 300.00,
    @telefono = '04121234567';

EXEC eliminarMetodoPago
	@id_pago = 1;