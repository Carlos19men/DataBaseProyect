CREATE VIEW ObtenerMarcas AS
SELECT m.cod_marca cod_marca, m.nombre_marca, CantV.cant vehiculos,CantM.cant modelos 
FROM Marcas m LEFT JOIN (
				SELECT m.cod_marca as id, COUNT(mo.cod_marca) as cant
				FROM Marcas m, Modelos mo 
				WHERE m.cod_marca  = mo.cod_marca 
				GROUP BY
					m.cod_marca) as CantV
				ON m.cod_marca = CantV.id
				LEFT JOIN 
				 (SELECT m.cod_marca as id, COUNT(v.id_marca) as cant
					FROM Marcas m, Vehiculos v 
					WHERE m.cod_marca  = v.id_marca
					GROUP BY
						m.cod_marca) as CantM 
				ON m.cod_marca = CantM.id;
GO

