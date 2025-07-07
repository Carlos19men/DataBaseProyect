USE MU_DB
GO

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

GO

-- Funcion para calcular el monto total de una factura considerando el descuento
CREATE FUNCTION CalcularMontoTotal (
    @Monto DECIMAL(10,2),
    @Descuento DECIMAL(10,3),
    @IVA int
)
RETURNS DECIMAL(10,2)
AS
BEGIN
    RETURN @Monto - (@Monto * @Descuento) + ((@Monto - (@Monto * @Descuento))*@IVA) ;
END;

GO

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

GO

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

GO
-- Funcion para obtener los datos de los pagos
CREATE FUNCTION ObtenerDatosMontos(
	@cod_OS int
)
RETURNS TABLE
AS
RETURN(
	SELECT F.monto_total, F.iva, F.descuento
	FROM Facturas F
	JOIN OrdenesServicio O ON F.cod_OS = O.cod_OS
	WHERE O.cod_OS = @cod_OS
);
GO



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

GO

CREATE FUNCTION ObtenerDatosPago(
	@cod_OS int
)
RETURNS TABLE
AS
RETURN(
	SELECT 
	  CASE WHEN fechaPago_Tar IS NOT NULL THEN CAST(fechaPago_Tar AS varchar) ELSE NULL END AS FechaPago_Tar,
	  CASE WHEN tipo_tarjeta IS NOT NULL THEN tipo_tarjeta ELSE NULL END AS TipoTarjeta,
	  CASE WHEN banco IS NOT NULL THEN banco ELSE NULL END AS Banco,
	  CASE WHEN nro_tarjeta IS NOT NULL THEN nro_tarjeta ELSE NULL END AS NroTarjeta,
	  CASE WHEN monto_tar IS NOT NULL THEN CAST(monto_tar AS varchar) ELSE NULL END AS MontoTar,
	  CASE WHEN referenciaPM IS NOT NULL THEN referenciaPM ELSE NULL END AS ReferenciaPM,
	  CASE WHEN fecha_PM IS NOT NULL THEN CAST(fecha_PM AS varchar) ELSE NULL END AS FechaPM,
	  CASE WHEN monto_PM IS NOT NULL THEN CAST(monto_PM AS varchar) ELSE NULL END AS MontoPM,
	  CASE WHEN telefono IS NOT NULL THEN telefono ELSE NULL END AS Telefono
	FROM MetodosPago M, PagosFactura P, Facturas F
	WHERE M.id_pago = P.id_pago 
	AND P.nro_factura = F.nro_factura
	AND F.cod_OS = @cod_OS
);

GO



-- Funcion para obtener los datos correspondientes al establecimiento
CREATE FUNCTION ObtenerDatosEstablecimientos(
	@cod_OS int
)
RETURNS TABLE
AS RETURN(
	SELECT E.RIF, E.nombre, E.ciudad
	FROM Establecimientos E, OrdenesServicio O
	WHERE E.RIF = O.RIF_establecimiento
	AND O.cod_OS = @cod_OS
);

GO




-- Funcion correspondiente a la obtencion de todos los datos correspondiente a los servicios ofrecidos
CREATE FUNCTION ObtenerDatosServicios(
	@cod_OS int
)
RETURNS TABLE 
AS RETURN(
	SELECT S.nombre_ser, A.nombre as nombre_act, P.nombre as nombreProducto, AOS.precio_producto, AOS.cantidad, AOS.precio_actividad
	FROM ActividadesOS AOS, Actividades A, Servicios S, Productos P, Empleados E, OrdenesServicio O
	WHERE A.nro_servicio= AOS.nro_servicio
	AND AOS.nro_correlativo = A.nro_correlativo
	AND A.nro_servicio = S.nro_servicio
	AND AOS.id_producto = P.id_producto
	AND AOS.ci_empleado = E.CI_emp
	AND AOS.cod_OS = O.cod_OS
	AND AOS.cod_OS = @cod_OS
);



GO

CREATE PROCEDURE CrearFacturaDesdeOrdenServicio
    @cod_OS INT,
    @iva INT = 16,
    @fecha_emision DATE = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @monto_total DECIMAL(10,2) = 0;
    DECLARE @descuento DECIMAL(10,3) = 0;
    DECLARE @nro_factura INT;
    DECLARE @ClienteID INT;

    -- Obtener el CI_cliente a partir del cod_OS
    SELECT @ClienteID = V.CI_dueño
    FROM OrdenesServicio O
    JOIN Vehiculos V ON O.codigo_vehiculo = V.codigo
    WHERE O.cod_OS = @cod_OS;

    -- Calcular el descuento usando el procedimiento almacenado
    EXEC CalcularDescuento @ClienteID, @descuento OUTPUT;

    -- Calcular el monto total basado en las actividades de la orden de servicio
    SELECT @monto_total = SUM((precio_producto * cantidad) + precio_actividad)
    FROM ActividadesOS
    WHERE cod_OS = @cod_OS;

    IF @monto_total IS NULL OR @monto_total = 0
        SET @monto_total = 50.00;

    -- Aplicar descuento e IVA
    DECLARE @monto_con_descuento DECIMAL(10,2) = @monto_total - (@monto_total * @descuento);
    DECLARE @monto_final DECIMAL(10,2) = @monto_con_descuento + (@monto_con_descuento * (@iva / 100.0));

    IF @fecha_emision IS NULL
        SET @fecha_emision = GETDATE();

    -- Insertar la factura
    INSERT INTO Facturas (cod_OS, descuento, iva, monto_total, fecha_emision)
    VALUES (@cod_OS, @descuento, @iva, @monto_final, @fecha_emision);

    SET @nro_factura = SCOPE_IDENTITY();

    -- Retornar la información de la factura creada
    SELECT 
        @nro_factura AS nro_factura,
        @cod_OS AS cod_OS,
        @descuento AS descuento,
        @iva AS iva,
        @monto_final AS monto_total,
        @fecha_emision AS fecha_emision;
END;
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																