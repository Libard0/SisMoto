import {Request, Response } from 'express';

import pool from '../database';

class ProductosController {

    public async list (req: Request, res: Response) {
        const productos = await pool.query('SELECT * FROM productos');
        res.json(productos);
    }

    public async listOne (req: Request, res: Response): Promise<any> {
        const { id }= req.params;
        const producto = await pool.query('SELECT * FROM productos WHERE id = ?',[id]);
        if (producto.length > 0) {
            return res.json(producto[0]);
        }
        res.status(404).json({text:'Producto no encontrado'});

    }

    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO productos set ?', [req.body]);
        res.json({message: 'Producto guardado'});
    }

    public async update (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query ('UPDATE productos SET ? WHERE id = ?', [req.body, id]);
        res.json ({message: 'El producto fue actualizado'});
        
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query ('DELETE FROM productos WHERE id = ?', [id]);
        res.json({message: 'El producto fue eliminado'});
    }

}

const productoscontroller = new ProductosController();
export default productoscontroller;