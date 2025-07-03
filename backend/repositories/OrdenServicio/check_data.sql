USE MU_DB;

-- Verificar vehículos existentes
PRINT '=== VEHÍCULOS EXISTENTES ===';
SELECT 
    codigo,
    placa,
    CI_dueño,
    id_marca,
    id_modelo
FROM Vehiculos
ORDER BY codigo;

-- Verificar establecimientos existentes
PRINT '=== ESTABLECIMIENTOS EXISTENTES ===';
SELECT 
    RIF,
    nombre,
    direccion
FROM Establecimientos
ORDER BY RIF;

-- Verificar actividades existentes
PRINT '=== ACTIVIDADES EXISTENTES ===';
SELECT TOP 10
    nro_servicio,
    nro_correlativo,
    nombre,
    descripcion,
    costo
FROM Actividades
ORDER BY nro_servicio, nro_correlativo;

-- Verificar productos existentes
PRINT '=== PRODUCTOS EXISTENTES ===';
SELECT TOP 10
    id_producto,
    nombre,
    tipo,
    precio,
    id_familia
FROM Productos
ORDER BY id_producto;

-- Verificar empleados existentes
PRINT '=== EMPLEADOS EXISTENTES ===';
SELECT TOP 10
    CI_emp,
    nombre,
    apellido
FROM Empleados
ORDER BY CI_emp; 