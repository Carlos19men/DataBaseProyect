USE MU_DB; 

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
	END
END
