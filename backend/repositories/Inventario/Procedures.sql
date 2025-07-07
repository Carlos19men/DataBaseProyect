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
	INSERT INTO InventarioAuditable(RIF_Establecimiento, id_producto,fecha)
	SELECT i.RIF_establecimiento, i.id_producto, GETDATE()
	FROM inserted i
	INNER JOIN deleted d ON i.id_producto = d.id_producto
	WHERE i.cantidad < 20 AND d.cantidad >= 20;
END;
