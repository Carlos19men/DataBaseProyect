Create view ObtenerEmpleados as
select CI_emp, RIF_establecimiento, nombre, apellido
from Empleados;
go

create FUNCTION ObtenerEmpleado(
    @CI VARCHAR(50)
)
RETURNS TABLE
AS
RETURN (
    -- Get employee by CI
    SELECT CI_emp as CI, RIF_establecimiento, nombre, apellido
    FROM Empleados
    WHERE CI_emp = @CI
);

create proc EditarEmpleado
    @CI VARCHAR(50),
    @nombre VARCHAR(50),
    @apellido VARCHAR(50),
    @telefono VARCHAR(50),
    @direccion VARCHAR(100),
    @sueldo DECIMAL(10,2)
AS
BEGIN
    Set nocount on;
    
    Update Empleados 
    SET nombre = ISNULL(@nombre, nombre), 
        apellido = ISNULL(@apellido, apellido),
        telefono = ISNULL(@telefono, telefono), 
        direccion = ISNULL(@direccion, direccion), 
        sueldo = ISNULL(@sueldo, sueldo) 
    WHERE CI_emp = @CI;
END;

drop procedure EditarEmpleado;


create proc AgregarEmpleado
    @CI VARCHAR(50),
    @RIF_establecimiento VARCHAR(50),
    @nombre VARCHAR(50),
    @apellido VARCHAR(50),
    @telefono VARCHAR(50),
    @direccion VARCHAR(100),
    @sueldo DECIMAL(10,2)
AS
BEGIN
    Set nocount on;

    -- Se verifica si el usuario existe.
    IF EXISTS (SELECT 1 FROM Empleados WHERE CI_emp = @CI)
    BEGIN
        RAISERROR('El empleado ya existe.', 16, 1);
        RETURN;
    END

    -- Insert new employee
    INSERT INTO Empleados (CI_emp, RIF_establecimiento, nombre, apellido, telefono, direccion, sueldo)
    VALUES (@CI, @RIF_establecimiento, @nombre, @apellido, @telefono, @direccion, @sueldo);
END;
drop procedure AgregarEmpleado;