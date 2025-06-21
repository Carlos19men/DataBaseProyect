USE MU_DB; 


--Obtener todos los clientes 
CREATE VIEW ObtenerClientes AS
SELECT CI_cliente as CI, apellido_cli as apellido, nombre_cli as nombre, email as correo FROM Clientes; 
go

DROP VIEW ObtenerClientes; 

select * from ObtenerClientes ORDER BY apellido;


--función para retornar obtener cliente por la cedula 
CREATE FUNCTION ObtenerCliente(
	@CI VARCHAR(50)
)
RETURNS TABLE
AS
RETURN(
	--GET customer by CI
	SELECT CI_cliente as CI, apellido_cli as apellido, nombre_cli as nombre, email as correo 
	FROM Clientes
	WHERE CI_cliente = @CI
);

--nuevo cliente 

IF OBJECT_ID('dbo.nuevoCliente', 'P') IS NOT NULL
    DROP PROCEDURE dbo.registrarTelefonos;
GO


CREATE PROCEDURE nuevoCliente
	@CI varchar(50),
	@nombre varchar(100),
	@apellido varchar(100),
	@email varchar(100)
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
		
		--validamos que la cedulta no esté registrada 
		IF EXISTS (SELECT 1 FROM Clientes WHERE CI_cliente = @CI)
		BEGIN 
			THROW 50001,'Esta cedula ya se encuentra registrada',1; 
		END; 


		--REGISTRAMOS EL NUEVO CLIENTE 
		INSERT INTO Clientes (CI_cliente, nombre_cli, apellido_cli, email) VALUES (@CI, @nombre, @apellido, @email); 
		
		
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


