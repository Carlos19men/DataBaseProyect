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

    If @nombre is not null
        Update Empleados set nombre = @nombre where CI_emp = @CI;
    
    If @apellido is not null
        Update Empleados set apellido = @apellido where CI_emp = @CI;
    
    If @telefono is not null
        Update Empleados set telefono = @telefono where CI_emp = @CI;
    
    If @direccion is not null
        Update Empleados set direccion = @direccion where CI_emp = @CI;
    
    If @sueldo is not null
        Update Empleados set sueldo = @sueldo where CI_emp = @CI;   
END;

drop procedure EditarEmpleado;