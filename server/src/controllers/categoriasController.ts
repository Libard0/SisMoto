import {Request, Response } from 'express';

import pool from '../database';

class CategoriasController {

    public async list (req: Request, res: Response) {
        const categorias = await pool.query('SELECT * FROM categorias');
        res.json(categorias);
    }

    public async listOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const categoria = await pool.query('SELECT * FROM categorias WHERE id = ?',[id]);
        if (categoria.length > 0) {
            return res.json(categoria[0]);
        }
        res.status(404).json({text: 'Categoria no encontrada'});
    }

    public async create (req: Request, res: Response) {
        await pool.query ('INSERT INTO categorias set ?', [req.body]);
        res.json({message: 'Categoria guardada'});
    }

    public async update (req: Request, res: Response) {
        const { id } = req.params;
        await pool.query ('UPDATE categorias SET ? WHERE id =?', [req.body, id]);
        res.json ({message: 'La categoria fue actualizada'});
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query ('DELETE FROM categorias WHERE id =?', [id]);
        res.json ({message: 'La categoria fue eleminada'});
    }

}

const categoriasController = new CategoriasController();
export default categoriasController;