USE MU_DB
GO

-- Obtener todas las ordenes de compra
CREATE VIEW obtenerOrdenesCompras AS
SELECT nro_OC as NumOrdenCompra,fecha_compra, RIF_est as RIF_Establecimiento, monto_total monto
FROM OrdenesCompra;
GO 
