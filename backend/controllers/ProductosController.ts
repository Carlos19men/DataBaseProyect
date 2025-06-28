import { Request, Response } from 'express';
import { ProductModel } from "../models/Productos";

interface Product {
    id_producto?: number;
    nombre: string;
    tipo: string;
    precio: number;
    descripcion?: string | null;
    minimo?: number | null;
    maximo?: number | null;
    tratamiento?: string | null;
    nivelCon?: string | null;
    inf_manejo?: string | null;
    id_familia?: number | null;
}

export class ProductosController {
    model: ProductModel;

    constructor(model: ProductModel) {
        this.model = model;
    }

    // Obtener todos los productos
    getAll = async (_req: Request, res: Response): Promise<void> => {
        try {
            const products = await ProductModel.getAll();
            
            
            if (!products) {
                res.status(404).json({ message: 'No se encontraron productos.' });
                return;
            }

            res.status(200).json(products);
            return;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener productos.' });
            return;
        }
    }

    // Obtener producto por ID
    getById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const productId = parseInt(id);

        if (!id || isNaN(productId) || productId <= 0) {
            res.status(400).json({ message: 'ID de producto válido es requerido.' });
            return;
        }

        try {
            const product = await ProductModel.getById(productId);

            if (!product || (Array.isArray(product) && product.length === 0)) {
                res.status(404).json({ message: 'Producto no encontrado.' });
                return;
            }

            res.status(200).json(product);
            return;
        } catch (error) {
            console.error('Error al obtener producto por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener producto.' });
            return;
        }
    }

    // Crear nuevo producto
    create = async (req: Request, res: Response): Promise<void> => {
        const { nombre, tipo, precio, descripcion, minimo, maximo, tratamiento, nivelCon, inf_manejo, id_familia } = req.body as Product;

        if (!nombre || nombre.length === 0) {
            res.status(400).json({ message: 'El nombre del producto es requerido.' });
            return;
        }

        if (!tipo || tipo.length === 0) {
            res.status(400).json({ message: 'El tipo del producto es requerido.' });
            return;
        }

        if (!precio || precio <= 0) {
            res.status(400).json({ message: 'El precio del producto es requerido y debe ser mayor a 0.' });
            return;
        }

        try {
            const result = await ProductModel.create({
                nombre,
                tipo,
                precio,
                descripcion: descripcion || null,
                minimo: minimo || null,
                maximo: maximo || null,
                tratamiento: tratamiento || null,
                nivelCon: nivelCon || null,
                inf_manejo: inf_manejo || null,
                id_familia: id_familia || null
            });

            if (result && typeof result === 'object' && 'error' in result) {
                res.status(400).json({ message: result.error });
                return;
            }

            res.status(201).json({ message: 'Producto creado con éxito.' });
            return;
        } catch (error) {
            console.error('Error al crear producto:', error);
            res.status(500).json({ message: 'Error interno del servidor al crear producto.' });
            return;
        }
    }

    // Editar producto existente
    edit = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const productId = parseInt(id);
        const { nombre, tipo, precio, descripcion, minimo, maximo, tratamiento, nivelCon, inf_manejo, id_familia } = req.body as Product;

        if (!id || isNaN(productId) || productId <= 0) {
            res.status(400).json({ message: 'ID de producto válido es requerido.' });
            return;
        }

        if (!nombre || nombre.length === 0) {
            res.status(400).json({ message: 'El nombre del producto es requerido.' });
            return;
        }

        if (!tipo || tipo.length === 0) {
            res.status(400).json({ message: 'El tipo del producto es requerido.' });
            return;
        }

        if (!precio || precio <= 0) {
            res.status(400).json({ message: 'El precio del producto es requerido y debe ser mayor a 0.' });
            return;
        }

        try {
            const result = await ProductModel.edit({
                id_producto: productId,
                nombre,
                tipo,
                precio,
                descripcion: descripcion || null,
                minimo: minimo || null,
                maximo: maximo || null,
                tratamiento: tratamiento || null,
                nivelCon: nivelCon || null,
                inf_manejo: inf_manejo || null,
                id_familia: id_familia || null
            });

            if (result && typeof result === 'object' && 'error' in result) {
                res.status(400).json({ message: result.error });
                return;
            }

            if (!result || result[0] === 0) {
                res.status(404).json({ message: 'Producto no encontrado.' });
                return;
            }

            res.status(200).json({ message: 'Producto editado con éxito.' });
            return;
        } catch (error) {
            console.error('Error al editar producto:', error);
            res.status(500).json({ message: 'Error interno del servidor al editar producto.' });
            return;
        }
    }

    // Eliminar producto
    delete = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const productId = parseInt(id);

        if (!id || isNaN(productId) || productId <= 0) {
            res.status(400).json({ message: 'ID de producto válido es requerido.' });
            return;
        }

        try {
            const result = await ProductModel.deleteProduct(productId);

            if (!result) {
                res.status(404).json({ message: 'Producto no encontrado.' });
                return;
            }

            res.status(200).json({ message: 'Producto eliminado con éxito.' });
            return;
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            res.status(500).json({ message: 'Error interno del servidor al eliminar producto.' });
            return;
        }
    }
} 