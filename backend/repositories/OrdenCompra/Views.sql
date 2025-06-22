-- Obtener todas las ordenes de compra
CREATE VIEW obtenerOrdenesCompras AS
SELECT nro_OC as NumOrdenCompra,fecha_compra, RIF_est as RIF_Establecimiento
FROM OrdenesCompras;

-- Obtener fechas de compras ordenadas por fecha
SELECT * FROM obtenerOrdenesCompras ORDER BY fecha_compra;