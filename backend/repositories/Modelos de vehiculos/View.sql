--procedures modelos 

--consultar todos los modelos 
CREATE VIEW ObtenerModelos AS
SELECT MA.nombre_marca Marca, MO.nombre modelo,aceite_caja,aceite_motor,octanaje,tipo_refrigerante,peso,descripcion,nro_puestos
FROM marcas MA, modelos MO
WHERE MA.cod_marca = MO.cod_marca;
go 


