use MU_DB
GO

CREATE VIEW ObtenerClientes AS
SELECT cli.CI_cliente as CI, CONCAT(nombre_cli,' ',apellido_cli) cliente, email as correo,tel1.numero telefono1, tel2.numero telefono2  
FROM Clientes cli, (SELECT CI_cliente,numero FROM telefonosCliente) AS tel1,(SELECT CI_cliente,numero FROM telefonosCliente) AS tel2
WHERE cli.CI_cliente = tel1.CI_cliente AND
	  cli.Ci_cliente = tel2.CI_cliente AND
	  tel1.numero <> tel2.numero; 
go
