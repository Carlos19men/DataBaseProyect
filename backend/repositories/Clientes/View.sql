use MU_DB
GO

--Obtener todos los clientes 
CREATE VIEW ObtenerClientes AS
SELECT CI_cliente as CI, apellido_cli as apellido, nombre_cli as nombre, email as correo FROM Clientes; 
go

/*DROP VIEW ObtenerClientes; 

select * from ObtenerClientes ORDER BY apellido;

*/