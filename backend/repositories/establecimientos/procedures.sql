CREATE VIEW obtenerEstablecimientos AS
SELECT ES.RIF, ES.nombre, ES.ciudad, CONCAT(EM.nombre,' ',EM.apellido) encargado,ES.CI_encargado, ES.fecha_encargado
FROM Establecimientos ES LEFT JOIN Empleados EM ON
ES.RIF = EM.RIF_establecimiento AND ES.CI_encargado = EM.CI_emp;
go

