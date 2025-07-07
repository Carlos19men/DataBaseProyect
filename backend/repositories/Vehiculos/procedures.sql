USE MU_DB
GO

CREATE FUNCTION ObtenerPorPlaca(
	@placa VARCHAR(50)
)
RETURNS TABLE
AS
RETURN(
	SELECT * FROM ObtenerVehiculos WHERE placa = @placa
);

GO


--Crear un nuevo vehiculo 
IF (OBJECT_ID('dbo.nuevoVehiculo','P') IS NOT NULL)

	DROP PROCEDURE dbo.editarTelefono; 
	
GO

CREATE PROCEDURE nuevoVehiculo(
	@plate VARCHAR(100),
	@oil_box VARCHAR(100),
	@oil_motor VARCHAR(100),
	@maintenance VARCHAR(100),
	@months_use INT,
	@mileage DECIMAL(10,2),
	@id_marca INT,
	@id_model INT,
	@CI_owner VARCHAR(100)
	)
AS
BEGIN 		
		--VALIDAMOS QUE LA PLACA NO EXISTA 
		IF EXISTS (SELECT 1 FROM ObtenerPorPlaca(@plate))
			THROW 50001,'Esta placa ya se encuentra registrada',1; 

		--VALIDAMOS QUE EL CLIENTE EXISTA 
		IF NOT EXISTS (SELECT 1 FROM ObtenerCliente(@CI_owner))
			THROW 50002, 'Cliente no registrado',1; 
		
		--VALIDAMOS QUE EL MES Y EL KILOMETRAJE SEAN VALIDOS 
		IF @mileage < 0
			THROW 50003, 'Kilometraje menor que 0',1; 

		IF @months_use < 0
			THROW 50004,'meses de uso menores que 0',1; 

		--VALIDAMOS QUE EL MODELO CORRESPONDA CON LA MARCA 
		IF NOT EXISTS (SELECT 1 FROM Modelos WHERE cod_marca = @id_marca AND nro_modelo = @id_model)
			THROW 50005,'El modelo no corresponde con la marca',1; 

		--Insertamos los datos 
		INSERT INTO Vehiculos (placa, aceite_utilizado_motor,aceite_utilizado_caja,resumen_mantenimiento, meses_uso, kilometraje, id_modelo,id_marca,CI_dueño)
		VALUES (@plate, @oil_motor, @oil_box,@maintenance, @months_use, @mileage, @id_model,@id_marca,@CI_owner); 

END;
GO


CREATE PROCEDURE actualizarVehiculo(
	@plate VARCHAR(100),
	@oil_box VARCHAR(100),
	@oil_motor VARCHAR(100),
	@maintenance VARCHAR(100),
	@months_use INT,
	@mileage DECIMAL(10,2),
	@id_marca INT,
	@id_model INT,
	@CI_owner VARCHAR(100)
	)
AS
BEGIN 
		--VALIDAMOS QUE LA PLACA EXISTA 
		IF NOT EXISTS (SELECT 1 FROM ObtenerPorPlaca(@Plate))
			THROW 50001,'placa no registrada',1; 

		IF NOT EXISTS (SELECT 1 FROM ObtenerCliente(@CI_owner))
			THROW 50002,'Cliente no registrado',1;

		--actualizamos los valores que no sean nulos
		UPDATE Vehiculos 
		SET placa = ISNULL(@plate,placa),
			aceite_utilizado_caja = ISNULL(@oil_box,aceite_utilizado_caja),
			aceite_utilizado_motor = ISNULL(@oil_motor,aceite_utilizado_motor),
			resumen_mantenimiento = ISNULL(@maintenance,resumen_mantenimiento),
			meses_uso = ISNULL(@months_use,meses_uso),
			kilometraje = ISNULL(@mileage,kilometraje),
			id_modelo = ISNULL(@id_model,id_modelo),
			id_marca = ISNULL(@id_marca,id_marca),
			CI_dueño = ISNULL(@CI_owner,CI_dueño)
		WHERE 
			placa = @plate;

END;
GO