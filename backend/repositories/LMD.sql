USE MU_DB; 


--INSERTAMOS EN LA TABLA MARCAS 

INSERT INTO Marcas (nombre_marca) VALUES
('Toyota'),
('Ford'),
('Chevrolet'),
('Volkswagen'),
('Mercedes-Benz'),
('BMW'),
('Honda'),
('Hyundai'),
('Nissan'),
('Audi');

 
 -- 1. Modelos para Toyota (cod_marca = 1)
INSERT INTO Modelos (cod_marca, nombre, aceite_caja, aceite_motor, octanaje, tipo_refrigerante, peso, descripcion, nro_puestos) VALUES
(1, 'Corolla Sedán XLE', 'ATF WS', '0W-20 Sintético','91', 'SLLC Rojo', 1350, 'Sedán compacto y confiable, bajo consumo.', 4),
(1, 'Hilux SRV 4x4', 'ATF WS', '5W-30 Sintético', '91', 'SLLC Rojo', 2100, 'Camioneta robusta para trabajo y aventura.', 4),
(1, 'RAV4 Híbrida Limited', 'ATF WS', '0W-20 Sintético','91', 'SLLC Rosa', 1700, 'SUV híbrida, espaciosa y eficiente.', 5),
(1, 'Camry XSE V6', 'ATF WS', '5W-30 Sintético', '95', 'SLLC Rojo', 1650, 'Sedán mediano de lujo con potente motor V6.', 4),
(1, 'Land Cruiser Prado TX-L', 'ATF WS', '5W-30 Sintético', '91', 'SLLC Rojo', 2300, 'SUV todoterreno premium, gran capacidad.', 5),

-- 2. Modelos para Ford (cod_marca = 2)
(2, 'F-150 XLT', 'Mercon LV', '5W-30 Sintético','87', 'Motorcraft Gold', 2350, 'Camioneta pickup líder en ventas, versátil.', 4),
(2, 'Mustang GT', 'Mercon LV', '5W-20 Sintético', '95', 'Motorcraft Orange', 1700, 'Deportivo icónico con motor V8 potente.', 2),
(2, 'Explorer Limited', 'Mercon LV', '5W-30 Sintético','87', 'Motorcraft Gold', 2050, 'SUV familiar con tres filas de asientos.', 5),
(2, 'Ranger XLT', 'Mercon LV', '5W-30 Sintético', '91', 'Motorcraft Gold', 1900, 'Pickup mediana robusta y confiable.', 4),
(2, 'Escape Titanium', 'Mercon LV', '5W-20 Sintético', '87', 'Motorcraft Orange', 1550, 'Crossover compacto, ágil y tecnológico.', 5),

-- 3. Modelos para Chevrolet (cod_marca = 3)
(3, 'Silverado LTZ', 'Dexron VI', '5W-30 Sintético', '98', 'Dex-Cool', 2400, 'Camioneta de tamaño completo, potente y duradera.', 4),
(3, 'Camaro SS', 'Dexron VI', '5W-30 Sintético', '87', 'Dex-Cool', 1750, 'Muscle car deportivo y de alto rendimiento.', 2),
(3, 'Tahoe Premier', 'Dexron VI', '0W-20 Sintético','87', 'Dex-Cool', 2500, 'SUV grande, ideal para familias numerosas.', 5),
(3, 'Equinox RS', 'Dexron VI', '0W-20 Sintético', '87', 'Dex-Cool', 1600, 'Crossover compacto con diseño moderno.', 5),
(3, 'Malibu LT', 'Dexron VI', '5W-30 Sintético', '87', 'Dex-Cool', 1450, 'Sedán mediano elegante y confortable.', 4),

-- 4. Modelos para Volkswagen (cod_marca = 4)
(4, 'Golf GTI', 'DSG Fluid', '5W-40 Sintético', '95', 'G13 Plus', 1400, 'Hatchback deportivo, divertido de conducir.', 5),
(4, 'Jetta Highline', 'DSG Fluid', '0W-20 Sintético', '91', 'G13 Plus', 1380, 'Sedán compacto con interior espacioso.', 4),
(4, 'Tiguan Allspace', 'DSG Fluid', '5W-30 Sintético', '91', 'G13 Plus', 1800, 'SUV familiar con opción de 7 asientos.', 5),
(4, 'Passat Elegance', 'DSG Fluid', '0W-20 Sintético', '91', 'G13 Plus', 1550, 'Sedán de tamaño mediano con acabados premium.', 4),
(4, 'Amarok V6 TDI', 'ATF 8HP', '5W-30 Sintético', '91', 'G13 Plus', 2200, 'Pickup robusta con motor diésel potente.', 4),

-- 5. Modelos para Mercedes-Benz (cod_marca = 5)
(5, 'Clase C 300', 'MB 236.15', '5W-40 Sintético', '95', 'MB 325.0', 1600, 'Sedán de lujo, elegante y tecnológico.', 4),
(5, 'Clase E 450', 'MB 236.15', '5W-40 Sintético', '95', 'MB 325.0', 1850, 'Sedán ejecutivo con gran confort y potencia.', 4),
(5, 'GLC 300', 'MB 236.15', '5W-30 Sintético', '95', 'MB 325.0', 1800, 'SUV compacto premium, versátil y sofisticado.', 5),
(5, 'Clase A 200', 'MB 236.15', '0W-30 Sintético', '95', 'MB 325.0', 1400, 'Compacto premium, ideal para la ciudad.', 5),
(5, 'GLE 450', 'MB 236.15', '0W-30 Sintético', '95', 'MB 325.0', 2200, 'SUV de lujo de tamaño mediano, espacioso y potente.', 5),

-- 6. Modelos para BMW (cod_marca = 6)
(6, 'Serie 3 330i', 'ZF LifeguardFluid 8', '5W-30 Sintético', '95', 'BMW LL-01', 1550, 'Sedán deportivo, excelente dinámica de conducción.', 4),
(6, 'Serie 5 540i', 'ZF LifeguardFluid 8', '5W-30 Sintético', '98', 'BMW LL-01', 1750, 'Sedán ejecutivo, combina lujo y deportividad.', 4),
(6, 'X5 xDrive40i', 'ZF LifeguardFluid 8', '0W-30 Sintético', '95', 'BMW LL-01', 2150, 'SUV premium de tamaño mediano, versátil.', 5),
(6, 'X3 xDrive30i', 'ZF LifeguardFluid 8', '0W-30 Sintético', '95', 'BMW LL-01', 1850, 'SUV compacto premium, ágil y espacioso.', 5),
(6, 'Serie 1 118i', 'ZF LifeguardFluid 8', '0W-20 Sintético', '91', 'BMW LL-01', 1350, 'Hatchback compacto, dinámico y eficiente.', 5),

-- 7. Modelos para Honda (cod_marca = 7)
(7, 'Civic EX', 'Honda DW-1', '0W-20 Sintético', '91', 'Honda Type 2', 1300, 'Sedán compacto, confiable y con buen rendimiento.', 4),
(7, 'CR-V Touring', 'Honda DW-1', '0W-20 Sintético', '91', 'Honda Type 2', 1580, 'SUV compacto, espacioso y versátil.', 5),
(7, 'Accord Sport', 'Honda DW-1', '0W-20 Sintético', '91', 'Honda Type 2', 1450, 'Sedán mediano elegante y bien equipado.', 4),
(7, 'Pilot EX-L', 'Honda DW-1', '0W-20 Sintético', '87', 'Honda Type 2', 1900, 'SUV familiar con tres filas de asientos.', 5),
(7, 'HR-V Sport', 'Honda DW-1', '0W-20 Sintético', '87', 'Honda Type 2', 1300, 'Crossover subcompacto, práctico para la ciudad.', 5),

-- 8. Modelos para Hyundai (cod_marca = 8)
(8, 'Elantra GLS', 'Hyundai SP-IV', '5W-30 Sintético', '87', 'Hyundai Long Life', 1300, 'Sedán compacto moderno y económico.', 4),
(8, 'Tucson Limited', 'Hyundai SP-IV', '0W-20 Sintético', '87', 'Hyundai Long Life', 1600, 'SUV compacto con diseño vanguardista.', 5),
(8, 'Santa Fe Calligraphy', 'Hyundai SP-IV', '0W-20 Sintético', '87', 'Hyundai Long Life', 1950, 'SUV mediano, espacioso y con buen equipamiento.', 5),
(8, 'Kona N Line', 'Hyundai SP-IV', '0W-20 Sintético', '91', 'Hyundai Long Life', 1400, 'SUV subcompacto, juvenil y ágil.', 5),
(8, 'Sonata N Line', 'Hyundai SP-IV', '5W-30 Sintético', '91', 'Hyundai Long Life', 1550, 'Sedán mediano con diseño deportivo y tecnología.', 4),

-- 9. Modelos para Nissan (cod_marca = 9)
(9, 'Sentra SR', 'Nissan NS-3', '0W-20 Sintético', '87', 'Nissan Long Life', 1350, 'Sedán compacto, cómodo y confiable.', 4),
(9, 'Titan Pro-4X', 'Nissan Matic-S', '5W-30 Sintético', '87', 'Nissan Long Life', 2500, 'Camioneta pickup de trabajo pesado.', 4),
(9, 'Rogue SL', 'Nissan NS-3', '0W-20 Sintético', '87', 'Nissan Long Life', 1650, 'Crossover popular, familiar y versátil.', 5),
(9, 'Altima SR', 'Nissan NS-3', '0W-20 Sintético', '87', 'Nissan Long Life', 1500, 'Sedán mediano, eficiente y de buen manejo.', 4),
(9, 'Frontier Pro-4X', 'Nissan Matic-S', '5W-30 Sintético', '87', 'Nissan Long Life', 1900, 'Pickup mediana, robusta y apta para off-road.', 4),

-- 10. Modelos para Audi (cod_marca = 10)
(10, 'A4 S Line', 'ZF LifeguardFluid 8', '5W-30 Sintético', '95', 'G13 Plus', 1600, 'Sedán deportivo y elegante, buen rendimiento.', 4),
(10, 'Q5 S Line', 'ZF LifeguardFluid 8', '0W-20 Sintético', '95', 'G13 Plus', 1850, 'SUV de lujo compacto, ideal para la ciudad.', 5),
(10, 'A3 Sportback', 'DSG Fluid', '0W-20 Sintético', '91', 'G13 Plus', 1450, 'Hatchback premium, ágil y tecnológico.', 5),
(10, 'Q7 Prestige', 'ZF LifeguardFluid 8', '0W-20 Sintético', '95', 'G13 Plus', 2250, 'SUV de lujo grande, espacioso y potente.', 5),
(10, 'A6 S Line', 'ZF LifeguardFluid 8', '5W-30 Sintético', '95', 'G13 Plus', 1800, 'Sedán ejecutivo, combina lujo y tecnología avanzada.', 4);


--Insertamos los establecimientos 
INSERT INTO Establecimientos (RIF,nombre, ciudad) 
VALUES 
('J-12345678-9', 'Servicentro Rápido Guayana', 'Puerto Ordaz'),
('J-98765432-1', 'Lubricantes El Freno', 'Ciudad Bolívar'),
('J-11223344-5', 'AutoLavado Brillante', 'Caracas'),
('J-55667788-9', 'Taller Mecánico La Ruta', 'Valencia'),
('J-00112233-4', 'Centro Automotriz Innova', 'Maracaibo'),
('J-23456789-0', 'El Rey de los Filtros', 'Barquisimeto'),
('J-87654321-0', 'Mantenimiento Express', 'San Cristóbal'),
('J-33445566-7', 'Soluciones Automotrices C.A.', 'Mérida'),
('J-77889900-1', 'La Estación del Auto', 'Barcelona'),
('J-44556677-8', 'Servicio Total Vehicular', 'Maracay');

--insertamos los empleados 
INSERT INTO Empleados (CI_emp, nombre, apellido, telefono, direccion, RIF_establecimiento, sueldo) VALUES
-- Empleados para RIF: J-12345678-9 (Servicentro Rápido Guayana)
('12345678', 'Juan', 'Perez', '04141234567', 'Av. Atlántico, Edif. Apto 1A', 'J-12345678-9', 850.00),
('12345679', 'Maria', 'Gomez', '04241234567', 'Calle Orinoco, Casa 2B', 'J-12345678-9', 900.00),
('12345680', 'Carlos', 'Rodriguez', '04161234567', 'Urb. Chile, Qta. 3C', 'J-12345678-9', 800.00),
('12345681', 'Ana', 'Lopez', '04121234567', 'Av. Las Américas, Piso 4D', 'J-12345678-9', 950.00),
('12345682', 'Pedro', 'Martinez', '04141234568', 'Calle El Callao, Edif. 5E', 'J-12345678-9', 870.00),
('12345683', 'Laura', 'Diaz', '04241234568', 'Sector Los Olivos, Casa 6F', 'J-12345678-9', 910.00),
('12345684', 'Miguel', 'Hernandez', '04161234568', 'Av. Ppal de Unare, Apt. 7G', 'J-12345678-9', 820.00),
('12345685', 'Sofia', 'Torres', '04121234568', 'Calle Canaima, Qta. 8H', 'J-12345678-9', 930.00),
('12345686', 'Javier', 'Ruiz', '04141234569', 'Urb. Villa Asia, Edif. 9I', 'J-12345678-9', 880.00),
('12345687', 'Valentina', 'Flores', '04241234569', 'Av. Bolívar, Casa 10J', 'J-12345678-9', 960.00),

-- Empleados para RIF: J-98765432-1 (Lubricantes El Freno)
('12345688', 'Andres', 'Morales', '04161234569', 'Calle Principal, Local 1A', 'J-98765432-1', 860.00),
('12345689', 'Daniela', 'Rojas', '04121234569', 'Av. 5 de Julio, Casa 2B', 'J-98765432-1', 920.00),
('12345690', 'Fernando', 'Blanco', '04141234570', 'Sector La Sabanita, Edif. 3C', 'J-98765432-1', 810.00),
('12345691', 'Isabella', 'Serrano', '04241234570', 'Paseo Orinoco, Qta. 4D', 'J-98765432-1', 940.00),
('12345692', 'Luis', 'Gil', '04161234570', 'Urb. Angostura, Apt. 5E', 'J-98765432-1', 890.00),
('12345693', 'Gabriela', 'Pinto', '04121234570', 'Calle Bolívar, Casa 6F', 'J-98765432-1', 970.00),
('12345694', 'Manuel', 'Salazar', '04141234571', 'Av. Libertador, Edif. 7G', 'J-98765432-1', 830.00),
('12345695', 'Natalia', 'Vega', '04241234571', 'Sector Las Flores, Qta. 8H', 'J-98765432-1', 900.00),
('12345696', 'Ricardo', 'Castillo', '04161234571', 'Calle Venezuela, Apt. 9I', 'J-98765432-1', 850.00),
('12345697', 'Elena', 'Mendez', '04121234571', 'Urb. Vista Hermosa, Casa 10J', 'J-98765432-1', 910.00),

-- Empleados para RIF: J-11223344-5 (AutoLavado Brillante)
('12345698', 'Diego', 'Guerrero', '04141234572', 'Av. Francisco de Miranda, Edif. 1A', 'J-11223344-5', 840.00),
('12345699', 'Sara', 'Castro', '04241234572', 'Calle Los Jabillos, Casa 2B', 'J-11223344-5', 930.00),
('12345700', 'Pablo', 'Vargas', '04161234572', 'Urb. El Rosal, Qta. 3C', 'J-11223344-5', 800.00),
('12345701', 'Paula', 'Ortega', '04121234572', 'Av. Rómulo Gallegos, Piso 4D', 'J-11223344-5', 960.00),
('12345702', 'Alejandro', 'Reyes', '04141234573', 'Calle San Ignacio, Edif. 5E', 'J-11223344-5', 880.00),
('12345703', 'Valeria', 'Jimenez', '04241234573', 'Sector Las Palmas, Casa 6F', 'J-11223344-5', 920.00),
('12345704', 'Sergio', 'Moreno', '04161234573', 'Av. Baralt, Apt. 7G', 'J-11223344-5', 810.00),
('12345705', 'Mariana', 'Delgado', '04121234573', 'Calle Real de Sabana Grande, Qta. 8H', 'J-11223344-5', 940.00),
('12345706', 'Jorge', 'Guillen', '04141234574', 'Urb. Las Mercedes, Edif. 9I', 'J-11223344-5', 860.00),
('12345707', 'Sofia', 'Herrera', '04241234574', 'Av. Principal de Bello Monte, Casa 10J', 'J-11223344-5', 900.00),

-- Empleados para RIF: J-55667788-9 (Taller Mecánico La Ruta)
('12345708', 'Gabriel', 'Castro', '04161234574', 'Av. Universidad, Edif. 1A', 'J-55667788-9', 870.00),
('12345709', 'Andrea', 'Mendoza', '04121234574', 'Calle 150, Casa 2B', 'J-55667788-9', 950.00),
('12345710', 'Ivan', 'Vargas', '04141234575', 'Urb. El Viñedo, Qta. 3C', 'J-55667788-9', 820.00),
('12345711', 'Camila', 'Silva', '04241234575', 'Av. Bolívar Norte, Piso 4D', 'J-55667788-9', 980.00),
('12345712', 'Oscar', 'Ramos', '04161234575', 'Calle Las Delicias, Edif. 5E', 'J-55667788-9', 890.00),
('12345713', 'Victoria', 'Aguilar', '04121234575', 'Sector Mañongo, Casa 6F', 'J-55667788-9', 930.00),
('12345714', 'Emilio', 'Ruiz', '04141234576', 'Av. Cedeño, Apt. 7G', 'J-55667788-9', 840.00),
('12345715', 'Florencia', 'Diaz', '04241234576', 'Calle La Paz, Qta. 8H', 'J-55667788-9', 960.00),
('12345716', 'Roberto', 'Leon', '04161234576', 'Urb. Kerdell, Edif. 9I', 'J-55667788-9', 870.00),
('12345717', 'Lucia', 'Bravo', '04121234576', 'Av. Aranzazu, Casa 10J', 'J-55667788-9', 910.00),

-- Empleados para RIF: J-00112233-4 (Centro Automotriz Innova)
('12345718', 'Jose', 'Quintero', '04141234577', 'Av. 5 de Julio, Edif. 1A', 'J-00112233-4', 850.00),
('12345719', 'Sofía', 'Perez', '04241234577', 'Calle Dr. Portillo, Casa 2B', 'J-00112233-4', 900.00),
('12345720', 'David', 'Suarez', '04161234577', 'Urb. La Lago, Qta. 3C', 'J-00112233-4', 800.00),
('12345721', 'Mariana', 'Velez', '04121234577', 'Av. Bella Vista, Piso 4D', 'J-00112233-4', 950.00),
('12345722', 'Daniel', 'Marquez', '04141234578', 'Calle 72, Edif. 5E', 'J-00112233-4', 870.00),
('12345723', 'Paola', 'Gonzalez', '04241234578', 'Sector Delicias, Casa 6F', 'J-00112233-4', 910.00),
('12345724', 'Felipe', 'Acosta', '04161234578', 'Av. El Milagro, Apt. 7G', 'J-00112233-4', 820.00),
('12345725', 'Valeria', 'Ramirez', '04121234578', 'Calle Cecilio Acosta, Qta. 8H', 'J-00112233-4', 930.00),
('12345726', 'Hector', 'Contreras', '04141234579', 'Urb. Valle Claro, Edif. 9I', 'J-00112233-4', 880.00),
('12345727', 'Veronica', 'Nuñez', '04241234579', 'Av. Paez, Casa 10J', 'J-00112233-4', 960.00),

-- Empleados para RIF: J-23456789-0 (El Rey de los Filtros)
('12345728', 'Marcos', 'Cordero', '04161234579', 'Carrera 19, Edif. 1A', 'J-23456789-0', 860.00),
('12345729', 'Silvia', 'Luna', '04121234579', 'Calle 42, Casa 2B', 'J-23456789-0', 920.00),
('12345730', 'Julio', 'Soto', '04141234580', 'Urb. Santa Elena, Qta. 3C', 'J-23456789-0', 810.00),
('12345731', 'Daniela', 'Flores', '04241234580', 'Av. Florencio Jiménez, Piso 4D', 'J-23456789-0', 940.00),
('12345732', 'Ruben', 'Figueroa', '04161234580', 'Calle Los Leones, Edif. 5E', 'J-23456789-0', 890.00),
('12345733', 'Adriana', 'Campos', '04121234580', 'Sector El Cují, Casa 6F', 'J-23456789-0', 970.00),
('12345734', 'Eduardo', 'Molina', '04141234581', 'Av. Libertador, Apt. 7G', 'J-23456789-0', 830.00),
('12345735', 'Carolina', 'Ortega', '04241234581', 'Calle San Juan, Qta. 8H', 'J-23456789-0', 900.00),
('12345736', 'Victor', 'Lara', '04161234581', 'Urb. Obelisco, Edif. 9I', 'J-23456789-0', 850.00),
('12345737', 'Alejandra', 'Mendez', '04121234581', 'Av. Vargas, Casa 10J', 'J-23456789-0', 910.00),

-- Empleados para RIF: J-87654321-0 (Mantenimiento Express)
('12345738', 'Fernando', 'Soto', '04141234582', 'Carrera 6, Edif. 1A', 'J-87654321-0', 840.00),
('12345739', 'Maria', 'Paz', '04241234582', 'Calle 14, Casa 2B', 'J-87654321-0', 930.00),
('12345740', 'Carlos', 'Rojas', '04161234582', 'Urb. Barrio Obrero, Qta. 3C', 'J-87654321-0', 800.00),
('12345741', 'Ana', 'Torres', '04121234582', 'Av. 19 de Abril, Piso 4D', 'J-87654321-0', 960.00),
('12345742', 'Pedro', 'Blanco', '04141234583', 'Calle 10, Edif. 5E', 'J-87654321-0', 880.00),
('12345743', 'Laura', 'Gil', '04241234583', 'Sector Las Lomas, Casa 6F', 'J-87654321-0', 920.00),
('12345744', 'Miguel', 'Pinto', '04161234583', 'Av. Principal de Pueblo Nuevo, Apt. 7G', 'J-87654321-0', 810.00),
('12345745', 'Sofia', 'Salazar', '04121234583', 'Calle 20, Qta. 8H', 'J-87654321-0', 940.00),
('12345746', 'Javier', 'Vega', '04141234584', 'Urb. La Castellana, Edif. 9I', 'J-87654321-0', 860.00),
('12345747', 'Valentina', 'Castillo', '04241234584', 'Av. Carabobo, Casa 10J', 'J-87654321-0', 900.00),

-- Empleados para RIF: J-33445566-7 (Soluciones Automotrices C.A.)
('12345748', 'Juan', 'Cordova', '04161234584', 'Av. Bolívar, Edif. 1A', 'J-33445566-7', 850.00),
('12345749', 'Maria', 'Nuñez', '04121234584', 'Calle 3, Casa 2B', 'J-33445566-7', 900.00),
('12345750', 'Carlos', 'Guillen', '04141234585', 'Urb. Los Corales, Qta. 3C', 'J-33445566-7', 800.00),
('12345751', 'Ana', 'Herrera', '04241234585', 'Av. Principal, Piso 4D', 'J-33445566-7', 950.00),
('12345752', 'Pedro', 'Morales', '04161234585', 'Calle La Alameda, Edif. 5E', 'J-33445566-7', 870.00),
('12345753', 'Laura', 'Rojas', '04121234585', 'Sector Las Aves, Casa 6F', 'J-33445566-7', 910.00),
('12345754', 'Miguel', 'Serrano', '04141234586', 'Av. Los Próceres, Apt. 7G', 'J-33445566-7', 820.00),
('12345755', 'Sofia', 'Vega', '04241234586', 'Calle La Marina, Qta. 8H', 'J-33445566-7', 930.00),
('12345756', 'Javier', 'Blanco', '04161234586', 'Urb. Carrizal, Edif. 9I', 'J-33445566-7', 880.00),
('12345757', 'Valentina', 'Pinto', '04121234586', 'Av. Falcon, Casa 10J', 'J-33445566-7', 960.00),

-- Empleados para RIF: J-77889900-1 (La Estación del Auto)
('12345758', 'Andres', 'Acosta', '04141234587', 'Av. Cajigal, Edif. 1A', 'J-77889900-1', 860.00),
('12345759', 'Daniela', 'Quintero', '04241234587', 'Calle La Cruz, Casa 2B', 'J-77889900-1', 920.00),
('12345760', 'Fernando', 'Suarez', '04161234587', 'Urb. Nueva Barcelona, Qta. 3C', 'J-77889900-1', 810.00),
('12345761', 'Isabella', 'Marquez', '04121234587', 'Av. Intercomunal, Piso 4D', 'J-77889900-1', 940.00),
('12345762', 'Luis', 'Gonzalez', '04141234588', 'Calle El Saman, Edif. 5E', 'J-77889900-1', 890.00),
('12345763', 'Gabriela', 'Ramirez', '04241234588', 'Sector Tronconal, Casa 6F', 'J-77889900-1', 970.00),
('12345764', 'Manuel', 'Contreras', '04161234588', 'Av. Costanera, Apt. 7G', 'J-77889900-1', 830.00),
('12345765', 'Natalia', 'Nuñez', '04121234588', 'Calle San Felipe, Qta. 8H', 'J-77889900-1', 900.00),
('12345766', 'Ricardo', 'Velez', '04141234589', 'Urb. Colinas del Neverí, Edif. 9I', 'J-77889900-1', 850.00),
('12345767', 'Elena', 'Acosta', '04241234589', 'Av. El Ejercito, Casa 10J', 'J-77889900-1', 910.00),

-- Empleados para RIF: J-44556677-8 (Servicio Total Vehicular)
('12345768', 'Diego', 'Silva', '04161234589', 'Av. Bolívar, Edif. 1A', 'J-44556677-8', 840.00),
('12345769', 'Sara', 'Ramos', '04121234589', 'Calle Páez, Casa 2B', 'J-44556677-8', 930.00),
('12345770', 'Pablo', 'Aguilar', '04141234590', 'Urb. La Barraca, Qta. 3C', 'J-44556677-8', 800.00),
('12345771', 'Paula', 'Bravo', '04241234590', 'Av. Sucre, Piso 4D', 'J-44556677-8', 960.00),
('12345772', 'Alejandro', 'Leon', '04161234590', 'Calle Mariño, Edif. 5E', 'J-44556677-8', 880.00),
('12345773', 'Valeria', 'Guillen', '04121234590', 'Sector Los Samanes, Casa 6F', 'J-44556677-8', 920.00),
('12345774', 'Sergio', 'Perez', '04141234591', 'Av. Los Mangos, Apt. 7G', 'J-44556677-8', 810.00),
('12345775', 'Mariana', 'Diaz', '04241234591', 'Calle El Limón, Qta. 8H', 'J-44556677-8', 940.00),
('12345776', 'Jorge', 'Hernandez', '04161234591', 'Urb. San Jacinto, Edif. 9I', 'J-44556677-8', 860.00),
('12345777', 'Sofia', 'Torres', '04121234591', 'Av. La Victoria, Casa 10J', 'J-44556677-8', 900.00),

-- Empleados para RIF: J-12345678-9 (Servicentro Rápido Guayana - Extra para llegar a 100)
('12345778', 'Roberto', 'Moreno', '04141234592', 'Av. Ppal de Alta Vista, Edif. 1A', 'J-12345678-9', 855.00),
('12345779', 'Camila', 'Bravo', '04241234592', 'Calle Los Sauces, Casa 2B', 'J-12345678-9', 905.00),
('12345780', 'Oscar', 'Nuñez', '04161234592', 'Urb. Gran Sabana, Qta. 3C', 'J-12345678-9', 805.00),
('12345781', 'Victoria', 'Vargas', '04121234592', 'Av. Las Delicias, Piso 4D', 'J-12345678-9', 955.00),
('12345782', 'Emilio', 'Jimenez', '04141234593', 'Calle San Felix, Edif. 5E', 'J-12345678-9', 875.00),
('12345783', 'Florencia', 'Mendez', '04241234593', 'Sector Manoa, Casa 6F', 'J-12345678-9', 915.00),
('12345784', 'Gabriel', 'Castro', '04161234593', 'Av. Guayana, Apt. 7G', 'J-12345678-9', 825.00),
('12345785', 'Andrea', 'Cruz', '04121234593', 'Calle Vista Alegre, Qta. 8H', 'J-12345678-9', 935.00),
('12345786', 'Ivan', 'Paz', '04141234594', 'Urb. Los Pinos, Edif. 9I', 'J-12345678-9', 885.00),
('12345787', 'Lucia', 'Gil', '04241234594', 'Av. Las Palomas, Casa 10J', 'J-12345678-9', 965.00),

-- Empleados para RIF: J-98765432-1 (Lubricantes El Freno - Extra para llegar a 100)
('12345788', 'Jose', 'Romero', '04161234594', 'Av. 27 de Febrero, Local 1A', 'J-98765432-1', 865.00),
('12345789', 'Sofía', 'Delgado', '04121234594', 'Calle 100, Casa 2B', 'J-98765432-1', 925.00),
('12345790', 'David', 'Fuentes', '04141234595', 'Sector La Floresta, Edif. 3C', 'J-98765432-1', 815.00),
('12345791', 'Mariana', 'Leon', '04241234595', 'Paseo La Marina, Qta. 4D', 'J-98765432-1', 945.00),
('12345792', 'Daniel', 'Rivera', '04161234595', 'Urb. La Floresta, Apt. 5E', 'J-98765432-1', 895.00),
('12345793', 'Paola', 'Reyes', '04121234595', 'Calle Junín, Casa 6F', 'J-98765432-1', 975.00),
('12345794', 'Felipe', 'Morales', '04141234596', 'Av. Los Rosales, Edif. 7G', 'J-98765432-1', 835.00),
('12345795', 'Valeria', 'Blanco', '04241234596', 'Sector Bella Vista, Qta. 8H', 'J-98765432-1', 905.00),
('12345796', 'Hector', 'Pinto', '04161234596', 'Calle Miranda, Apt. 9I', 'J-98765432-1', 855.00),
('12345797', 'Veronica', 'Salazar', '04121234596', 'Urb. Los Pinos, Casa 10J', 'J-98765432-1', 915.00)
;
 

UPDATE Establecimientos SET CI_encargado = '12345684', fecha_encargado = getDAte() WHERE RIF = (SELECT RIF_establecimiento FROM Empleados WHERE CI_emp = '12345684'); 
UPDATE Establecimientos SET CI_encargado = '12345691', fecha_encargado = getDAte() WHERE RIF = (SELECT RIF_establecimiento FROM Empleados WHERE CI_emp = '12345691'); 
UPDATE Establecimientos SET CI_encargado = '12345705', fecha_encargado = getDAte() WHERE RIF = (SELECT RIF_establecimiento FROM Empleados WHERE CI_emp = '12345705'); 
UPDATE Establecimientos SET CI_encargado = '12345728', fecha_encargado = getDAte() WHERE RIF = (SELECT RIF_establecimiento FROM Empleados WHERE CI_emp = '12345728'); 
UPDATE Establecimientos SET CI_encargado = '12345727', fecha_encargado = getDAte() WHERE RIF = (SELECT RIF_establecimiento FROM Empleados WHERE CI_emp = '12345727'); 
UPDATE Establecimientos SET CI_encargado = '12345752', fecha_encargado = getDAte() WHERE RIF = (SELECT RIF_establecimiento FROM Empleados WHERE CI_emp = '12345752'); 
UPDATE Establecimientos SET CI_encargado = '12345767', fecha_encargado = getDAte() WHERE RIF = (SELECT RIF_establecimiento FROM Empleados WHERE CI_emp = '12345767'); 
UPDATE Establecimientos SET CI_encargado = '12345768', fecha_encargado = getDAte() WHERE RIF = (SELECT RIF_establecimiento FROM Empleados WHERE CI_emp = '12345768'); 
UPDATE Establecimientos SET CI_encargado = '12345738', fecha_encargado = getDAte() WHERE RIF = (SELECT RIF_establecimiento FROM Empleados WHERE CI_emp = '12345738'); 
UPDATE Establecimientos SET CI_encargado = '12345790', fecha_encargado = getDAte() WHERE RIF = (SELECT RIF_establecimiento FROM Empleados WHERE CI_emp = '12345790'); 



--insertamos los servicios 
INSERT INTO Servicios ( nombre_ser) VALUES 
('Lavado y Pulitura de Carrocería'),
('Lavado y Pulitura de  Motor y Chasis'),
('Cambio de Aceite'),
('Limpieza de Tapicería '),
('Pulitura de Cristales y Sellado'),
('Descontaminación de Pintura'),
('Limpieza y Acondicionamiento de Cuero'),
('Tratamiento Hidrofóbico para Carrocería'),
('Revisión y Ajuste de Frenos'),
('Cambio de Pastillas y Discos de Freno'),
('Reemplazo de Amortiguadores y Espirales'),
('Revisión y Recarga de Aire Acondicionado'),
('Servicio de Inyectores'),
('Diagnóstico de Tren Delantero'),
('Detallado Interior Premium'),
('Mantenimiento Básico Preventivo Integral'),
('Restauración y Protección de Pintura'),
('Servicio Integral de Frenos'),
('Paquete de Limpieza y Protección Exterior Superior');

--Insertamos actividades
-- Actividades para el Servicio: 1 - Lavado y Pulitura de Carrocería
INSERT INTO Actividades (nro_servicio, nombre, descripcion, costo) VALUES
-- Actividades para el Servicio: 1 - Lavado y Pulitura de Carrocería
(1, 'Aspirado del Vehículo', 'Eliminación de polvo y suciedad del interior del vehículo.', 1.50),
(1, 'Lavado de Carrocería', 'Limpieza profunda de la superficie exterior del vehículo con jabón especializado.', 2.50),
(1, 'Pulitura de Carrocería', 'Aplicación y frotado de pulimento para restaurar el brillo y eliminar pequeñas imperfecciones.', 5.00),
(1, 'Lavado de Rines y Cauchos', 'Limpieza y desengrase de rines y neumáticos para eliminar suciedad y polvo de frenos.', 1.00),

-- Actividades para el Servicio: 2 - Lavado y Pulitura de Motor y Chasis
(2, 'Lavado del Motor', 'Limpieza del motor utilizando métodos en seco o con líquidos especiales.', 3.00),
(2, 'Lavado del Chasis', 'Limpieza de la parte inferior del vehículo para eliminar barro y suciedad acumulada.', 3.00),
(2, 'Aplicación de Grafito en Chasis', 'Aplicación de grafito para proteger el chasis contra la corrosión y reducir fricción.', 4.00),

-- Actividades para el Servicio: 3 - Cambio de Aceite
(3, 'Extracción de Aceite Usado', 'Drenado completo del aceite de motor usado.', 0.00),
(3, 'Reemplazo de Filtro de Aceite', 'Remoción del filtro viejo e instalación de uno nuevo.', 0.00),
(3, 'Relleno con Nuevo Aceite', 'Adición de la cantidad correcta de aceite nuevo al motor.', 0.00),

-- Actividades para el Servicio: 4 - Limpieza de Tapicería
(4, 'Aspirado Profundo de Tapicería', 'Aspirado exhaustivo para eliminar polvo, migas y suciedad suelta.', 1.50),
(4, 'Lavado de Tapicería', 'Aplicación de productos y limpieza húmeda de todas las superficies de tela.', 2.00),
(4, 'Secado de Tapicería', 'Proceso de secado para evitar humedad y malos olores.', 1.50),
(4, 'Desodorización Interior', 'Aplicación de productos para eliminar malos olores y dejar una fragancia fresca.', 0.00),
(4, 'Desmanchado de Tapicería', 'Tratamiento específico para eliminar manchas difíciles en la tapicería.', 2.00),

-- Actividades para el Servicio: 5 - Pulitura de Cristales y Sellado
(5, 'Limpieza Detallada de Cristales', 'Limpieza minuciosa de todas las superficies de cristal, interior y exterior.', 3.00),
(5, 'Pulitura de Cristales', 'Proceso para eliminar marcas de agua, pequeños arañazos y mejorar la transparencia.', 7.00),
(5, 'Aplicación de Sellador Hidrofóbico', 'Aplicación de un producto que repele el agua para mejorar la visibilidad y facilidad de limpieza.', 5.00),

-- Actividades para el Servicio: 6 - Descontaminación de Pintura
(6, 'Lavado y Secado Pre-tratamiento', 'Lavado inicial para eliminar suciedad superficial antes de la descontaminación.', 3.00),
(6, 'Aplicación de Descontaminante Férrico', 'Rociado de producto para disolver partículas de hierro incrustadas.', 8.00),
(6, 'Uso de Barra de Arcilla (Clay Bar)', 'Proceso manual con clay bar para eliminar contaminantes adheridos a la pintura.', 12.00),
(6, 'Enjuague y Secado Final', 'Enjuague y secado para preparar la superficie para el siguiente paso (pulido o protección).', 2.00),

-- Actividades para el Servicio: 7 - Limpieza y Acondicionamiento de Cuero
(7, 'Aspirado de Superficies de Cuero', 'Remoción de polvo y residuos de todas las áreas de cuero.', 2.00),
(7, 'Limpieza Profunda de Cuero', 'Aplicación y frotado de limpiador específico para cuero para eliminar suciedad y grasa.', 10.00),
(7, 'Acondicionamiento y Nutrición de Cuero', 'Aplicación de un bálsamo o acondicionador para hidratar y proteger el cuero.', 8.00),

-- Actividades para el Servicio: 8 - Tratamiento Hidrofóbico para Carrocería
(8, 'Preparación de Superficie', 'Lavado, secado y descontaminación ligera para asegurar la adhesión del tratamiento.', 10.00),
(8, 'Aplicación de Capa Base Hidrofóbica', 'Aplicación meticulosa del recubrimiento cerámico o sellador hidrofóbico.', 25.00),
(8, 'Curado y Secado Inicial', 'Tiempo de espera y secado para que el producto se adhiera correctamente a la pintura.', 5.00),
(8, 'Inspección Final y Retiro de Excesos', 'Revisión minuciosa y pulido suave para un acabado perfecto.', 5.00),

-- Actividades para el Servicio: 9 - Revisión y Ajuste de Frenos
(9, 'Inspección Visual de Componentes de Freno', 'Revisión de pastillas, discos, cálipers, latiguillos y nivel de líquido de frenos.', 10.00),
(9, 'Limpieza y Lubricación de Cáliper', 'Limpieza de los componentes del cáliper y lubricación de pines de deslizamiento.', 15.00),
(9, 'Ajuste del Freno de Mano', 'Verificación y ajuste de la tensión del cable del freno de estacionamiento.', 10.00),
(9, 'Prueba de Frenado y Seguridad', 'Prueba en carretera para verificar el correcto funcionamiento del sistema.', 5.00),

-- Actividades para el Servicio: 10 - Cambio de Pastillas y Discos de Freno
(10, 'Desmontaje de Rueda y Cáliper', 'Retiro de la rueda y desarme del conjunto del cáliper de freno.', 15.00),
(10, 'Remoción de Pastillas y Discos Viejos', 'Extracción de las pastillas gastadas y los discos de freno usados.', 15.00),
(10, 'Limpieza de la Masa y Soporte', 'Limpieza de la superficie de montaje del disco y el soporte del cáliper.', 10.00),
(10, 'Instalación de Pastillas y Discos Nuevos', 'Montaje de los nuevos discos y pastillas de freno.', 20.00),
(10, 'Purga del Sistema de Frenos (si es necesario)', 'Eliminación de aire del sistema hidráulico para asegurar una presión adecuada.', 15.00),
(10, 'Montaje de Rueda y Prueba Final', 'Reinstalación de la rueda y prueba de frenado para verificar la eficacia.', 10.00),

-- Actividades para el Servicio: 11 - Reemplazo de Amortiguadores y Espirales
(11, 'Desmontaje de Rueda y Conjunto de Suspensión', 'Remoción de la rueda y los componentes antiguos del amortiguador/espiral.', 20.00),
(11, 'Instalación de Amortiguadores y Espirales Nuevos', 'Montaje de los nuevos componentes de suspensión en su lugar.', 30.00),
(11, 'Revisión de Componentes Adyacentes', 'Inspección de bujes, rótulas y otros elementos cercanos por desgaste.', 10.00),
(11, 'Montaje de Rueda y Ajuste Inicial', 'Reinstalación de la rueda y ajuste básico de torque.', 10.00),
(11, 'Prueba de Conducción', 'Verificación del comportamiento del vehículo después del reemplazo.', 10.00),

-- Actividades para el Servicio: 12 - Revisión y Recarga de Aire Acondicionado
(12, 'Diagnóstico de Presión y Fugas A/C', 'Verificación de la presión del sistema y búsqueda de posibles fugas.', 15.00),
(12, 'Recuperación de Refrigerante Antiguo', 'Extracción segura del refrigerante y aceite viejos del sistema.', 10.00),
(12, 'Realización de Vacío en el Sistema', 'Eliminación de aire y humedad del circuito para una recarga eficiente.', 15.00),
(12, 'Recarga de Refrigerante y Aceite de Compresor', 'Relleno del sistema con la cantidad y tipo correcto de refrigerante y lubricante.', 20.00),
(12, 'Prueba de Funcionamiento del A/C', 'Verificación de la temperatura de salida y eficiencia del sistema.', 5.00),

-- Actividades para el Servicio: 13 - Servicio de Inyectores
(13, 'Diagnóstico Inicial de Inyectores', 'Pruebas preliminares para identificar inyectores defectuosos o sucios (prueba de goteo, pulverización).', 15.00),
(13, 'Desmontaje de Inyectores del Motor', 'Remoción cuidadosa de los inyectores del riel de combustible.', 20.00),
(13, 'Limpieza Ultrasónica de Inyectores', 'Proceso de limpieza profunda de los inyectores en una máquina de ultrasonido.', 25.00),
(13, 'Prueba de Patrón y Caudal Post-Limpieza', 'Verificación de la uniformidad de pulverización y el caudal de los inyectores limpiados.', 15.00),
(13, 'Reemplazo de Sellos y Empaques (O-rings)', 'Instalación de nuevos sellos y empaques para asegurar un sellado hermético.', 5.00),
(13, 'Reinstalación de Inyectores en el Motor', 'Montaje seguro de los inyectores y conexión de las líneas de combustible.', 15.00),

-- Actividades para el Servicio: 14 - Diagnóstico de Tren Delantero
(14, 'Inspección Visual Detallada', 'Examen de rótulas, terminales de dirección, bujes de suspensión, amortiguadores y espirales.', 10.00),
(14, 'Prueba de Holguras y Movimiento', 'Verificación de cualquier juego excesivo en los componentes del tren delantero.', 15.00),
(14, 'Evaluación de Alineación y Desgaste Irregular de Neumáticos', 'Revisión del desgaste de los neumáticos y la geometría de la dirección.', 10.00),
(14, 'Informe de Recomendaciones', 'Elaboración de un informe con las fallas encontradas y las reparaciones sugeridas.', 5.00);
 
--Agregamos los servicios a los establecimientos 
INSERT INTO ServiciosOfrecidos (RIF_establecimiento, nro_servicio) VALUES
-- Servicios para 'J-12345678-9' - Servicentro Rápido Guayana (Enfocado en lavado, pulitura y mantenimiento básico)
('J-12345678-9', 1),  -- Lavado y Pulitura de Carrocería
('J-12345678-9', 2),  -- Lavado y Pulitura de Motor y Chasis
('J-12345678-9', 3),  -- Cambio de Aceite
('J-12345678-9', 4),  -- Limpieza de Tapicería
('J-12345678-9', 16), -- Mantenimiento Básico Preventivo Integral (Nuevo Servicio Combinado)
('J-12345678-9', 19), -- Paquete de Limpieza y Protección Exterior Superior (Nuevo Servicio Combinado)

-- Servicios para 'J-98765432-1' - Lubricantes El Freno (Especializado en fluidos y frenos)
('J-98765432-1', 3),  -- Cambio de Aceite
('J-98765432-1', 9),  -- Revisión y Ajuste de Frenos
('J-98765432-1', 10), -- Cambio de Pastillas y Discos de Freno
('J-98765432-1', 14), -- Diagnóstico de Tren Delantero
('J-98765432-1', 18), -- Servicio Integral de Frenos (Nuevo Servicio Combinado)
('J-98765432-1', 16), -- Mantenimiento Básico Preventivo Integral (Nuevo Servicio Combinado)

-- Servicios para 'J-11223344-5' - AutoLavado Brillante (Enfocado en estética y detallado)
('J-11223344-5', 1),  -- Lavado y Pulitura de Carrocería
('J-11223344-5', 4),  -- Limpieza de Tapicería
('J-11223344-5', 5),  -- Pulitura de Cristales y Sellado
('J-11223344-5', 6),  -- Descontaminación de Pintura
('J-11223344-5', 7),  -- Limpieza y Acondicionamiento de Cuero
('J-11223344-5', 8),  -- Tratamiento Hidrofóbico para Carrocería
('J-11223344-5', 15), -- Detallado Interior Premium (Nuevo Servicio Combinado)
('J-11223344-5', 17), -- Restauración y Protección de Pintura (Nuevo Servicio Combinado)
('J-11223344-5', 19), -- Paquete de Limpieza y Protección Exterior Superior (Nuevo Servicio Combinado)

-- Servicios para 'J-55667788-9' - Taller Mecánico La Ruta (Amplia gama de mantenimiento)
('J-55667788-9', 3),  -- Cambio de Aceite
('J-55667788-9', 9),  -- Revisión y Ajuste de Frenos
('J-55667788-9', 10), -- Cambio de Pastillas y Discos de Freno
('J-55667788-9', 11), -- Reemplazo de Amortiguadores y Espirales
('J-55667788-9', 12), -- Revisión y Recarga de Aire Acondicionado
('J-55667788-9', 13), -- Servicio de Inyectores
('J-55667788-9', 14), -- Diagnóstico de Tren Delantero
('J-55667788-9', 16), -- Mantenimiento Básico Preventivo Integral
('J-55667788-9', 18), -- Servicio Integral de Frenos

-- Servicios para 'J-00112233-4' - Centro Automotriz Innova (Generalista con enfoque en diagnóstico)
('J-00112233-4', 3),  -- Cambio de Aceite
('J-00112233-4', 9),  -- Revisión y Ajuste de Frenos
('J-00112233-4', 12), -- Revisión y Recarga de Aire Acondicionado
('J-00112233-4', 13), -- Servicio de Inyectores
('J-00112233-4', 14), -- Diagnóstico de Tren Delantero
('J-00112233-4', 16), -- Mantenimiento Básico Preventivo Integral

-- Servicios para 'J-23456789-0' - El Rey de los Filtros (Especializado en filtración y fluidos)
('J-23456789-0', 3),  -- Cambio de Aceite
('J-23456789-0', 16), -- Mantenimiento Básico Preventivo Integral (cubre filtro de aceite)
('J-23456789-0', 12), -- Revisión y Recarga de Aire Acondicionado (filtros de habitáculo)

-- Servicios para 'J-87654321-0' - Mantenimiento Express (Servicios rápidos y esenciales)
('J-87654321-0', 1),  -- Lavado y Pulitura de Carrocería
('J-87654321-0', 3),  -- Cambio de Aceite
('J-87654321-0', 9),  -- Revisión y Ajuste de Frenos
('J-87654321-0', 16), -- Mantenimiento Básico Preventivo Integral

-- Servicios para 'J-33445566-7' - Soluciones Automotrices C.A. (Variedad de servicios de taller)
('J-33445566-7', 3),  -- Cambio de Aceite
('J-33445566-7', 9),  -- Revisión y Ajuste de Frenos
('J-33445566-7', 11), -- Reemplazo de Amortiguadores y Espirales
('J-33445566-7', 12), -- Revisión y Recarga de Aire Acondicionado
('J-33445566-7', 14), -- Diagnóstico de Tren Delantero
('J-33445566-7', 16), -- Mantenimiento Básico Preventivo Integral

-- Servicios para 'J-77889900-1' - La Estación del Auto (Combinación de lavado y servicios rápidos)
('J-77889900-1', 1),  -- Lavado y Pulitura de Carrocería
('J-77889900-1', 2),  -- Lavado y Pulitura de Motor y Chasis
('J-77889900-1', 3),  -- Cambio de Aceite
('J-77889900-1', 4),  -- Limpieza de Tapicería
('J-77889900-1', 16), -- Mantenimiento Básico Preventivo Integral
('J-77889900-1', 19), -- Paquete de Limpieza y Protección Exterior Superior

-- Servicios para 'J-44556677-8' - Servicio Total Vehicular (Cobertura casi total)
('J-44556677-8', 1),  -- Lavado y Pulitura de Carrocería
('J-44556677-8', 2),  -- Lavado y Pulitura de Motor y Chasis
('J-44556677-8', 3),  -- Cambio de Aceite
('J-44556677-8', 4),  -- Limpieza de Tapicería
('J-44556677-8', 5),  -- Pulitura de Cristales y Sellado
('J-44556677-8', 6),  -- Descontaminación de Pintura
('J-44556677-8', 7),  -- Limpieza y Acondicionamiento de Cuero
('J-44556677-8', 8),  -- Tratamiento Hidrofóbico para Carrocería
('J-44556677-8', 9),  -- Revisión y Ajuste de Frenos
('J-44556677-8', 10), -- Cambio de Pastillas y Discos de Freno
('J-44556677-8', 11), -- Reemplazo de Amortiguadores y Espirales
('J-44556677-8', 12), -- Revisión y Recarga de Aire Acondicionado
('J-44556677-8', 13), -- Servicio de Inyectores
('J-44556677-8', 14), -- Diagnóstico de Tren Delantero
('J-44556677-8', 15), -- Detallado Interior Premium  
('J-44556677-8', 16), -- Mantenimiento Básico Preventivo Integral
('J-44556677-8', 17), -- Restauración y Protección de Pintura
('J-44556677-8', 18), -- Servicio Integral de Frenos
('J-44556677-8', 19)  -- Paquete de Limpieza y Protección Exterior Superior
;


INSERT INTO Clientes (CI_cliente, nombre_Cli, apellido_cli,email) VALUES 
('10234567', 'Ana', 'González', 'ana.gonzalez@email.com'),
('11345678', 'Luis', 'Pérez', 'luis.perez@email.com'),
('12456789', 'María', 'Rodríguez', 'maria.rodriguez@email.com'),
('13567890', 'Carlos', 'López', 'carlos.lopez@email.com'),
('14678901', 'Laura', 'Martínez', 'laura.martinez@email.com'),
('15789012', 'Pedro', 'Díaz', 'pedro.diaz@email.com'),
('16890123', 'Sofía', 'Sánchez', 'sofia.sanchez@email.com'),
('17901234', 'José', 'Ramírez', 'jose.ramirez@email.com'),
('18012345', 'Valentina', 'Torres', 'valentina.torres@email.com'),
('19123456', 'Miguel', 'Flores', 'miguel.flores@email.com'),
('20234567', 'Isabella', 'Rojas', 'isabella.rojas@email.com'),
('21345678', 'Daniel', 'Morales', 'daniel.morales@email.com'),
('22456789', 'Camila', 'García', 'camila.garcia@email.com'),
('23567890', 'Alejandro', 'Hernández', 'alejandro.hernandez@email.com'),
('24678901', 'Andrea', 'Castro', 'andrea.castro@email.com'),
('25789012', 'Ricardo', 'Silva', 'ricardo.silva@email.com'),
('26890123', 'Valeria', 'Ruiz', 'valeria.ruiz@email.com'),
('27901234', 'Francisco', 'Álvarez', 'francisco.alvarez@email.com'),
('28012345', 'Paola', 'Jiménez', 'paola.jimenez@email.com'),
('29123456', 'Gabriel', 'Vargas', 'gabriel.vargas@email.com');


--agregamos numeros de telefonos 
INSERT INTO telefonosCliente (numero,CI_cliente) VALUES
('04141234567', '10234567'),
('04241234567', '10234567'),
('04142345678', '11345678'),
('04242345678', '11345678'),
('04143456789', '12456789'),
('04243456789', '12456789'),
('04144567890', '13567890'),
('04244567890', '13567890'),
('04145678901', '14678901'),
('04245678901', '14678901'),
('04146789012', '15789012'),
('04246789012', '15789012'),
('04147890123', '16890123'),
('04247890123', '16890123'),
('04148901234', '17901234'),
('04248901234', '17901234'),
('04149012345', '18012345'),
('04249012345', '18012345'),
('04140123456', '19123456'),
('04240123456', '19123456'),
('04141122334', '20234567'),
('04241122334', '20234567'),
('04142233445', '21345678'),
('04242233445', '21345678'),
('04143344556', '22456789'),
('04243344556', '22456789'),
('04144455667', '23567890'),
('04244455667', '23567890'),
('04145566778', '24678901'),
('04245566778', '24678901'),
('04146677889', '25789012'),
('04246677889', '25789012'),
('04147788990', '26890123'),
('04247788990', '26890123'),
('04148899001', '27901234'),
('04248899001', '27901234'),
('04149900112', '28012345'),
('04249900112', '28012345'),
('04140011223', '29123456'),
('04240011223', '29123456');

use MU_DB; 
--agregamos vehiculos 
INSERT INTO Vehiculos (placa,aceite_utilizado_motor,aceite_utilizado_caja,meses_uso,id_modelo,id_marca,CI_dueño,kilometraje,resumen_mantenimiento) VALUES 
-- Agregamos vehiculos con kilometraje y resumen_mantenimient
-- Modelos 1-5 (Toyota, id_marca=1)
('ABC1234', '10W-40 Sintetico', 'ATF Dexron III', 24, 1, 1, '10234567', 45000, 'Cambio de aceite, filtro de aire, revisión general.'), -- Corolla Sedán XLE
('XYZ5678', '5W-30 Mineral', 'Manual 75W-90', 36, 2, 1, '10234567', 75000, 'Revisión de frenos, cambio de aceite de caja, rotación de neumáticos.'), -- Hilux SRV 4x4
('DEF9012', '15W-40 Diesel', 'ATF Mercon V', 18, 3, 1, '11345678', 30000, 'Mantenimiento de 30K, revisión híbrida, cambio de filtros.'), -- RAV4 Híbrida Limited

-- Modelos 6-10 (Ford, id_marca=2)
('GHI3456', '5W-40 Sintetico', 'CVT Fluid', 48, 6, 2, '11345678', 90000, 'Cambio de bujías, limpieza de inyectores, alineación.'), -- F-150 XLT
('JKL7890', '20W-50 Mineral', 'ATF Dexron VI', 12, 7, 2, '12456789', 20000, 'Primer mantenimiento, revisión de líquidos, balanceo.'), -- Mustang GT
('MNO1234', '10W-30 Semi-Sintetico', 'Manual 80W-90', 30, 8, 2, '12456789', 55000, 'Cambio de aceite y filtro, revisión de suspensión.'), -- Explorer Limited

-- Modelos 11-15 (Chevrolet, id_marca=3)
('PQR5678', '5W-30 Sintetico', 'DCT Fluid', 60, 11, 3, '13567890', 110000, 'Reemplazo de pastillas de freno delanteras, cambio de correa.'), -- Silverado LTZ
('STU9012', '15W-30 Mineral', 'ATF +4', 42, 12, 3, '13567890', 80000, 'Revisión de motor, cambio de aceite de caja, revisión de neumáticos.'), -- Camaro SS
('VWX3456', '0W-20 Sintetico', 'ATF Dexron VI', 6, 13, 3, '14678901', 12000, 'Mantenimiento inicial, chequeo de fluidos.'), -- Tahoe Premier

-- Modelos 16-20 (Volkswagen, id_marca=4)
('YZA7890', '10W-40 Sintetico', 'CVT Fluid', 28, 16, 4, '14678901', 48000, 'Cambio de aceite, filtro de polen, inspección de luces.'), -- Golf GTI
('BCD1234', '5W-30 Mineral', 'ATF Mercon LV', 15, 17, 4, '15789012', 28000, 'Revisión de frenos, alineación, balanceo.'), -- Jetta Highline
('EFG5678', '15W-40 Diesel', 'Manual 75W-80', 50, 18, 4, '15789012', 95000, 'Servicio mayor, revisión de turbo, cambio de filtros diésel.'), -- Tiguan Allspace

-- Modelos 21-25 (Mercedes-Benz, id_marca=5)
('HIJ9012', '5W-40 Sintetico', 'DCT Fluid', 20, 21, 5, '16890123', 35000, 'Mantenimiento de rutina, revisión electrónica.'), -- Clase C 300
('KLM3456', '20W-50 Mineral', 'ATF Dexron III', 33, 22, 5, '16890123', 60000, 'Cambio de aceite de motor y caja, revisión de transmisión.'), -- Clase E 450
('NOP7890', '10W-30 Semi-Sintetico', 'ATF +4', 72, 23, 5, '17901234', 130000, 'Revisión profunda, cambio de amortiguadores, sistema de escape.'), -- GLC 300

-- Modelos 26-30 (BMW, id_marca=6)
('QRS1234', '5W-30 Sintetico', 'CVT Fluid', 10, 26, 6, '17901234', 18000, 'Primer servicio, revisión de sistema iDrive.'), -- Serie 3 330i
('TUV5678', '15W-30 Mineral', 'Manual 80W-90', 22, 27, 6, '18012345', 40000, 'Cambio de aceite, filtro de cabina, revisión de frenos.'), -- Serie 5 540i
('WXY9012', '0W-20 Sintetico', 'ATF Mercon V', 4, 28, 6, '18012345', 8000, 'Chequeo pre-venta, alineación.'), -- X5 xDrive40i

-- Modelos 31-35 (Honda, id_marca=7)
('ZAB3456', '10W-40 Sintetico', 'ATF Dexron VI', 31, 31, 7, '19123456', 58000, 'Servicio de 60K, cambio de bujías, revisión de tren delantero.'), -- Civic EX
('CDE7890', '5W-30 Mineral', 'Manual 75W-90', 25, 32, 7, '19123456', 42000, 'Cambio de aceite y filtro, limpieza de aire acondicionado.'), -- CR-V Touring
('FGH1234', '15W-40 Diesel', 'ATF +4', 19, 33, 7, '20234567', 36000, 'Mantenimiento preventivo, revisión de líquidos.'), -- Accord Sport

-- Modelos 36-40 (Hyundai, id_marca=8)
('IJK5678', '5W-40 Sintetico', 'CVT Fluid', 55, 36, 8, '20234567', 105000, 'Reemplazo de neumáticos, revisión de suspensión y dirección.'), -- Elantra GLS
('LMN9012', '20W-50 Mineral', 'DCT Fluid', 14, 37, 8, '21345678', 26000, 'Mantenimiento estándar, revisión de sensores.'), -- Tucson Limited
('OPQ3456', '10W-30 Semi-Sintetico', 'ATF Dexron III', 38, 38, 8, '21345678', 70000, 'Servicio mayor, cambio de fluidos de transmisión.'), -- Santa Fe Calligraphy

-- Modelos 41-45 (Nissan, id_marca=9)
('RST7890', '5W-30 Sintetico', 'Manual 80W-90', 65, 41, 9, '22456789', 120000, 'Revisión de motor, cambio de faja de tiempo, bomba de agua.'), -- Sentra SR
('UVW1234', '15W-30 Mineral', 'ATF Mercon V', 7, 42, 9, '23567890', 14000, 'Primer servicio, chequeo de sistemas 4x4.'), -- Titan Pro-4X
('XYZ5679', '0W-20 Sintetico', 'CVT Fluid', 29, 43, 9, '24678901', 50000, 'Mantenimiento de 50K, revisión de caja CVT.'), -- Rogue SL

-- Modelos 46-50 (Audi, id_marca=10)
('ABC9012', '10W-40 Sintetico', 'ATF Dexron VI', 21, 46, 10, '25789012', 39000, 'Servicio intermedio, cambio de pastillas delanteras.'), -- A4 S Line
('DEF3456', '5W-30 Mineral', 'Manual 75W-80', 46, 47, 10, '26890123', 85000, 'Revisión de transmisión, cambio de refrigerante.'), -- Q5 S Line
('GHI7890', '15W-40 Diesel', 'DCT Fluid', 34, 48, 10, '27901234', 62000, 'Mantenimiento de DSG, limpieza de turbo.'), -- A3 Sportback

-- Resto de Vehiculos, ajustados con kilometraje y resumen de mantenimiento:
('HJK1234', '10W-40 Sintetico', 'Manual 75W-90', 20, 4, 1, '28012345', 38000, 'Mantenimiento regular, revisión de aire acondicionado.'),    -- Camry XSE V6
('LMN5678', '5W-30 Mineral', 'ATF Dexron III', 32, 5, 1, '28012345', 68000, 'Cambio de aceite y filtros, revisión de sistema 4x4.'),   -- Land Cruiser Prado TX-L
('OPQ9012A', '15W-40 Diesel', 'CVT Fluid', 15, 1, 1, '29123456', 29000, 'Inspección de 30K, ajuste de suspensión.'), -- Corolla Sedán XLE

('RST3456A', '5W-40 Sintetico', 'ATF Mercon V', 40, 9, 2, '29123456', 78000, 'Revisión de inyectores, cambio de filtro de combustible.'), -- Ranger XLT
('UVW7890', '20W-50 Mineral', 'Manual 80W-90', 10, 10, 2, '10234567', 19000, 'Mantenimiento de 20K, revisión de seguridad.'), -- Escape Titanium
('XYZ1234', '10W-30 Semi-Sintetico', 'DCT Fluid', 28, 6, 2, '10234567', 52000, 'Cambio de aceite de motor y caja, revisión de frenos.'), -- F-150 XLT

('ABC5678', '5W-30 Sintetico', 'ATF +4', 50, 14, 3, '11345678', 92000, 'Mantenimiento de transmisión, cambio de líquido de frenos.'), -- Equinox RS
('DEF9012A', '15W-30 Mineral', 'ATF Dexron VI', 25, 15, 3, '11345678', 47000, 'Revisión de pastillas traseras, cambio de filtro de aire.'), -- Malibu LT
('GHI3456A', '0W-20 Sintetico', 'Manual 75W-80', 8, 11, 3, '12456789', 15000, 'Servicio inicial, chequeo de luces y batería.'), -- Silverado LTZ

('JKL7890A', '10W-40 Sintetico', 'CVT Fluid', 35, 19, 4, '12456789', 67000, 'Cambio de aceite, limpieza de cuerpo de aceleración.'), -- Passat Elegance
('MNO1234A', '5W-30 Mineral', 'ATF Mercon LV', 17, 20, 4, '13567890', 31000, 'Revisión de turbo, cambio de aceite y filtros.'), -- Amarok V6 TDI
('PQR5678A', '15W-40 Diesel', 'DCT Fluid', 45, 16, 4, '13567890', 82000, 'Mantenimiento de 80K, revisión de embrague DSG.'), -- Golf GTI

('STU9012A', '5W-40 Sintetico', 'ATF Dexron III', 23, 24, 5, '14678901', 43000, 'Cambio de aceite, inspección multipunto.'), -- Clase A 200
('VWX3456A', '20W-50 Mineral', 'Manual 80W-90', 30, 25, 5, '14678901', 56000, 'Revisión general, cambio de líquido de dirección.'), -- GLE 450
('YZA7890A', '10W-30 Semi-Sintetico', 'ATF +4', 68, 21, 5, '15789012', 125000, 'Mantenimiento de 120K, reemplazo de bomba de combustible.'), -- Clase C 300

('BCD1234A', '5W-30 Sintetico', 'CVT Fluid', 12, 29, 6, '15789012', 22000, 'Servicio Básico, revisión de sensores de estacionamiento.'), -- X3 xDrive30i
('EFG5678A', '15W-30 Mineral', 'DCT Fluid', 28, 30, 6, '16890123', 50000, 'Cambio de aceite de caja, revisión de la electrónica.'), -- Serie 1 118i
('HIJ9012A', '0W-20 Sintetico', 'ATF Mercon V', 5, 26, 6, '16890123', 9000, 'Inspección de 10K, chequeo de luces interiores.'), -- Serie 3 330i

('KLM3456A', '10W-40 Sintetico', 'Manual 75W-80', 35, 34, 7, '17901234', 64000, 'Cambio de bujías, revisión de suspensión delantera.'), -- Pilot EX-L
('NOP7890A', '5W-30 Mineral', 'ATF Dexron VI', 20, 35, 7, '17901234', 37000, 'Mantenimiento estándar, limpieza de filtro de aire.'); -- HR-V Sport

--proveedores 
INSERT INTO Proveedores (RIF, razon_social, direccion, local_, telefono, persona_contacto) VALUES
('J-50011223-5', 'Suministros Automotrices del Centro', 'Av. Bolívar, Galpón #12, Zona Industrial La Hamaca', 'Maracay', '02432123456', 'Roberto Castro'),
('J-50033445-7', 'Químicos y Lubricantes Caracas S.A.', 'Calle Elice, Edif. Torre Mayor, Piso 8, Ofc. 802', 'Caracas', '02129876543', 'Daniela Ríos'),
('J-50055667-9', 'Ferretería Industrial del Sur', 'Carretera Nacional, Km 5, Sector El Palmar', 'Ciudad Bolívar', '02856234567', 'Gustavo Peña'),
('J-50077889-1', 'Componentes Eléctricos Orientales', 'Calle Principal, Centro Comercial Plaza, Nivel 1', 'Puerto La Cruz', '02812801234', 'Andrea Salazar'),
('J-50099001-3', 'Tapicería y Acabados Vehiculares', 'Av. Ppal de Lechería, Centro Empresarial Las Villas', 'Lechería', '02812867890', 'Manuel Soto'),
('J-50110112-5', 'Importadora de Repuestos del Norte', 'Av. 20 con Calle 70, Local 15', 'Barquisimeto', '02512612345', 'Patricia Guzmán'),
('J-50131415-7', 'TecnoFrenos Venezuela', 'Calle Madrid, Qta. La Rosaleda, Urb. Las Mercedes', 'Caracas', '02129934567', 'Carlos Rojas'),
('J-50152627-9', 'Distribución de Aceites La Faja', 'Av. Principal, Sector La Curva, Galpón C-4', 'El Tigre', '02832410987', 'Verónica Linares'),
('J-50173839-1', 'Herramientas de Precisión C.A.', 'Calle San Francisco, Edif. Don Pedro, Local PB', 'Valencia', '02418501234', 'Felipe Montes'),
('J-50194041-3', 'Soluciones de Diagnóstico Auto', 'Av. Urdaneta, Centro Clínico Urdaneta, Anexo A', 'Maracaibo', '02617987654', 'Mariana Blanco');

