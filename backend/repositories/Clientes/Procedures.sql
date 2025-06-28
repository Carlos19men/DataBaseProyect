USE MU_DB; 
GO

IF OBJECT_ID('ObtenerCliente','F') IS NOT NULL
	DROP FUNCTION ObtenerCliente
GO

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