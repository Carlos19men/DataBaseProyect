
CREATE VIEW ObtenerVehiculos AS
SELECT codigo,placa,MM.nombre_marca marca, M.nombre NombreModelo,C.CI_cliente, C.nombre_cli nombre, C.apellido_cli apellido, V.aceite_utilizado_motor, V.aceite_utilizado_caja,V.meses_uso,V.kilometraje,V.resumen_mantenimiento
FROM Vehiculos V, Modelos M,Marcas MM,Clientes C
WHERE V.id_modelo = M.nro_modelo AND
	  V.id_marca = M.cod_marca AND 
	  V.id_marca = MM.cod_marca AND
	  V.CI_dueño = C.CI_cliente; 
GO 
