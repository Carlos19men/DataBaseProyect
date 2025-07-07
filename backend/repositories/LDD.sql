/*
DROP TABLE telefonosCliente;    
DROP TABLE Inventario; 
DROP TABLE ActividadesOS;
DROP TABLE PagosFactura;
DROP TABLE ActividadesPlan;
DROP TABLE Compras;
DROP TABLE ActividadProductos;
DROP TABLE ServiciosOfrecidos;
DROP TABLE EspecializacionEmpleados;
DROP TABLE EmpleadosAsignados;
DROP TABLE Actividades;
DROP TABLE PlanesMantenimiento;
DROP TABLE ProveedoresAsociados;  
DROP TABLE OrdenesCompra;
DROP TABLE Proveedores;
DROP TABLE Facturas;
DROP TABLE OrdenesServicio;
DROP TABLE Vehiculos;
ALTER TABLE Empleados drop constraint RIF_establecimiento ; 
ALTER TABLE Establecimientos drop constraint CI_encargado; 
ALTER TABLE Empleados drop constraint nro_servicio_supervisar;
DROP TABLE Servicios; 
DROP TABLE Empleados; 
DROP TABLE ActualizacionesInventarios; 
DROP TABLE Establecimientos;
DROP TABLE Productos;
DROP TABLE FamiliaProductos;
DROP TABLE MetodosPago;
DROP TABLE Clientes;
DROP TABLE Modelos;
DROP TABLE Marcas;


DROP DATABASE MU_DB; */


-- Esquema de la base de datos.
create database MU_DB;



USE MU_DB; 

--creamos los establecimientos 
create table Establecimientos(
	RIF varchar(20)not null,
	CI_encargado varchar(15),
	nombre varchar(50) not null,
	ciudad varchar(40) not null,
	fecha_encargado date,
	
	primary key(RIF)
);


--creamos los empleados 
create table Empleados(
	CI_emp varchar(15) not null,
	nombre varchar(50) not null,
	apellido varchar(50) not null,
	telefono varchar(15) not null,
	direccion varchar(150) not null,
	sueldo int CHECK(sueldo > 0) not null,
	RIF_establecimiento varchar(20) not null,
	nro_servicio_supervisar int,
	
	primary key(CI_emp)
);

create table Servicios(
	nro_servicio int identity(1,1) not null,
	nombre_ser varchar(50) not null unique,
	
	primary key(nro_servicio)
);


--agregamos las llaves foraneas
alter table Empleados 
    add constraint RIF_establecimiento 
    foreign key (RIF_establecimiento) 
    references Establecimientos(RIF) 
    ON UPDATE CASCADE; 

alter table Empleados
	add constraint nro_servicio_supervisar
	foreign key (nro_servicio_supervisar)
	references Servicios(nro_servicio)
	ON DELETE SET NULL
	ON UPDATE CASCADE;

alter table Establecimientos 
    add constraint CI_encargado 
    foreign key (CI_encargado) 
    references Empleados(CI_emp);

create table Clientes(
	CI_cliente varchar(15) not null,
	nombre_cli varchar(50) not null,
	apellido_cli varchar(50) not null,
	email varchar(100) not null,
	
	primary key(CI_cliente)
);

create table Marcas(
	cod_marca int identity(1,1) not null,
	nombre_marca varchar(50) not null unique,
	
	primary key(cod_marca)
);

create table Modelos(
	cod_marca int not null,
	nro_modelo int identity(1,1) not null,
	nombre varchar(100) not null unique,
	aceite_caja varchar(30) not null,
	aceite_motor varchar(30) not null,
	octanaje varchar(2) not null check(octanaje in ('87','91', '95', '98')), 
	tipo_refrigerante varchar(25) not null,
	peso int not null,
	descripcion varchar(200) not null,
	nro_puestos int not null,
	
	primary key(cod_marca, nro_modelo),
	foreign key(cod_marca) references Marcas(cod_marca) ON UPDATE CASCADE
);

create table Vehiculos(
	codigo int identity(1,1) not null,
	placa varchar(20) not null UNIQUE,
	aceite_utilizado_motor varchar(25),
	aceite_utilizado_caja varchar(25),
	resumen_mantenimiento varchar(255),
	meses_uso INT CHECK(meses_uso >= 0),
	kilometraje decimal(10,2) check(kilometraje >= 0),
	id_modelo int not null,
	id_marca int not null,
	CI_dueño varchar(15) not null,
	
	primary key(codigo),
	foreign key(id_marca,id_modelo) references Modelos(cod_marca, nro_modelo),  -- ON DELETE NO ACTIO																																																																																																									N (POR DEFECTO)
    foreign key(CI_dueño) references Clientes(CI_cliente) ON DELETE CASCADE
);

create table 																					vicio(
	cod_OS int identity(1,1) not null,
	fecha_entrada date not null,
	hora_entrada time not null,
	hora_estimada_salida time not null,
	hora_real_salida time,
	fecha_salida date,
	justificacion varchar(255),
	persona_autorizada varchar(50),
	codigo_vehiculo int not null,
	RIF_establecimiento VARCHAR(20) not null,
	
	primary key(cod_OS),
	foreign key(codigo_vehiculo) references Vehiculos(codigo) ON DELETE CASCADE,
	foreign key(RIF_establecimiento) REFERENCES Establecimientos(RIF) ON DELETE CASCADE 
);

create table Facturas(
	nro_factura int identity(1,1) not null,
	cod_OS int not null unique,
	descuento decimal(10,3),
	iva int not null check(iva > 0),
	monto_total decimal(10,2) check(monto_total > 0),
	fecha_emision date not null,
	
	primary key(nro_factura),
	foreign key(cod_OS) references OrdenesServicio(cod_OS) ON DELETE CASCADE
);

create table MetodosPago(
	id_pago int identity(1,1) not null,
	tipo_moneda varchar(40) check( UPPER(tipo_moneda) in ('DOLARES','BOLIVARES')),
	monto_ef decimal(10,2) check(monto_ef > 0),
	fechaPago_Tar date,
	tipo_tarjeta varchar(40),
	banco varchar(30),
	nro_tarjeta varchar(30),
	monto_tar decimal(10,2) check(monto_tar > 0),
	referenciaPM varchar(30),
	fecha_PM date,
	monto_PM decimal(10,2) check(monto_PM > 0),
	telefono varchar(15),
	
	primary key(id_pago)
);

create table OrdenesCompra(
	nro_OC int identity(1,1) not null,
	fecha_compra date not null,
	RIF_est varchar(20) not null,
	monto_total int CHECK(monto_total > 0),
	
	primary key(nro_OC),
	foreign key(RIF_est) references Establecimientos(RIF) ON DELETE CASCADE
);



create table FamiliaProductos(
	id_familia int identity(1,1) not null,
	nombre varchar(50) not null,

	primary key(id_familia)
);

create table Productos(
	id_producto int identity(1,1) not null,
	nombre varchar(50) not null,
	tipo varchar(20) not null check(UPPER(tipo) in ('ECOLÓGICO','NO ECOLÓGICO')),
	precio decimal(10,2) not null check(precio > 0),
	descripcion varchar(150),
	minimo int not null check(minimo > 0),
	maximo int not null check(maximo > 0),
	tratamiento_residuos varchar(255),
	nivel_contaminacion int check(nivel_contaminacion >= 1 and nivel_contaminacion <= 5),
	info_manejo varchar(255),
	id_familia int,
	
	primary key(id_producto),
	foreign key(id_familia) references FamiliaProductos(id_familia) ON DELETE SET NULL
);

create table Proveedores(
	RIF varchar(20) not null,
	razon_social varchar(50) not null unique,
	direccion varchar(100) not null,
	local_ varchar(15) not null,
	telefono varchar(15) not null unique,
	persona_contacto varchar(80) NOT NULL,
	
	primary key(RIF)
);

create table PlanesMantenimiento(
	cod_marca int not null,
	nro_modelo int not null,
	kilometraje decimal(10,2) not null check(kilometraje > 0),
	nombre varchar(50),
	descripcion varchar(200),
	
	primary key(cod_marca,nro_modelo, kilometraje),
	foreign key(cod_marca, nro_modelo) references Modelos(cod_marca, nro_modelo) ON DELETE CASCADE
);

create table Actividades (
	nro_servicio int not null,
	nro_correlativo int identity(1,1) not null,
	nombre varchar(255) not null,
	descripcion varchar(200) not null,
	costo decimal(10,2) not null check(costo >= 0),
	
	primary key(nro_servicio, nro_correlativo),
	foreign key(nro_servicio) references Servicios(nro_servicio) ON DELETE CASCADE
);

create table EmpleadosAsignados(
	CI_empleado varchar(15) not null,
	nro_servicio int not null,
	
	primary key(CI_empleado, nro_servicio),
	foreign key(CI_empleado) references Empleados(CI_emp) ON DELETE CASCADE,
	foreign key(nro_servicio) references Servicios(nro_servicio) ON DELETE CASCADE
);

create table EspecializacionEmpleados(
	CI_empleado varchar(15) not null,
	nro_servicio int not null,
	
	primary key(CI_empleado, nro_servicio),
	foreign key(CI_empleado) references Empleados(CI_emp) ON DELETE CASCADE,
	foreign key(nro_servicio) references Servicios(nro_servicio) ON DELETE CASCADE
);

create table ServiciosOfrecidos(
	RIF_establecimiento varchar(20) not null,
	nro_servicio int not null,
	
	primary key(RIF_establecimiento, nro_servicio),
	foreign key(RIF_establecimiento) references Establecimientos(RIF) ON DELETE CASCADE,
	foreign key(nro_servicio) references Servicios(nro_servicio) ON DELETE CASCADE
);

create table ActividadProductos(
	id_producto int not null,
	nro_servicio int not null,
	nro_correlativo int not null,
	cant_utilizada int not null check(cant_utilizada > 0),
	
	primary key(id_producto, nro_servicio, nro_correlativo),
	foreign key(nro_servicio, nro_correlativo) references Actividades(nro_servicio, nro_correlativo) ON DELETE CASCADE,
    foreign key(id_producto) references Productos(id_producto) ON DELETE CASCADE
);

create table Compras(
	nro_compra int not null,
	id_producto int not null,
	cantidad_producto int not null check(cantidad_producto > 0),
	precio_und decimal(10,2) not null check(precio_und > 0),
	
	primary key(nro_compra,id_producto),
	foreign key(nro_compra) references OrdenesCompra(nro_OC) ON DELETE CASCADE,
	foreign key(id_producto) references Productos(id_producto) ON DELETE CASCADE
); 

create table ActividadesPlan(
	cod_marca int not null,
	nro_modelo int not null,
	kilometraje decimal(10,2) not null check(kilometraje > 0),
	nro_servicio int not null,
	nro_correlativo int not null,
	
	primary key(cod_marca, nro_modelo, kilometraje, nro_servicio, nro_correlativo),
	foreign key(cod_marca, nro_modelo) references Modelos(cod_marca, nro_modelo) ON DELETE CASCADE,
	foreign key(nro_servicio, nro_correlativo) references Actividades(nro_servicio, nro_correlativo) ON DELETE CASCADE
);

create TABLE PagosFactura(
	nro_factura int not null,
	id_pago int not null,
	
	primary key(nro_factura, id_pago),
	foreign key(nro_factura) references Facturas(nro_factura) ON DELETE CASCADE,
	foreign key(id_pago) references MetodosPago(id_pago) ON DELETE CASCADE
);

create table ActividadesOS(
	cod_OS int not null,
	nro_servicio int not null,
	nro_correlativo int not null,
	id_producto int not null,
	ci_empleado VARCHAR(15) not null,
	precio_producto decimal(10,2) not null check(precio_producto > 0),
	precio_actividad decimal(10,2) not null check(precio_actividad > 0),
	cantidad int not null check(cantidad > 0),
	
	primary key(cod_OS, nro_servicio, nro_correlativo, id_producto,ci_empleado),
	foreign key(cod_OS) references OrdenesServicio(cod_OS) ON DELETE CASCADE,
	foreign key(nro_servicio,nro_correlativo) references Actividades(nro_servicio, nro_correlativo) ON DELETE CASCADE,
	foreign key(id_producto) references Productos(id_producto),
	FOREIGN KEY(ci_empleado) REFERENCES Empleados(CI_emp)
);  


create table Inventario(
	RIF_establecimiento varchar(20) not null,
	id_producto int not null,
	cantidad int not null check(cantidad >= 0),
	
	primary key(RIF_establecimiento, id_producto),
	foreign key(RIF_establecimiento) references Establecimientos(RIF) ON DELETE CASCADE,
	foreign key(id_producto) references Productos(id_producto) ON DELETE CASCADE
);

create table ActualizacionesInventarios(
	RIF_establecimiento varchar(20) not null,
	id_producto int not null,
	fecha_ajuste date not null DEFAULT CONVERT(DATE,GETDATE()),
	hora_ajuste time not null  DEFAULT CONVERT(TIME,GETDATE()),
	cantidad int not null check(cantidad > 0),
	tipo varchar(25) not null check(UPPER(tipo) in ('FALTANTE','SOBRANTE')),
	comentario varchar(200),
	
	primary key(RIF_establecimiento, id_producto, fecha_ajuste, hora_ajuste),
	foreign key(RIF_establecimiento) references Establecimientos(RIF) ON DELETE CASCADE,
	foreign key(id_producto) references Productos(id_producto) ON DELETE CASCADE
);

create table ProveedoresAsociados( 
	RIF_proveedor varchar(20) not null,
	nro_orden int not null,
	
	primary key(RIF_proveedor, nro_orden),
	foreign key (RIF_proveedor) references Proveedores(RIF) ON DELETE CASCADE,
	foreign key (nro_orden) references OrdenesCompra(nro_OC) ON DELETE CASCADE
);

create table telefonosCliente(
	numero varchar(15) not null,
	CI_cliente varchar(15) not null,
	
	primary key(numero, CI_cliente),
	foreign key (CI_cliente) references Clientes(CI_cliente) ON DELETE CASCADE
);

