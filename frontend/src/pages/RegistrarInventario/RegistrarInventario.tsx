import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/TopBar/TopBar';
import Button from '../../components/Button/button';
import styles from './RegistrarInventario.module.css';

interface Establecimiento {
    RIF: string;
    nombre: string;
}

interface FamiliaProducto {
    id_familia: number;
    nombre: string;
}

interface Producto {
    id_producto: number;
    nombreProducto: string;
    Familia: string;
}

const RegistrarInventario: React.FC = () => {
    const navigate = useNavigate();
    
    // Estados para los datos
    const [establecimientos, setEstablecimientos] = useState<Establecimiento[]>([]);
    const [familias, setFamilias] = useState<FamiliaProducto[]>([]);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
    
    // Estados para los valores seleccionados
    const [rifSeleccionado, setRifSeleccionado] = useState<string>('');
    const [familiaSeleccionada, setFamiliaSeleccionada] = useState<string>('');
    const [productoSeleccionado, setProductoSeleccionado] = useState<string>('');
    const [cantidad, setCantidad] = useState<string>('');
    
    // Estados de carga y mensajes
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [submitting, setSubmitting] = useState<boolean>(false);

    // Cargar datos iniciales
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setLoading(true);
                setError('');

                const [establecimientosRes, familiasRes, productosRes] = await Promise.all([
                    fetch('http://localhost:1234/establishement').then(r => r.json()),
                    fetch('http://localhost:1234/family-products').then(r => r.json()),
                    fetch('http://localhost:1234/product').then(r => r.json())
                ]);

                setEstablecimientos(Array.isArray(establecimientosRes) ? establecimientosRes : []);
                setFamilias(Array.isArray(familiasRes) ? familiasRes : []);
                setProductos(Array.isArray(productosRes) ? productosRes : []);
                setProductosFiltrados(Array.isArray(productosRes) ? productosRes : []);
            } catch (err) {
                setError('Error al cargar los datos. Por favor, inténtalo de nuevo.');
                console.error('Error cargando datos:', err);
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, []);

    // Filtrar productos cuando cambia la familia seleccionada
    useEffect(() => {
        if (familiaSeleccionada) {
            const familiaNombre = familias.find(f => f.id_familia.toString() === familiaSeleccionada)?.nombre;
            if (familiaNombre) {
                const filtrados = productos.filter(producto => producto.Familia === familiaNombre);
                setProductosFiltrados(filtrados);
                setProductoSeleccionado(''); // Resetear producto seleccionado
            }
        } else {
            setProductosFiltrados(productos);
            setProductoSeleccionado('');
        }
    }, [familiaSeleccionada, productos, familias]);

    // Manejar envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!rifSeleccionado || !productoSeleccionado || !cantidad) {
            setError('Por favor, completa todos los campos obligatorios.');
            return;
        }

        const cantidadNum = parseInt(cantidad);
        if (isNaN(cantidadNum) || cantidadNum < 0) {
            setError('La cantidad debe ser un número válido mayor o igual a 0.');
            return;
        }

        try {
            setSubmitting(true);
            setError('');
            setSuccess('');

            const response = await fetch('http://localhost:1234/inventory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    RIF: rifSeleccionado,
                    id_producto: parseInt(productoSeleccionado),
                    cantidad: cantidadNum
                })
            });

            if (response.ok) {
                setSuccess('Producto agregado al inventario exitosamente.');
                // Limpiar formulario
                setRifSeleccionado('');
                setFamiliaSeleccionada('');
                setProductoSeleccionado('');
                setCantidad('');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Error al agregar el producto al inventario.');
            }
        } catch (err) {
            setError('Error de conexión. Por favor, inténtalo de nuevo.');
            console.error('Error enviando datos:', err);
        } finally {
            setSubmitting(false);
        }
    };

    // Manejar cancelar
    const handleCancel = () => {
        navigate('/Inventario');
    };

    if (loading) {
        return (
            <div>
                <TopBar text="Registrar Inventario" menu={true} />
                <div className={styles.loading}>
                    Cargando datos...
                </div>
            </div>
        );
    }

    return (
        <div>
            <TopBar text="Registrar Inventario" menu={true} />
            
            <div className={styles.content}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {error && <div className={styles.error}>{error}</div>}
                    {success && <div className={styles.success}>{success}</div>}
                    
                    <div className={styles.formGroup}>
                        <label className={styles.label}>RIF del Establecimiento</label>
                        <select
                            className={styles.select}
                            value={rifSeleccionado}
                            onChange={(e) => setRifSeleccionado(e.target.value)}
                            required
                        >
                            <option value="">Selecciona un establecimiento</option>
                            {establecimientos.map((establecimiento) => (
                                <option key={establecimiento.RIF} value={establecimiento.RIF}>
                                    {establecimiento.RIF} - {establecimiento.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Familia del Producto</label>
                        <select
                            className={styles.select}
                            value={familiaSeleccionada}
                            onChange={(e) => setFamiliaSeleccionada(e.target.value)}
                        >
                            <option value="">Todas las familias</option>
                            {familias.map((familia) => (
                                <option key={familia.id_familia} value={familia.id_familia}>
                                    {familia.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Producto</label>
                        <select
                            className={styles.select}
                            value={productoSeleccionado}
                            onChange={(e) => setProductoSeleccionado(e.target.value)}
                            required
                        >
                            <option value="">Selecciona un producto</option>
                            {productosFiltrados.map((producto) => (
                                <option key={producto.id_producto} value={producto.id_producto}>
                                    {producto.nombreProducto}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Cantidad</label>
                        <input
                            className={styles.select}
                            type="number"
                            min="0"
                            value={cantidad}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCantidad(e.target.value)}
                            placeholder="Ingresa la cantidad"
                            required
                        />
                    </div>

                    <div className={styles.buttonContainer}>
                        <Button 
                            texto="Cancelar"
                            onClick={handleCancel}
                            disabled={submitting}
                            viewHeight={5}
                        />
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={submitting}
                            style={{height: '5vh', padding: '0 5%'}}
                        >
                            <span style={{ fontSize: '3vh' }}>
                                {submitting ? "Registrando..." : "Registrar"}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrarInventario; 