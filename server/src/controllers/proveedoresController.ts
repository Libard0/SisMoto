import {Request, Response } from 'express';

import pool from '../database';

class ProveedoresController {

    public async list (req: Request, res: Response) {
        const proveedores = await pool.query('SELECT * FROM proveedores');
        res.json(proveedores);
    }

    public async listOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const proveedor = await pool.query('SELECT * FROM proveedores WHERE id = ?',[id]);
        if (proveedor.length > 0) {
            return res.json(proveedor[0]);
        }
        res.status(404).json({text: 'Proveedor no encontrado'});
    }

    public async create (req: Request, res: Response) {
        await pool.query ('INSERT INTO proveedores set ?', [req.body]);
        res.json({message: 'El proveedor fue guardado'});
    }

    public async update (req: Request, res: Response) {
        const { id } = req.params;
        await pool.query ('UPDATE proveedores SET ? WHERE id =?', [req.body, id]);
        res.json ({message: 'El proveedor fue actualizado'});
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query ('DELETE FROM proveedores WHERE id =?', [id]);
        res.json ({message: 'El proveedor fue eleminado'});
    }

}

const proveedoresController = new ProveedoresController();
export default proveedoresController;