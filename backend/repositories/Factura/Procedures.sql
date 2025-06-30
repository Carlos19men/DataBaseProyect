-- Procedimiento para calcular el descuento para un cliente dependiendo de la cantidad de servicios solicitados en los ultimos 3 meses
CREATE PROCEDURE CalcularDescuento(
	@ClienteID int,
	@Descuento decimal(10,3) OUTPUT

)
AS
BEGIN
	DECLARE @CantServicios int;

	-- Obtener la cantidad de servicios solicitados por un cliente
	SELECT @CantServicios = COUNT(*) 
	FROM Facturas F
	JOIN OrdenesServicio O ON F.cod_OS = O.cod_OS
	JOIN Vehiculos V ON O.codigo_vehiculo = V.codigo
	JOIN Clientes C ON V.CI_dueño = C.CI_cliente
	WHERE C.CI_cliente = @ClienteID AND F.fecha_emision  >= DATEADD(MONTH, -3, GETDATE());  
	
	IF @CantServicios >= 0 AND @CantServicios <= 2
		SET @Descuento = 0.05;
	ELSE
		IF @CantServicios >= 3 AND @CantServicios <= 6
			SET @Descuento = 0.1;
		ELSE 
			IF @CantServicios > 6
				SET @Descuento = 0.15;
END;

-- Funcion para calcular el monto total de una factura considerando el descuento
-- NOTA: Verificar si es necesario agregar el IVA a la funcion
CREATE FUNCTION CalcularMontoTotal (
    @Monto DECIMAL(10,2),
    @Descuento DECIMAL(10,3)
)
RETURNS DECIMAL(10,2)
AS
BEGIN
    RETURN @Monto - (@Monto * @Descuento);
END;

-- Funcion para obtener los datos del cliente
CREATE FUNCTION ObtenerDatosCliente(
	@cod_OS int
)
RETURNS TABLE
AS
RETURN(
	SELECT C.CI_cliente, C.nombre_cli, C.apellido_cli
	FROM Facturas F
	JOIN OrdenesServicio O ON F.cod_OS = O.cod_OS
	JOIN Vehiculos V ON O.codigo_vehiculo = V.codigo
	JOIN Clientes C ON V.CI_dueño = C.CI_cliente
	WHERE O.cod_OS = @cod_OS
);

-- Funcion para obtener los datos de la factura
CREATE FUNCTION ObtenerDatosFactura(
	@cod_OS int
)
RETURNS TABLE
AS
RETURN(
	SELECT F.nro_factura, F.fecha_emision
	FROM Facturas F
	JOIN OrdenesServicio O ON F.cod_OS = O.cod_OS
	WHERE O.cod_OS = @cod_OS
);

-- Funcion para obtener los datos del vehiculo
CREATE FUNCTION ObtenerDatosVehiculo(
	@cod_OS int
)
RETURNS TABLE
AS
RETURN(
	SELECT V.placa, V.codigo, O.fecha_entrada, O.fecha_salida
	FROM Facturas F
	JOIN OrdenesServicio O ON F.cod_OS = O.cod_OS
	JOIN Vehiculos V ON O.codigo_vehiculo = V.codigo
	WHERE O.cod_OS = @cod_OS
);


SELECT * FROM OrdenesServicio;

SELECT * FROM Clientes;

SELECT * FROM Servicios;