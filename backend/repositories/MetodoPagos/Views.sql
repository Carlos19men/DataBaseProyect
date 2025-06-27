USE MU_DB
GO
-- Obtener todos los metodos de pago
CREATE VIEW obtenerMetodosPago AS
SELECT M.id_pago as NumeroMetodoPago,M.tipo_moneda,M.monto_ef,M.fechaPago_Tar,M.tipo_tarjeta,M.banco,M.nro_tarjeta,M.monto_tar,M.referenciaPM,M.fecha_PM,M.monto_PM,M.telefono, F.nro_factura as FacturaCorrespondiente
FROM MetodosPago M
INNER JOIN PagosFactura F
ON M.id_pago = F.id_pago;
GO

/*
-- Todos los pagos
SELECT * FROM obtenerMetodosPago;

-- Pagos ordenados por factura
SELECT * FROM obtenerMetodosPago ORDER BY FacturaCorrespondiente;

*/