-- procedures proveedores
SELECT * FROM Proveedores ORDER BY razon_social; 

CREATE FUNCTION obtenerProvedorRIF(
@RIF varchar(100)
)
RETURNS TABLE 
AS
RETURN(
	SELECT * FROM Proveedores WHERE RIF = @RIF
);

--OBTENER PROVEEDOR OR ORDEN DE COMPRA 
