create VIEW InfoPagos_Efectivo AS
SELECT id_pago, tipo_moneda, monto_ef
from MetodosPago
where monto_ef is not NULL;
GO

create VIEW InfoPagos_Tarjeta AS
SELECT id_pago, tipo_moneda, tipo_tarjeta, banco, nro_tarjeta, monto_tar
from MetodosPago
where tipo_tarjeta is not NULL;
GO

create VIEW InfoPagos_PagoMovil AS
Select id_pago, tipo_moneda, referenciaPM, fecha_PM, monto_pm
from MetodosPago
where referenciaPM is not NULL;
GO
