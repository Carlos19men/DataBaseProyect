--procedures modelos 
use MU_DB
Go
--consultar todos los modelos 
CREATE VIEW ObtenerModelos AS
SELECT MA.cod_marca cod_marca,MA.nombre_marca marca,MO.nro_modelo cod_modelo, MO.nombre modelo,aceite_caja,aceite_motor,octanaje,tipo_refrigerante,peso,descripcion,nro_puestos
FROM marcas MA, modelos MO
WHERE MA.cod_marca = MO.cod_marca;
go 



