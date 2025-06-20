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

