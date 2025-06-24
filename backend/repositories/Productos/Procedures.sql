

CREATE VIEW ObtenerProductos AS
SELECT id_producto,A.nombre nombreProducto, tipo, precio,descripcion, minimo cantidadMinima, maximo cantidadMaxima,tratamiento_residuos, nivel_contaminacion, B.nombre Familia
FROM Productos A, FamiliaProductos B WHERE A.id_familia = B.id_familia ; 



CREATE FUNCTION	ObtenerProducto(
@ID int
)
RETURNS TABLE
AS
RETURN(
	SELECT * FROM ObtenerProductos WHERE id_producto = @ID
);
 

CREATE PROCEDURE editarProducto
@ID int,
@nombre varchar(100),
@tipo varchar(100),
@precio DECIMAL(10,2),
@descripcion varchar(255),
@minimo int,
@maximo int,
@nivel_contaminacion int,
@inf_manejo varchar(100),
@id_familia int
AS
BEGIN 
		--LOGICA DEL PROCEDIMIENTO 
		

		--VALIDAMOS QUE EL ID EXSITA 
		IF NOT EXISTS (SELECT 1 FROM ObtenerProductos WHERE id_producto =  @ID)
			THROW 50001,'Producto no registrado',1; 

		--SI EXISTE LO EDITAMOS 
		UPDATE Productos 
		SET nombre = ISNULL(@nombre,nombre),
		tipo = ISNULL(@tipo,tipo),
		precio = ISNULL(@precio,precio),
		descripcion = ISNULL(@descripcion,descripcion),
	    minimo = ISNULL(@minimo,minimo),
		maximo = ISNULL(@maximo,maximo),
		nivel_contaminacion = ISNULL(@nivel_contaminacion,nivel_contaminacion),
		info_manejo = ISNULL(@inf_manejo,info_manejo),
		id_familia = ISNULL(@id_familia,id_familia)				 
		WHERE id_producto = @ID; 
END;
GO

--borrar producto 
CREATE PROCEDURE eliminarProducto 
	@id int
AS
BEGIN 
	IF NOT EXISTS (SELECT 1 FROM Productos WHERE id_producto = @id)
		THROW 50001,'Este id de producto no está registrado',1; 

	--si todo va bien lo eliminamo 
	DELETE Productos WHERE id_producto = @id; 

	PRINT 'producto eliminado con exito'

END; 

--nuevo producto 
CREATE PROCEDURE nuevoProducto
@nombre varchar(100),
@tipo varchar(100),
@precio DECIMAL(10,2),
@descripcion varchar(255),
@minimo int,
@maximo int,
@nivel_contaminacion int,
@inf_manejo varchar(100),
@id_familia int
AS
BEGIN
	
	INSERT INTO Productos (nombre,tipo, descripcion,minimo,maximo,tratamiento_residuos,nivel_contaminacion,info_manejo,id_familia)
	VALUES 
		(@nombre,@tipo,@precio, @descripcion, @minimo, @maximo, @nivel_contaminacion,@inf_manejo, @id_familia);

END; 
