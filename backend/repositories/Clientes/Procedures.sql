USE MU_DB; 
GO

IF OBJECT_ID('ObtenerCliente','F') IS NOT NULL
	DROP FUNCTION dbo.ObtenerCliente
GO

--función para retornar obtener cliente por la cedula 
CREATE FUNCTION ObtenerCliente(
	@CI VARCHAR(50)
)
RETURNS TABLE
AS
RETURN(
	--GET customer by CI
	SELECT *
	FROM ObtenerClientes 
	WHERE CI = @CI
);
GO

--nuevo cliente 
IF OBJECT_ID('editaCliente', 'P') IS NOT NULL
    DROP PROCEDURE dbo.editarCliente;
GO

--editar cliente 
CREATE PROCEDURE editarCliente 
	@CI varchar(50),
	@nombre varchar(50),
	@apellido varchar(50),
	@email varchar(50)
AS
BEGIN 
		UPDATE Clientes SET
		nombre_cli=ISNULL(@nombre,nombre_cli),
		apellido_cli=ISNULL(@apellido,apellido_cli),
		email=ISNULL(@email,email)
		WHERE
		CI_cliente = @CI;
END;
GO

--Nuevo cliente 
IF OBJECT_ID('nuevoCliente','P') IS NOT NULL
    DROP PROCEDURE dbo.nuevoCliente
GO

CREATE PROCEDURE nuevoCliente
    @CI varchar(50),
    @nombre varchar(50),
    @apellido varchar(50),
    @email varchar(50), -- Se añadió la coma aquí
    @tel1 varchar(50),
    @tel2 varchar(50)
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
            SAVE TRANSACTION SP_nuevoCliente; -- Se cambió el nombre del savepoint por consistencia

	--INSERTAMOS EL NUEVO CLIENTE 
	INSERT INTO Clientes (CI_cliente,nombre_cli,apellido_cli,email) VALUES 
	(@CI,@nombre,@apellido,@email); 

	--INSERTAMOS LOS TELEFONOS
	INSERT INTO telefonosCliente (numero,CI_cliente) VALUES
	(@tel1,@CI),
	(@tel2,@CI);

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
                ROLLBACK TRANSACTION SP_nuevoCliente; -- Se cambió el nombre del savepoint por consistencia
        END;

        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH;
END;
GO
