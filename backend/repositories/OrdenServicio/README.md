# Órdenes de Servicio - Documentación

## Descripción
Este módulo maneja las órdenes de servicio del sistema, incluyendo la creación, actualización, consulta y eliminación de órdenes de servicio completas con sus actividades asociadas.

## Procedimientos Almacenados

### 1. CrearOrdenServicioCompleta
Crea una nueva orden de servicio con todas sus actividades asociadas.

**Parámetros:**
- `@RIF_establecimiento VARCHAR(20)` - RIF del establecimiento (requerido)
- `@codigo_vehiculo INT` - Código del vehículo (requerido)
- `@fecha_entrada DATE` - Fecha de entrada (requerido)
- `@hora_entrada TIME` - Hora de entrada (requerido)
- `@hora_estimada_salida TIME` - Hora estimada de salida (requerido)
- `@persona_autorizada VARCHAR(50) = NULL` - Persona autorizada para retirar el vehículo (opcional)
- `@actividades ActividadOSType READONLY` - Tabla con las actividades (requerido)
- `@cod_OS INT OUTPUT` - ID de la orden creada (salida)

**Funcionalidad:**
- Crea la orden de servicio principal
- Valida existencia de actividades y productos
- Inserta todas las actividades asociadas
- Actualiza el inventario (reduce cantidades)
- Maneja transacciones con rollback automático

### 2. ActualizarOrdenServicio
Actualiza una orden de servicio existente con campos opcionales.

**Parámetros:**
- `@cod_OS INT` - ID de la orden a actualizar (requerido)
- `@codigo_vehiculo INT = NULL` - Nuevo código de vehículo (opcional)
- `@fecha_entrada DATE = NULL` - Nueva fecha de entrada (opcional)
- `@hora_entrada TIME = NULL` - Nueva hora de entrada (opcional)
- `@hora_estimada_salida TIME = NULL` - Nueva hora estimada de salida (opcional)
- `@hora_real_salida TIME = NULL` - Hora real de salida (opcional)
- `@fecha_salida DATE = NULL` - Fecha de salida (opcional)
- `@justificacion VARCHAR(255) = NULL` - Justificación (opcional)
- `@persona_autorizada VARCHAR(50) = NULL` - Nueva persona autorizada (opcional)
- `@RIF_establecimiento VARCHAR(20) = NULL` - Nuevo RIF de establecimiento (opcional)

**Funcionalidad:**
- Valida existencia de la orden
- Verifica integridad referencial de vehículos y establecimientos
- Actualiza solo los campos proporcionados
- Construye consulta SQL dinámicamente

## Tipos de Datos

### ActividadOSType
Tabla personalizada para manejar las actividades de la orden:

```sql
CREATE TYPE ActividadOSType AS TABLE
(
    nro_servicio INT NOT NULL,
    nro_correlativo INT NOT NULL,
    CI_empAsig varchar(20) NOT NULL,
    id_producto INT NOT NULL,
    precio_producto DECIMAL(10,2) NOT NULL,
    precio_actividad DECIMAL(10,2) NOT NULL,
    cantidad INT NOT NULL
);
```

## Validaciones

### Creación de Orden
- ✅ Vehículo debe existir en la tabla `Vehiculos`
- ✅ Establecimiento debe existir en la tabla `Establecimientos`
- ✅ Todas las actividades deben existir en la tabla `Actividades`
- ✅ Todos los productos deben existir en la tabla `Productos`
- ✅ Stock suficiente en inventario
- ✅ Fechas y horas en formato válido
- ✅ Persona autorizada es opcional

### Actualización de Orden
- ✅ Orden debe existir
- ✅ Vehículo debe existir (si se proporciona)
- ✅ Establecimiento debe existir (si se proporciona)
- ✅ Solo actualiza campos proporcionados

## Verificación de Datos

Antes de crear una orden de servicio, asegúrate de que existan los datos necesarios:

### Script de Verificación
Ejecuta el archivo `check_data.sql` para ver los datos existentes:

```sql
-- Verificar vehículos disponibles
SELECT codigo, placa, CI_dueño FROM Vehiculos;

-- Verificar establecimientos disponibles  
SELECT RIF, nombre FROM Establecimientos;

-- Verificar actividades disponibles
SELECT nro_servicio, nro_correlativo, nombre FROM Actividades;

-- Verificar productos disponibles
SELECT id_producto, nombre, precio FROM Productos;
```

## Códigos de Error

- `50001` - Una o más actividades especificadas no existen
- `50002` - Uno o más productos especificados no existen
- `50003` - La orden de servicio especificada no existe
- `50004` - El vehículo especificado no existe
- `50005` - El establecimiento especificado no existe

## Notas Importantes

1. **Persona Autorizada**: Es un campo opcional que sirve para indicar quién va a retirar el vehículo al finalizar el servicio.

2. **Hora Real de Salida**: Se establece como NULL al crear la orden y se actualiza cuando se completa el servicio.

3. **Inventario**: La creación de órdenes actualiza automáticamente el inventario reduciendo las cantidades de productos utilizados.

4. **Transacciones**: Todos los procedimientos manejan transacciones con rollback automático en caso de errores.

5. **Trigger Pendiente**: Se debe implementar un trigger para registrar los cambios de inventario para auditoría.

## Ejemplos de Uso

### Crear Orden sin Persona Autorizada
```sql
EXEC CrearOrdenServicioCompleta
    @RIF_establecimiento = 'J-12345678-9',
    @codigo_vehiculo = 1,
    @fecha_entrada = '2024-01-15',
    @hora_entrada = '09:00:00',
    @hora_estimada_salida = '17:00:00',
    @persona_autorizada = NULL, -- Opcional
    @actividades = @tabla_actividades,
    @cod_OS = @codigo_orden OUTPUT;
```

### Ejemplo con Datos Válidos
```json
POST /service-order/
{
  "codigo_vehiculo": 1,           // Debe existir en tabla Vehiculos
  "fecha_entrada": "2024-01-15",
  "hora_entrada": "09:00",
  "hora_estimada_salida": "17:00",
  "id_rif": "J-12345678-9",       // Debe existir en tabla Establecimientos
  "actividades": [
    {
      "nro_servicio": 1,          // Debe existir en tabla Actividades
      "nro_correlativo": 1,       // Debe existir en tabla Actividades
      "id_producto": 1,           // Debe existir en tabla Productos
      "precio_producto": 25.50,
      "precio_actividad": 100.00,
      "cantidad_producto": 2,
      "ci_empleAsig": "12345678"  // Debe existir en tabla Empleados
    }
  ]
}
```

### Actualizar Solo Persona Autorizada
```sql
EXEC ActualizarOrdenServicio
    @cod_OS = 1,
    @persona_autorizada = 'María González';
```

### Completar Servicio (Establecer Hora Real)
```sql
EXEC ActualizarOrdenServicio
    @cod_OS = 1,
    @hora_real_salida = '16:30:00',
    @fecha_salida = '2024-01-15',
    @justificacion = 'Servicio completado exitosamente';
```

## Estructura de la Tabla

```sql
CREATE TABLE OrdenesServicio(
    cod_OS int identity(1,1) not null,
    fecha_entrada date not null,
    hora_entrada time not null,
    hora_estimada_salida time not null,
    hora_real_salida time, -- Permite NULL
    fecha_salida date, -- Permite NULL
    justificacion varchar(255), -- Permite NULL
    persona_autorizada varchar(50), -- Permite NULL
    codigo_vehiculo int not null,
    RIF_establecimiento VARCHAR(20) not null,
    
    primary key(cod_OS),
    foreign key(codigo_vehiculo) references Vehiculos(codigo) ON DELETE CASCADE,
    foreign key(RIF_establecimiento) REFERENCES Establecimientos(RIF) ON DELETE CASCADE
);
```

## Endpoints de la API

### POST `/service-order/`
Crea una nueva orden de servicio completa.

### PUT `/service-order/:id`
Actualiza una orden de servicio existente.

### GET `/service-order/`
Obtiene todas las órdenes de servicio.

### GET `/service-order/:id`
Obtiene una orden de servicio por ID.

### GET `/service-order/rif/:id_rif`
Obtiene órdenes de servicio por RIF de establecimiento.

### DELETE `/service-order/:id`
Elimina una orden de servicio por ID. 