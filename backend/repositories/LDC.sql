-- Creación de roles.

create role ActualizadorInventario; -- Se encarga de actualizar el inventario (tal vez realizar ordenes de compra).
create role Supervisor; -- Este puede realizar las tareas de un administrador, pero sólo en su establecimiento.
create role Administrador; -- o Ejecutivo (Este maneja la información general de la empresa).
create role Empleado; -- Maneja la parte de la creación de facturas y orden de servicio.

