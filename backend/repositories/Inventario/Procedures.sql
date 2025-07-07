-- Crear tabla auditable
create table InventarioAuditable(
	id int identity not null,
	RIF_Establecimiento varchar(20) not null,
	id_producto int not null,
	fecha date not null,
	
	primary key(id)
)

DROP TABLE InventarioAuditable;

-- Crear trigger que verifica la cantidad en stock
CREATE TRIGGER StockBajo
ON Inventario
AFTER UPDATE
AS
BEGIN
	INSERT INTO InventarioAuditable(RIF_Establecimiento, id_producto, fecha)
	SELECT i.RIF_establecimiento, i.id_producto, GETDATE()
	FROM inserted i
	INNER JOIN deleted d ON i.id_producto = d.id_producto
	WHERE i.cantidad < 20 
	  AND d.cantidad >= 20
	  AND NOT EXISTS (
		SELECT 1 
		FROM InventarioAuditable ia
		WHERE ia.RIF_Establecimiento = i.RIF_establecimiento
		  AND ia.id_producto = i.id_producto
	  );
END;


CREATE TRIGGER EliminarAlertaInventario
ON Compras
AFTER INSERT
AS
BEGIN
    DELETE ia
    FROM InventarioAuditable ia
    INNER JOIN inserted i
        ON ia.id_producto = i.id_producto
        AND ia.RIF_Establecimiento = (
            SELECT oc.RIF_est
            FROM OrdenesCompra oc
            WHERE oc.nro_OC = i.nro_compra
        )
END;
