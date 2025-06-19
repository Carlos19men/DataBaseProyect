-- Esquema de la base de datos.
create database MU_DB;

USE MU_DB; 

create table Empleados(
	CI_emp varchar(15) not null,
	nombre varchar(50) not null,
	apellido varchar(50) not null,
	telefono varchar(15) not null,
	direccion varchar(150) not null,
	sueldo int not null,
	RIF_establecimiento int not null,
	
	primary key(CI_emp),
	foreign key(RIF_establecimiento) references Establecimientos(RIF)
);

create table Establecimientos(
	RIF varchar(20)not null,
	CI_encargado varchar(15) not null,
	nombre varchar(50) not null,
	ciudad varchar(40) not null,
	fecha_encargado date,
	
	primary key(RIF),
	foreign key(CI_encargado) references Empleados(CI_emp)
);

create table Servicios(
	nro_servicio int not null,
	CI_superv varchar(15) not null,
	nombre_ser varchar(50) not null,
	
	primary key(nro_servicio),
	foreign key(CI_superv) references Empleados(CI_emp);
);

create table Marcas(
	cod_marca int not null,
	nombre_marca varchar(50) not null,
	
	primary key(cod_marca)
);

create table Vehiculos(
	codigo int not null,
	placa varchar(20) not null,
	aceite_utilizado_motor varchar(25) not null,
	aceite_utilizado_caja varchar(25) not null,
	resumen_mantenimiento varchar(255) not null,
	tiempo_uso decimal(10,1) not null,
	kilometraje decimal(10,2) not null,
	id_modelo int not null,
	id_marca int not null,
	CI_dueño varchar(15) not null,
	
	primary key(codigo),
	foreign key(id_marca,id_modelo) references Modelos(cod_marca, nro_modelo) 
);

create table Clientes(
	CI_cliente varchar(15) not null,
	nombre_cli varchar(50) not null,
	apellido_cli varchar(50) not null,
	email varchar(100) not null,
	
	primary key(CI_cliente)
);

create table Facturas(
	nro_factura int not null,
	cod_OS int not null,
	descuento decimal(10,3) not null,
	iva int not null,
	monto_total decimal(10,2) not null,
	fecha_emision date not null,
	
	primary key(nro_factura),
	foreign key(cod_OS) references OrdenesServicio(cod_OS)
);

create table MetodosPago(
	id_pago int not null,)
);
	tipo_moneda varchar(40),
	monto_ef decimal(10,2),
	fechaPago_Tar date,
	tipo_tarjeta varchar(40),
	banco varchar(30),
	nro_tarjeta varchar(30),
	monto_tar decimal(10,2),
	referenciaPM varchar(30),
	fecha_PM date,
	monto_PM decimal(10,2),
	telefono varchar(15),
	
	primary key(id_pago)
);

create table OrdenesServicio(
	cod_OS int not null,
	fecha_entrada date not null,
	hora_entrada time not null,
	hora_estimada_salida time not null,
	hora_real_salida time not null,
	fecha_salida date not null,
	justificacion varchar(255) not null,
	persona_autorizada varchar(50),
	codigo_vehiculo int not null,
	
	primary key(cod_OS),
	foreign key(codigo_vehiculo) references Vehiculos(codigo)
);

create table OrdenesCompra(
	nro_OC int not null,
	fecha_compra date not null,
	RIF_est varchar(20) not null,
	
	primary key(nro_OC),
	foreign key(RIF_est) references Establecimientos(RIF)
);

create table Productos(
	id_producto int not null,
	nombre varchar(50) not null,
	tipo varchar(20) not null,
	precio decimal(10,2) not null,
	descripcion varchar(150) not null,
	minimo int not null,
	maximo int not null,
	tratamiento_residuos varchar(255),
	nivel_contaminacion int,
	info_manejo varchar(255),
	id_familia int not null,
	
	primary key(id_producto),
	foreign key(id_familia) references FamiliaProductos(id_familia)
);

create table FamiliaProductos(
	id_familia int not null,
	nombre varchar(50) not null,

	primary key(id_familia)
);

create table Proveedores(
	RIF varchar(20) not null,
	razon_social varchar(50) not null,
	direccion varchar(100) not null,
	local varchar(15) not null,
	telefono varchar(15) not null,
	persona_contacto varchar(80),
	
	primary key(RIF)
);

create table Modelos(
	cod_marca int not null,
	nro_modelo int not null,
	aceite_caja varchar(30) not null,
	aceite_motor varchar(30), not null,
	octanaje varchar(2) not null, 
	tipo_refrigerante varchar(25) not null,
	peso int not null,
	descripcion varchar(200) not null,
	nro_puestos int not null,
	
	primary key(cod_marca, nro_modelo),
	foreign key(cod_marca) references Marcas(cod_marca)
);

create table PlanesMantenimiento(
	cod_marca int not null,
	nro_modelo int not null,
	kilometraje decimal(10,2) not null,
	nombre varchar(50),
	descripcion varchar(200) not null,
	costo decimal(10,2) not null,
	
	primary key(cod_marca,nro_modelo, kilometraje),
	foreign key(cod_marca, nro_modelo) references Modelos(cod_marca, nro_modelo)
);

create table Actividades (
	nro_servicio int not null,
	nro_correlativo int not null,
	nombre varchar(50) not null,
	descripcion varchar(200) not null,
	costo decimal(10,2) not null,
	
	primary key(nro_servicio, nro_correlativo),
	foreign key(nro_servicio) references Servicios(nro_servicio)
);

create table Asignados(
	CI_empleado varchar(15) not null,
	nro_servicio int not null,
	
	primary key(CI_empleado, nro_servicio),
	foreign key(CI_empleado) references Empleados(CI_emp),
	foreign key(nro_servicio) references Servicios(nro_servicio)
);

create table Especializaciones(
	CI_empleado int not null,
	nro_servicio int not null,
	
	primary key(CI_empleado, nro_servicio),
	foreign key(CI_empleado) references Empleados(CI_emp),
	foreign key(nro_servicio) references Servicios(nro_servicio)
);

create table ServiciosOfrecidos(
	RIF_establecimiento varchar(20) not null,
	nro_servicio int not null,
	
	primary key(RIF_establecimiento, nro_servicio),
	foreign key(RIF_establecimiento) references Establecimientos(RIF)
);

create table ActividadProducto(
	id_producto int not null,
	nro_servicio int not null,
	nro_correlativo int not null,
	cant_utilizada int not null,
	
	primary key(id_producto, nro_servicio,nro_correlativo),
	foreign key(nro_servicio, nro_correlativo) references Actividades(nro_servicio, nro_correlativo)
);

create table Compras(
	nro_ordencompra int not null,
	id_producto int not null,
	cantidad_producto int not null,
	precio_und int not null,
	
	primary key(nro_ordencompra),
	foreign key(id_producto) references Productos(id_producto)
); 

create table ActividadesPlan(
	cod_marca int not null,
	nro_modelo int not null,
	kilometraje decimal(10,2) not null,
	nro_servicio int not null,
	nro_correlativo int not null,
	
	primary key(cod_marca, nro_modelo, kilometraje, nro_servicio, nro_correlativo),
	foreign key(cod_marca, nro_modelo) references Modelos(cod_marca, nro_modelo),
	foreign key(nro_servicio, nro_correlativo) references Actividades(nro_servicio, nro_correlativo)
);

create TABLE PagosFactura(
	nro_factura int not null,
	id_pago int not null,
	
	primary key(nro_factura, id_pago)
	foreign key(nro_factura) references Facturas(nro_factura),
	foreign key(id_pago) references MetodosPago(id_pago)
);

create table ActividadesOS(
	cod_OS int not null,
	nro_servicio int not null,
	nro_correlativo int not null,
	id_producto int not null,
	precio_producto decimal(10,2) not null,
	precio_actividad decimal(10,2) not null,
	cantidad int not null,
	
	primary key(cod_OS, nro_servicio, nro_correlativo, id_producto),
	foreign key(cod_OS) references OrdenesServicio(cod_OS),
	foreign key(nro_servicio,nro_correlativo) references Actividades(nro_servicio, nro_correlativo),
	foreign key(id_producto) references Productos(id_producto)
);  

create table Almacena(
	RIF_establecimiento varchar(20) not null,
	id_producto int not null,
	cantidad int not null,
	
	primary key(RIF_establecimiento, id_producto),
	foreign key(RIF_establecimiento) references Establecimientos(RIF),
	foreign key(id_producto) references Productos(id_producto)
);

create table Actualiza(
	RIF_establecimiento varchar(20) not null,
	id_producto int not null,
	fecha_ajuste date not null,
	hora_ajuste time not null,
	cantidad int not null,
	tipo varchar(25) not null,
	comentario varchar(200) not null,
	
	primary key(RIF_establecimiento, id_producto, fecha_ajuste, hora_ajuste),
	foreign key(RIF_establecimiento) references Establecimientos(RIF),
	foreign key(id_producto) references Productos(id_producto)
):

create table Asociados( 
	RIF_proveedor varchar(20) not null,
	nro_orden int not null,
	
	primary key(RIF_proveedor, nro_orden),
	foreign key (RIF_proveedor) references Proveedores(RIF),
	foreign key (nro_orden) references OrdenesCompra(nro_OC)
);

create table telefonos(
	numero varchar(15) not null,
	CI_cliente varchar(15) not null,
	
	primary key(numero, CI_cliente),
	foreign key (CI_cliente) references Clientes(CI_cliente)
);