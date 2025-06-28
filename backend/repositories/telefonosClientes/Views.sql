use MU_DB;

--Telefono Clientes 

--creamos la vista 
CREATE VIEW GetAllTelefonosCliente AS
    SELECT A.CI_cliente as CI,apellido_cli as apellido,nombre_cli as nombre, numero as telefono FROM Clientes A,telefonosCliente B
    WHERE A.CI_cliente = B.CI_cliente;
GO
--SELECT * FROM GetAllTelefonosCliente ORDER BY apellido;

