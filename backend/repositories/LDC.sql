-- Creación de roles.
create role ActualizadorInventario; -- Se encarga de actualizar el inventario (tal vez realizar ordenes de compra).
create role Supervisor; -- Este puede realizar las tareas de un administrador, pero sólo en su establecimiento.
create role Administrador; -- o Ejecutivo (Este maneja la información general de la empresa).
create role Empleado; -- Maneja la parte de la creación de facturas y orden de servicio.

-- Creacion de Logins
CREATE LOGIN ActualizadorInventarioLogin with password = 'Actualizador1234.';
CREATE LOGIN SupervisorLogin with password = 'Supervisor1234.';
CREATE LOGIN AdministradorLogin with password = 'Administrador1234.';
CREATE LOGIN EmpleadoLogin with password = 'Empleado1234.';

-- Creacion de usuarios
CREATE USER usuarioActualizador FOR LOGIN ActualizadorInventarioLogin;
CREATE USER usuarioSupervisor FOR LOGIN SupervisorLogin;
CREATE USER usuarioAdministrador FOR LOGIN AdministradorLogin;
CREATE USER usuarioEmpleado FOR LOGIN EmpleadoLogin;

-- Asignar roles a los usuarios
ALTER ROLE ActualizadorInventario ADD MEMBER usuarioActualizador;
ALTER ROLE Supervisor ADD MEMBER usuarioSupervisor;
ALTER ROLE Administrador ADD MEMBER usuarioAdministrador;
ALTER ROLE Empleado ADD MEMBER usuarioEmpleado;

-- Otorgar permisos a los roles
GRANT SELECT, UPDATE, DELETE, INSERT ON Inventario TO ActualizadorInventario; 
GRANT SELECT, UPDATE, DELETE, INSERT ON OrdenesCompra TO ActualizadorInventario; 

GRANT SELECT, DELETE, UPDATE, INSERT ON Empleados TO Supervisor;
GRANT SELECT, INSERT ON Servicios TO Supervisor;
GRANT SELECT, DELETE, UPDATE, INSERT ON OrdenesServicio TO Supervisor;
GRANT SELECT, UPDATE, INSERT ON Actividades TO Supervisor;
GRANT SELECT, UPDATE, INSERT ON OrdenesCompra TO Supervisor;
GRANT SELECT, DELETE, UPDATE, INSERT ON facturas TO Supervisor;
GRANT SELECT, INSERT ON Vehiculos TO Supervisor;
GRANT SELECT ON Modelos TO Supervisor;
GRANT SELECT ON Marcas TO Supervisor;
GRANT SELECT ON Inventario TO Supervisor;
GRANT SELECT, DELETE, INSERT ON Clientes TO Supervisor;
GRANT SELECT, DELETE, UPDATE, INSERT ON MetodosPago TO Supervisor;
GRANT SELECT, DELETE, UPDATE, INSERT ON EmpleadosAsignados TO Supervisor;
GRANT SELECT, DELETE, UPDATE, INSERT ON ServiciosOfrecidos TO Supervisor;
GRANT SELECT, DELETE, UPDATE, INSERT ON Proveedores TO Supervisor;
GRANT SELECT, DELETE, UPDATE, INSERT ON ActividadesOS TO Supervisor;

GRANT SELECT, DELETE, UPDATE, INSERT TO Administrador;

GRANT SELECT, DELETE, UPDATE, INSERT ON Facturas TO Empleado;
GRANT SELECT, DELETE, UPDATE, INSERT ON OrdenesServicio TO Empleado;
GRANT SELECT, INSERT ON Vehiculos TO Empleado;
GRANT SELECT TO Empleado;