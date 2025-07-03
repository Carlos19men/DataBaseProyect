USE MU_DB
GO

--ver todos los servicios ofrecidos 
CREATE VIEW ServiciosOfre AS
SELECT SO.nro_servicio nro_servicio, S.nombre_ser nombre_ser,E.RIF RIF, E.nombre 
FROM ServiciosOfrecidos SO,Servicios S,Establecimientos E
WHERE 
	SO.nro_servicio = S.nro_servicio AND
	SO.RIF_establecimiento = E.RIF;

CREATE FUNCTION ServicioEstablecimiento(
@rif VARCHAR(100),
@nro_ser int
)
RETURNS TABLE
AS
RETURN(
	SELECT nro_servicio,nombre_ser servicio FROM ServiciosOfre WHERE RIF = @rif AND nro_servicio = @nro_ser
);

--todos los servicios que son ofrecidos por lo menos por un establecimiento 
CREATE VIEW serviciosDisponibles AS
SELECT S.nro_servicio,S.nombre_ser  
FROM Servicios S RIGHT JOIN ServiciosOfre SO ON S.nro_servicio = SO.nro_servicio 
GROUP BY S.nro_servicio,S.nombre_ser;

CREATE FUNCTION serviciosNoDisponiblesRIF(
@rif varchar(100)
)
RETURNS TABLE
AS
RETURN 
(
	SELECT nro_servicio,nombre_ser servicio FROM ServiciosDisponibles WHERE nro_servicio NOT IN (SELECT nro_servicio FROM ServiciosOfrecidos WHERE RIF_establecimiento = @RIF)
);
