USE MU_DB;

 -- Crear tipos de tabla para manejar los datos complejos
CREATE TYPE ActividadOSType AS TABLE
(
    nro_servicio INT NOT NULL,
    nro_correlativo INT NOT NULL,
    CI_empAsig varchar(20) NOT NULL,
    id_producto INT NOT NULL,
    precio_producto DECIMAL(10,2) NOT NULL,
    precio_actividad DECIMAL(10,2) NOT NULL,
    cantidad INT NOT NULL
);
GO

CREATE PROCEDURE CrearOrdenServicioCompleta
	@RIF_establecimiento VARCHAR(20),
    @codigo_vehiculo INT,
    @fecha_entrada DATE,
    @hora_entrada TIME,
    @hora_estimada_salida TIME,
    @persona_autorizada VARCHAR(50) = NULL,
    @actividades ActividadOSType READONLY,
    @cod_OS INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @TranCounter INT = @@TRANCOUNT;
    DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;
    
    BEGIN TRY
        -- Iniciar transacción si no hay una activa
        IF @TranCounter = 0
            BEGIN TRANSACTION;
        ELSE
            SAVE TRANSACTION SP_CrearOrdenServicio;
        
        -- Validar que el vehículo existe
        IF NOT EXISTS (SELECT 1 FROM Vehiculos WHERE codigo = @codigo_vehiculo)
        BEGIN
            THROW 50004, 'El vehículo especificado no existe', 1;
        END;
        
        -- Validar que el establecimiento existe
        IF NOT EXISTS (SELECT 1 FROM Establecimientos WHERE RIF = @RIF_establecimiento)
        BEGIN
            THROW 50005, 'El establecimiento especificado no existe', 1;
        END;
        
        -- 1. Crear la Orden de Servicio
        INSERT INTO OrdenesServicio (
            fecha_entrada, 
            hora_entrada, 
            hora_estimada_salida, 
            hora_real_salida, 
            fecha_salida, 
            justificacion, 
            persona_autorizada, 
            codigo_vehiculo,
			RIF_establecimiento
        )
        VALUES (
            @fecha_entrada,
            @hora_entrada,
            @hora_estimada_salida,
            NULL, -- hora_real_salida se actualiza cuando se completa
            NULL, -- fecha_salida se actualiza cuando se completa
            NULL, -- justificacion
            @persona_autorizada, -- puede ser NULL
            @codigo_vehiculo,
            @RIF_establecimiento
        );
        
        -- Obtener el ID de la orden creada
        SET @cod_OS = SCOPE_IDENTITY();
        
        -- 2. Validar que todas las actividades existen
        IF EXISTS (
            SELECT 1 FROM @actividades a
            LEFT JOIN Actividades act ON a.nro_servicio = act.nro_servicio 
                AND a.nro_correlativo = act.nro_correlativo
            WHERE act.nro_servicio IS NULL
        )
        BEGIN
            THROW 50001, 'Una o más actividades especificadas no existen', 1;
        END;
        
        -- 3. Validar que todos los productos existen
        IF EXISTS (
            SELECT 1 FROM @actividades a
            LEFT JOIN Productos p ON a.id_producto = p.id_producto
            WHERE p.id_producto IS NULL
        )
        BEGIN
            THROW 50002, 'Uno o más productos especificados no existen', 1;
        END;
        
        -- 4. Insertar todas las actividades de la orden
        INSERT INTO ActividadesOS (
            cod_OS,
            nro_servicio,
			nro_correlativo,
			ci_empleado,
            id_producto,
            precio_producto,
            precio_actividad,
            cantidad
        )
        SELECT 
            @cod_OS,
            nro_servicio,
            nro_correlativo,
			CI_empAsig,
            id_producto,
            precio_producto,
            precio_actividad,
            cantidad
        FROM @actividades;
        
        -- 5. Actualizar inventario (reducir cantidades)
		UPDATE Inventario SET cantidad = Inv.cantidad - AcO.cantidad 
		FROM Inventario Inv INNER JOIN @actividades AcO ON
			Inv.id_producto = AcO.id_producto 
		WHERE
			Inv.RIF_establecimiento = @RIF_establecimiento; 

		--ESTO DEBE REGISTRARSE EN UN TRIGGER 
        
        -- Commit si esta transacción la inició este SP
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
            ELSE
                ROLLBACK TRANSACTION SP_CrearOrdenServicio;
        END;
        
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH;
END;
GO

CREATE PROCEDURE ActualizarOrdenServicio
    @cod_OS INT,
    @codigo_vehiculo INT = NULL,
    @fecha_entrada DATE = NULL,
    @hora_entrada TIME = NULL,
    @hora_estimada_salida TIME = NULL,
    @hora_real_salida TIME = NULL,
    @fecha_salida DATE = NULL,
    @justificacion VARCHAR(255) = NULL,
    @persona_autorizada VARCHAR(50) = NULL,
    @RIF_establecimiento VARCHAR(20) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;
    
    BEGIN TRY
        -- Verificar que la orden de servicio existe
        IF NOT EXISTS (SELECT 1 FROM OrdenesServicio WHERE cod_OS = @cod_OS)
        BEGIN
            THROW 50003, 'La orden de servicio especificada no existe', 1;
        END;
        
        -- Verificar que el vehículo existe si se proporciona
        IF @codigo_vehiculo IS NOT NULL AND NOT EXISTS (SELECT 1 FROM Vehiculos WHERE codigo = @codigo_vehiculo)
        BEGIN
            THROW 50004, 'El vehículo especificado no existe', 1;
        END;
        
        -- Verificar que el establecimiento existe si se proporciona
        IF @RIF_establecimiento IS NOT NULL AND NOT EXISTS (SELECT 1 FROM Establecimientos WHERE RIF = @RIF_establecimiento)
        BEGIN
            THROW 50005, 'El establecimiento especificado no existe', 1;
        END;
        
        -- Construir la consulta de actualización dinámicamente
        DECLARE @SQL NVARCHAR(MAX) = 'UPDATE OrdenesServicio SET ';
        DECLARE @Updates NVARCHAR(MAX) = '';
        
        IF @codigo_vehiculo IS NOT NULL
            SET @Updates = @Updates + 'codigo_vehiculo = @codigo_vehiculo, ';
            
        IF @fecha_entrada IS NOT NULL
            SET @Updates = @Updates + 'fecha_entrada = @fecha_entrada, ';
            
        IF @hora_entrada IS NOT NULL
            SET @Updates = @Updates + 'hora_entrada = @hora_entrada, ';
            
        IF @hora_estimada_salida IS NOT NULL
            SET @Updates = @Updates + 'hora_estimada_salida = @hora_estimada_salida, ';
            
        IF @hora_real_salida IS NOT NULL
            SET @Updates = @Updates + 'hora_real_salida = @hora_real_salida, ';
            
        IF @fecha_salida IS NOT NULL
            SET @Updates = @Updates + 'fecha_salida = @fecha_salida, ';
            
        IF @justificacion IS NOT NULL
            SET @Updates = @Updates + 'justificacion = @justificacion, ';
            
        IF @persona_autorizada IS NOT NULL
            SET @Updates = @Updates + 'persona_autorizada = @persona_autorizada, ';
            
        IF @RIF_establecimiento IS NOT NULL
            SET @Updates = @Updates + 'RIF_establecimiento = @RIF_establecimiento, ';
        
        -- Remover la última coma y espacio
        IF LEN(@Updates) > 0
            SET @Updates = LEFT(@Updates, LEN(@Updates) - 2);
        
        SET @SQL = @SQL + @Updates + ' WHERE cod_OS = @cod_OS';
        
        -- Ejecutar la actualización
        EXEC sp_executesql @SQL, 
            N'@cod_OS INT, @codigo_vehiculo INT, @fecha_entrada DATE, @hora_entrada TIME, 
              @hora_estimada_salida TIME, @hora_real_salida TIME, @fecha_salida DATE, 
              @justificacion VARCHAR(255), @persona_autorizada VARCHAR(50), @RIF_establecimiento VARCHAR(20)',
            @cod_OS, @codigo_vehiculo, @fecha_entrada, @hora_entrada, @hora_estimada_salida,
            @hora_real_salida, @fecha_salida, @justificacion, @persona_autorizada, @RIF_establecimiento;
            
    END TRY
    BEGIN CATCH
        SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();
        
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH;
END;
GO

