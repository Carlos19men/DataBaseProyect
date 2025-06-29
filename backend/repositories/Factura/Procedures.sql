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

CREATE FUNCTION CalcularMontoTotal (
    @Monto DECIMAL(10,2),
    @Descuento DECIMAL(10,3)
)
RETURNS DECIMAL(10,2)
AS
BEGIN
    RETURN @Monto - (@Monto * @Descuento);
END;




SELECT * FROM Clientes;

SELECT * FROM Servicios;