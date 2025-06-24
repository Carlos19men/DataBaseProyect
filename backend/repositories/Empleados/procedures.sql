Create view ObtenerEmpleados as
select CI_emp, RIF_establecimiento, nombre, apellido
from Empleados;
go

/*
create FUNCTION getEmployee(
    @CI VARCHAR(50)
)
RETURNS TABLE
AS
RETURN (
    -- Get employee by CI
    SELECT CI_emp as CI, RIF_establecimiento, nombre, apellido
    FROM Empleados
    WHERE CI_emp = @CI
); */

/*create proc editEmployee
    @CI VARCHAR(50),
    @name VARCHAR(50),
    @lastname VARCHAR(50),
    @cellphone VARCHAR(50),
    @address VARCHAR(100),
    @salary DECIMAL(10,2)
AS
BEGIN
    Set nocount on;
    
    Update Empleados 
    SET nombre = ISNULL(@name, nombre), 
        apellido = ISNULL(@lastname, apellido),
        telefono = ISNULL(@cellphone, telefono), 
        direccion = ISNULL(@address, direccion), 
        sueldo = ISNULL(@salary, sueldo) 
    WHERE CI_emp = @CI;
END; 

drop procedure editEmployee; */


create proc AddEmployee
    @CI VARCHAR(50),
    @RIF VARCHAR(50),
    @name VARCHAR(50),
    @lastname VARCHAR(50),
    @cellphone VARCHAR(50),
    @address VARCHAR(100),
    @salary DECIMAL(10,2)
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
    INSERT INTO Empleados (CI_emp, RIF, nombre, apellido, telefono, direccion, sueldo)
    VALUES (@CI, @RIF, @name, @lastname, @cellphone, @address, @salary);
END;
drop procedure AddEmployee;

create proc deleteEmployee
    @CI varchar(50)
as BEGIN
    set NOCOUNT on;

    if exists(Select 1 from Empleados where CI_emp = @CI)
    BEGIN
        Delete from Empleados where CI_emp = @CI;
    end    
    ELSE BEGIN
        RAISERROR('El empleado no existe en la base de datos',16,1);
    end
end;

drop procedure deleteEmployee;

Select CI_emp, nombre, apellido from Empleados where RIF_establecimiento = 'J-12345678-9';