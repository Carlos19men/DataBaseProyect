-- ###########################################################
-- # INSERCIÓN DE DATOS DE PRUEBA EN ORDEN DE DEPENDENCIA   #
-- ###########################################################

-- 1. Tablas Sin Dependencias de Clave Foránea (o solo PKs)
INSERT INTO Clientes (CI_cliente, nombre_cli, apellido_cli, email) VALUES
('10111222', 'Ana', 'Gomez', 'ana.gomez@email.com'),
('11222333', 'Luis', 'Perez', 'luis.perez@email.com'),
('12333444', 'Maria', 'Soto', 'maria.soto@email.com'),
('13444555', 'Pedro', 'Ruiz', 'pedro.ruiz@email.com'),
('14555666', 'Laura', 'Diaz', 'laura.diaz@email.com');

INSERT INTO Marcas (cod_marca, nombre_marca) VALUES
(1, 'Toyota'),
(2, 'Ford'),
(3, 'Chevrolet'),
(4, 'Nissan'),
(5, 'Hyundai');

INSERT INTO MetodosPago (id_pago, tipo_moneda, monto_ef, fechaPago_Tar, tipo_tarjeta, banco, nro_tarjeta, monto_tar, referenciaPM, fecha_PM, monto_PM, telefono) VALUES
(1, 'DOLARES', 50.00, '2025-06-15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL), -- Pago en Efectivo USD
(2, 'BOLIVARES', NULL, '2025-06-16', 'Debito', 'Banesco', '4567890123456789', 150.00, NULL, NULL, NULL, NULL), -- Pago con Tarjeta Bs
(3, 'DOLARES', NULL, NULL, NULL, NULL, NULL, NULL, 'REF00123', '2025-06-17', 75.00, '04141234567'), -- Pago Móvil USD
(4, 'BOLIVARES', 25.00, '2025-06-18', 'Credito', 'Mercantil', '1234567890123456', 50.00, NULL, NULL, NULL, NULL), -- Mixto Bs
(5, 'DOLARES', 100.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL); -- Pago en Efectivo USD

INSERT INTO Proveedores (RIF, razon_social, direccion, local_, telefono, persona_contacto) VALUES
('J123456789', 'Repuestos Autos C.A.', 'Av. Bolivar, Local 1', 'Caracas', '02121112233', 'Juan Pérez'),
('J987654321', 'Lubricantes Express', 'Calle 5, Edificio A', 'Valencia', '02414445566', 'Maria Lopez'),
('J112233445', 'Frenos y Algo Más', 'Av. Intercomunal, Galpón 2', 'Barquisimeto', '02517778899', 'Carlos Garcia'),
('J556677889', 'Cauchos del Sur', 'Carretera Nacional, Km 10', 'San Cristobal', '02761110000', 'Laura Torres'),
('J001122334', 'Servicios Automotrices', 'Calle Principal, Sector 3', 'Maracaibo', '02619998877', 'Jose Ramirez');

INSERT INTO FamiliaProductos (id_familia, nombre) VALUES
(1, 'Aceites y Lubricantes'),
(2, 'Frenos'),
(3, 'Filtros'),
(4, 'Cauchos'),
(5, 'Refrigerantes');

-- Todas las consultas del apartado 1, funcionan correctamente.

-- 2. Manejo de la Dependencia Circular Empleados <-> Establecimientos
-- (Insertamos con NULL, luego actualizamos las relaciones)

INSERT INTO Empleados (CI_emp, nombre, apellido, telefono, direccion, sueldo, RIF_establecimiento) VALUES
('15000000', 'Roberto', 'Blanco', '04141000000', 'Calle A, Casa 1, Caracas', 1200, NULL),
('16000000', 'Sofia', 'Mendez', '04122000000', 'Av. B, Apto 2, Valencia', 1100, NULL),
('17000000', 'Daniel', 'Rios', '04243000000', 'Urb. C, Qta 3, Maracay', 1300, NULL),
('18000000', 'Camila', 'Silva', '04164000000', 'Sector D, Casa 4, Barquisimeto', 1000, NULL),
('19000000', 'Jorge', 'Castro', '04145000000', 'Centro, Edif. 5, Puerto Ordaz', 1500, NULL);

INSERT INTO Establecimientos (RIF, CI_encargado, nombre, ciudad, fecha_encargado) VALUES
('V100000001', NULL, 'Taller Central Caracas', 'Caracas', '2024-01-10'),
('V100000002', NULL, 'Taller Norte Valencia', 'Valencia', '2024-02-15'),
('V100000003', NULL, 'Taller Express Maracay', 'Maracay', '2024-03-20'),
('V100000004', NULL, 'Taller Principal Barquisimeto', 'Barquisimeto', '2024-04-25'),
('V100000005', NULL, 'Taller del Este Pto. Ordaz', 'Puerto Ordaz', '2024-05-01');

-- Ahora actualizamos las relaciones circulares
UPDATE Empleados SET RIF_establecimiento = 'V100000001' WHERE CI_emp = '15000000';
UPDATE Establecimientos SET CI_encargado = '15000000' WHERE RIF = 'V100000001';

UPDATE Empleados SET RIF_establecimiento = 'V100000002' WHERE CI_emp = '16000000';
UPDATE Establecimientos SET CI_encargado = '16000000' WHERE RIF = 'V100000002';

UPDATE Empleados SET RIF_establecimiento = 'V100000003' WHERE CI_emp = '17000000';
UPDATE Establecimientos SET CI_encargado = '17000000' WHERE RIF = 'V100000003';

UPDATE Empleados SET RIF_establecimiento = 'V100000004' WHERE CI_emp = '18000000';
UPDATE Establecimientos SET CI_encargado = '18000000' WHERE RIF = 'V100000004';

UPDATE Empleados SET RIF_establecimiento = 'V100000005' WHERE CI_emp = '19000000';
UPDATE Establecimientos SET CI_encargado = '19000000' WHERE RIF = 'V100000005';

-- Todas las consultas del apartado 2, funcionan correctamente.

-- 3. Tablas que dependen de las anteriores (y de las ya insertadas)

INSERT INTO Modelos (cod_marca, nro_modelo, aceite_caja, aceite_motor, octanaje, tipo_refrigerante, peso, descripcion, nro_puestos) VALUES
(1, 101, 'ATF Dexron III', 'SAE 5W-30', '95', 'Glicol Etileno', 1200, 'Sedán compacto, eficiente en consumo de combustible.', 5),
(1, 102, 'CVT Fluid', 'SAE 0W-20', '91', 'Refrigerante Larga Vida', 1350, 'SUV familiar, amplio espacio interior y versatilidad.', 7),
(2, 201, 'Mercon V', 'SAE 5W-20', '91', 'Super Long Life Coolant', 1500, 'Camioneta pick-up robusta, ideal para trabajo pesado.', 5),
(3, 301, 'Dexron VI', 'SAE 5W-30', '95', 'Glicol Etileno', 1400, 'Vehículo deportivo utilitario, cómodo y con buen rendimiento.', 5),
(4, 401, 'NS-3 Fluid', 'SAE 0W-20', '91', 'Refrigerante Larga Duración', 1100, 'Hatchback urbano, ágil y fácil de estacionar.', 4);

INSERT INTO Servicios (nro_servicio, CI_superv, nombre_ser) VALUES
(1, '15000000', 'Cambio de Aceite y Filtro'),
(2, '16000000', 'Revision General 20 Puntos'),
(3, '17000000', 'Cambio de Frenos Delanteros'),
(4, '18000000', 'Balanceo y Rotacion Cauchos'),
(5, '19000000', 'Mantenimiento Sistema Refrigeracion');

INSERT INTO Productos (id_producto, nombre, tipo, precio, descripcion, minimo, maximo, tratamiento_residuos, nivel_contaminacion, info_manejo, id_familia) VALUES
(1, 'Aceite Sintetico 5W-30', 'ECOLÓGICO', 25.50, 'Aceite de motor 100% sintético de alto rendimiento.', 10, 50, 'Reciclaje en centro autorizado.', 2, 'Evitar contacto con piel y ojos.', 1),
(2, 'Filtro de Aceite Universal', 'NO ECOLÓGICO', 12.00, 'Filtro de aceite estándar para diversos modelos.', 20, 100, 'Desechar en contenedores especiales.', 4, 'Manipular con guantes.', 3),
(3, 'Pastillas de Freno Ceramicas', 'ECOLÓGICO', 65.00, 'Pastillas de freno de cerámica para mayor durabilidad.', 5, 25, 'Materiales reciclables, bajo polvo.', 1, 'Instalar por profesional.', 2),
(4, 'Neumático Radial R16', 'NO ECOLÓGICO', 90.00, 'Neumático para uso en ciudad y carretera.', 8, 40, 'Gestionar en planta de reciclaje de cauchos.', 5, 'Mantener presión adecuada.', 4),
(5, 'Refrigerante Concentrado', 'ECOLÓGICO', 18.75, 'Refrigerante orgánico de larga duración.', 15, 60, 'Biodegradable, pero desechar responsablemente.', 2, 'Diluir según instrucciones.', 5);

-- Todas las consultas del apartado 3, funcionan correctamente.

-- 4. Tablas que dependen de las creadas en el paso 3

INSERT INTO Vehiculos (codigo, placa, aceite_utilizado_motor, aceite_utilizado_caja, resumen_mantenimiento, tiempo_uso, kilometraje, id_modelo, id_marca, CI_dueño) VALUES
(1001, 'ABC12D', 'SAE 5W-30', 'ATF Dexron III', 'Cambio de aceite reciente. Neumáticos revisados.', 0.5, 55000.75, 101, 1, '10111222'),
(1002, 'XYZ98P', 'SAE 0W-20', 'CVT Fluid', 'Revisión general, frenos delanteros nuevos.', 1.2, 78200.50, 102, 1, '11222333'),
(1003, 'DEF34Q', 'SAE 5W-20', 'Mercon V', 'Cambio de aceite y filtro de aire.', 0.8, 45000.00, 201, 2, '12333444'),
(1004, 'GHI56R', 'SAE 5W-30', 'Dexron VI', 'Balanceo y rotación de cauchos.', 0.3, 30100.25, 301, 3, '13444555'),
(1005, 'JKL78S', 'SAE 0W-20', 'NS-3 Fluid', 'Mantenimiento del sistema de refrigeración.', 0.6, 62000.10, 401, 4, '14555666');

INSERT INTO PlanesMantenimiento (cod_marca, nro_modelo, kilometraje, nombre, descripcion) VALUES
(1, 101, 10000.00, 'Mantenimiento 10K', 'Revisión básica, cambio de aceite y filtro.'),
(1, 101, 20000.00, 'Mantenimiento 20K', 'Revisión intermedia, cambio de filtros, rotación de cauchos.'),
(2, 201, 15000.00, 'Servicio Anual', 'Revisión exhaustiva, ajuste de frenos.'),
(3, 301, 25000.00, 'Servicio Mayor', 'Cambio de fluidos principales, bujías y correas.'),
(4, 401, 5000.00, 'Revisión Pre-viaje', 'Chequeo de niveles y seguridad antes de un viaje largo.');

INSERT INTO Actividades (nro_servicio, nro_correlativo, nombre, descripcion, costo) VALUES
(1, 1, 'Drenado y Relleno Aceite', 'Drenar aceite usado y rellenar con aceite nuevo.', 15.00),
(1, 2, 'Cambio Filtro Aceite', 'Remover filtro viejo e instalar nuevo.', 5.00),
(2, 1, 'Inspeccion Visual Motor', 'Revisar fugas y componentes visibles del motor.', 10.00),
(3, 1, 'Desmontar Rueda y Caliper', 'Remover rueda y desmontar caliper para acceder a frenos.', 8.00),
(4, 1, 'Balanceo Neumáticos', 'Equilibrar los neumáticos para evitar vibraciones.', 12.00);

INSERT INTO OrdenesCompra (nro_OC, fecha_compra, RIF_est) VALUES
(100, '2025-06-01', 'V100000001'),
(101, '2025-06-05', 'V100000002'),
(102, '2025-06-10', 'V100000003'),
(103, '2025-06-12', 'V100000004'),
(104, '2025-06-14', 'V100000005');

INSERT INTO OrdenesServicio (cod_OS, fecha_entrada, hora_entrada, hora_estimada_salida, hora_real_salida, fecha_salida, justificacion, persona_autorizada, codigo_vehiculo) VALUES
(1, '2025-06-18', '08:00:00', '10:00:00', '09:45:00', '2025-06-18', 'Mantenimiento rutinario de 55.000km', 'Ana Gomez', 1001),
(2, '2025-06-19', '09:00:00', '13:00:00', '12:50:00', '2025-06-19', 'Revision general por viaje largo', 'Luis Perez', 1002),
(3, '2025-06-20', '10:30:00', '11:30:00', '11:15:00', '2025-06-20', 'Cambio de frenos delanteros', 'Maria Soto', 1003),
(4, '2025-06-21', '08:45:00', '09:15:00', '09:00:00', '2025-06-21', 'Rotacion de cauchos', 'Pedro Ruiz', 1004),
(5, '2025-06-22', '11:00:00', '14:00:00', '13:30:00', '2025-06-22', 'Mantenimiento de enfriamiento', 'Laura Diaz', 1005);

-- Todas las consultas del apartado 4, funcionan correctamente.

-- 5. Tablas que dependen de las creadas en el paso 4 (o ya existentes)

INSERT INTO Facturas (nro_factura, cod_OS, descuento, iva, monto_total, fecha_emision) VALUES
(1001, 1, 0.05, 16, 250.00, '2025-06-18'),
(1002, 2, 0.00, 16, 300.00, '2025-06-19'),
(1003, 3, 0.10, 16, 180.00, '2025-06-20'),
(1004, 4, 0.00, 16, 50.00, '2025-06-21'),
(1005, 5, 0.03, 16, 220.00, '2025-06-22');

INSERT INTO Almacena (RIF_establecimiento, id_producto, cantidad) VALUES
('V100000001', 1, 30),
('V100000001', 2, 50),
('V100000002', 3, 15),
('V100000003', 4, 25),
('V100000004', 5, 35);

INSERT INTO ActualizacionesInventarios (RIF_establecimiento, id_producto, fecha_ajuste, hora_ajuste, cantidad, tipo, comentario) VALUES
('V100000001', 1, '2025-06-10', '10:00:00', 5, 'FALTANTE', 'Error en conteo inicial'),
('V100000001', 2, '2025-06-11', '11:30:00', 10, 'SOBRANTE', 'Devolución de cliente'),
('V100000002', 3, '2025-06-12', '14:00:00', 2, 'FALTANTE', 'Daño en transporte'),
('V100000003', 4, '2025-06-13', '09:00:00', 3, 'SOBRANTE', 'Reorganización de almacén'),
('V100000004', 5, '2025-06-14', '16:00:00', 1, 'FALTANTE', 'Perdida de unidad');

INSERT INTO Compras (nro_ordencompra, id_producto, cantidad_producto, precio_und) VALUES
(100, 1, 20, 20.00),
(101, 2, 30, 10.00),
(102, 3, 10, 60.00),
(103, 4, 15, 80.00),
(104, 5, 20, 15.00);

INSERT INTO PagosFactura (nro_factura, id_pago) VALUES
(1001, 1),
(1002, 2),
(1003, 3),
(1004, 4),
(1005, 5);

INSERT INTO ActividadesPlan (cod_marca, nro_modelo, kilometraje, nro_servicio, nro_correlativo) VALUES
(1, 101, 10000.00, 1, 1),
(1, 101, 10000.00, 1, 2),
(2, 201, 15000.00, 2, 1),
(3, 301, 25000.00, 3, 1),
(4, 401, 5000.00, 4, 1);

INSERT INTO ActividadesOS (cod_OS, nro_servicio, nro_correlativo, id_producto, precio_producto, precio_actividad, cantidad) VALUES
(1, 1, 1, 1, 25.50, 15.00, 1), -- Cambio de aceite y filtro
(1, 1, 2, 2, 12.00, 5.00, 1),
(2, 2, 1, 3, 65.00, 10.00, 1), -- Revisión general
(3, 3, 1, 3, 65.00, 8.00, 2), -- Frenos
(4, 4, 1, 4, 90.00, 12.00, 4); -- Rotación

INSERT INTO ProveedoresAsociados (RIF_proveedor, nro_orden) VALUES
('J123456789', 100),
('J987654321', 101),
('J112233445', 102),
('J556677889', 103),
('J001122334', 104);

INSERT INTO telefonosCliente (numero, CI_cliente) VALUES
('04141234567', '10111222'),
('04122345678', '11222333'),
('04163456789', '12333444'),
('04244567890', '13444555'),
('04145678901', '14555666');

INSERT INTO EmpleadosAsignados (CI_empleado, nro_servicio) VALUES
('15000000', 1),
('16000000', 2),
('17000000', 3),
('18000000', 4),
('19000000', 5);

INSERT INTO EspecializacionEmpleados (CI_empleado, nro_servicio) VALUES
('15000000', 1),
('16000000', 2),
('17000000', 3),
('18000000', 4),
('19000000', 5);

INSERT INTO ServiciosOfrecidos (RIF_establecimiento, nro_servicio) VALUES
('V100000001', 1),
('V100000001', 2),
('V100000002', 3),
('V100000003', 4),
('V100000004', 5);

-- Todas las consultas del apartado 5, funcionan correctamente.

-- Tests Select.
SELECT * FROM Clientes;
SELECT * FROM Marcas;
SELECT * FROM MetodosPago;
SELECT * FROM Proveedores;
SELECT * FROM FamiliaProductos;
SELECT * FROM Empleados;
SELECT * FROM Establecimientos;
SELECT * FROM Modelos;
SELECT * FROM Servicios;
SELECT * FROM Productos;
SELECT * FROM Vehiculos;
SELECT * FROM PlanesMantenimiento;
SELECT * FROM Actividades;
SELECT * FROM OrdenesCompra;
SELECT * FROM OrdenesServicio;
SELECT * FROM Facturas;
SELECT * FROM Almacena;
SELECT * FROM ActualizacionesInventarios;
SELECT * FROM Compras;
SELECT * FROM PagosFactura;
SELECT * FROM ActividadesPlan;
SELECT * FROM ActividadesOS;
SELECT * FROM ProveedoresAsociados;
SELECT * FROM telefonosCliente;
SELECT * FROM EmpleadosAsignados;
SELECT * FROM EspecializacionEmpleados;
SELECT * FROM ServiciosOfrecidos;

SELECT * FROM InfoPagos_Efectivo;
SELECT * FROM InfoPagos_Tarjeta;
SELECT * FROM InfoPagos_PagoMovil;