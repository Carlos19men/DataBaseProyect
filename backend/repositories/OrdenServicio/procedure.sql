USE MU_DB;

 -- Crear tipos de tabla para manejar los datos complejos
CREATE TYPE dbo.ActividadOSType AS TABLE
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

CREATE PROCEDURE dbo.CrearOrdenServicioCompleta
	@RIF_establecimiento VARCHAR(20),
    @codigo_vehiculo INT,
    @fecha_entrada DATE,
    @hora_entrada TIME,
    @hora_estimada_salida TIME,
    @persona_autorizada VARCHAR(50),
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
        
        -- 1. Crear la Orden de Servicio
        INSERT INTO OrdenesServicio (
            fecha_entrada, 
            hora_entrada, 
            hora_estimada_salida, 
            hora_real_salida, 
            fecha_salida, 
            justificacion, 
            persona_autorizada, 
            codigo_vehiculo
        )
        VALUES (
            @fecha_entrada,
            @hora_entrada,
            @hora_estimada_salida,
            NULL, -- hora_real_salida se actualiza cuando se completa
            NULL, -- fecha_salida se actualiza cuando se completa
            NULL, -- justificacion
            @persona_autorizada,
            @codigo_vehiculo
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
		UPDATE Almacena SET cantidad = Alm.cantidad - AcO.cantidad 
		FROM Almacena Alm INNER JOIN @actividades AcO ON
			Alm.id_producto = AcO.id_producto 
		WHERE
			Alm.RIF_establecimiento = @RIF_establecimiento; 

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