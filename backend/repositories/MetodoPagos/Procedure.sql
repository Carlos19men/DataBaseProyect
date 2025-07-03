USE MU_DB;
GO
-- funcion para obtener un metodo de pago por pu id
CREATE FUNCTION ObtenerMetodoPago(
	@id_pago varchar(15)  --parametro
)
RETURNS TABLE
AS
RETURN(
	SELECT id_pago as NumeroMetodoPago,tipo_moneda,monto_ef,fechaPago_Tar,tipo_tarjeta,banco,nro_tarjeta,monto_tar,referenciaPM,fecha_PM,monto_PM,telefono
	FROM MetodosPago
	WHERE id_pago = @id_pago
);
GO

-- funcion para obtener pagos por clientes
CREATE FUNCTION ObtenerMetodoPagoPorCliente(
	@id_cliente int  --parametro
)
RETURNS TABLE
AS
RETURN(
	SELECT C.nombre_cli,C.CI_cliente,M.id_pago as NumeroMetodoPago,M.tipo_moneda,M.monto_ef,M.fechaPago_Tar,M.tipo_tarjeta,M.banco,M.nro_tarjeta,M.monto_tar,M.referenciaPM,M.fecha_PM,M.monto_PM,M.telefono, F.nro_factura as FacturaCorrespondiente
	FROM Clientes C
	JOIN Vehiculos V ON C.CI_cliente = V.CI_dueño
	JOIN OrdenesServicio OS ON V.codigo = OS.codigo_vehiculo
    JOIN Facturas F ON OS.cod_OS = F.cod_OS
    JOIN PagosFactura PF ON F.nro_factura = PF.nro_factura
    JOIN MetodosPago M ON PF.id_pago = M.id_pago
    WHERE C.CI_cliente = @id_cliente
);
GO


CREATE PROCEDURE nuevaMetodoPago(
	@tipo_moneda varchar(40),
	@monto_ef decimal(10,2),
	@fechaPago_Tar date,
	@tipo_tarjeta varchar(40),
	@banco varchar(30),
	@nro_tarjeta varchar(30),
	@monto_tar decimal(10,2),
	@referenciaPM varchar(30),
	@fecha_PM date,
	@monto_PM decimal(10,2),
	@telefono varchar(15)
)
AS
BEGIN  
	INSERT INTO MetodosPago(tipo_moneda,monto_ef,fechaPago_Tar,tipo_tarjeta,banco,nro_tarjeta,monto_tar,referenciaPM,fecha_PM,monto_PM,telefono)
	VALUES (@tipo_moneda,@monto_ef,@fechaPago_Tar,@tipo_tarjeta,@banco,@nro_tarjeta,@monto_tar,@referenciaPM,@fecha_PM,@monto_PM,@telefono);
END;
go
-- procedimiento para modificar un metodo de pago
CREATE PROCEDURE editarMetodoPago (
	@id_pago int,
	@tipo_moneda varchar(40),
	@monto_ef decimal(10,2),
	@fechaPago_Tar date,
	@tipo_tarjeta varchar(40),
	@banco varchar(30),
	@nro_tarjeta varchar(30),
	@monto_tar decimal(10,2),
	@referenciaPM varchar(30),
	@fecha_PM date,
	@monto_PM decimal(10,2),
	@telefono varchar(15)
)
AS
BEGIN
	-- verificar y modificar campos 
	UPDATE MetodosPago SET tipo_moneda = @tipo_moneda WHERE id_pago = @id_pago; 
	PRINT 'Tipo de moneda actualizada con exito';
	
	UPDATE MetodosPago SET monto_ef = @monto_ef  WHERE id_pago = @id_pago; 
	PRINT 'Monto actualizado con exito';
	
	UPDATE MetodosPago SET fechaPago_Tar = @fechaPago_Tar  WHERE id_pago = @id_pago; 
	PRINT 'Fecha de pago actualizada con exito';
	
	UPDATE MetodosPago SET tipo_tarjeta = @tipo_tarjeta WHERE id_pago = @id_pago; 
	PRINT 'Tipo de tarjeta actualizada con exito';
		
	UPDATE MetodosPago SET banco = @banco WHERE id_pago = @id_pago; 
	PRINT 'Banco actualizado con exito';
	
	UPDATE MetodosPago SET nro_tarjeta = @nro_tarjeta WHERE id_pago = @id_pago; 
	PRINT 'Numero de tarjeta actualizada con exito';

	UPDATE MetodosPago SET monto_tar = @monto_tar WHERE id_pago = @id_pago; 
	PRINT 'Monto de tarjeta actualizada con exito';
	
	UPDATE MetodosPago SET referenciaPM = @referenciaPM WHERE id_pago = @id_pago; 
	PRINT 'Referencia de tarjeta actualizada con exito';
	
	UPDATE MetodosPago SET fecha_PM = @fecha_PM WHERE id_pago = @id_pago; 
	PRINT 'Fecha Pago Movil actualizada con exito';
	
	UPDATE MetodosPago SET monto_PM = @monto_PM WHERE id_pago = @id_pago; 
	PRINT 'Monto Pago Movil actualizada con exito';
	
	UPDATE MetodosPago SET telefono = @telefono WHERE id_pago = @id_pago; 
	PRINT 'Telefono Pago Movil actualizada con exito';
END;
