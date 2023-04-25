import {Request, Response } from 'express';

import pool from '../database';

class MantenimientosController {

    public async list (req: Request, res: Response) {
        const mantenimientos = await pool.query('SELECT * FROM mantenimientos');
        res.json(mantenimientos);
    }

    public async listOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const mantenimiento = await pool.query('SELECT * FROM mantenimientos WHERE id_mantenimiento = ?',[id]);
        if (mantenimiento.length > 0) {
            return res.json(mantenimiento[0]);
        }
        res.status(404).json({text: 'Mantenimiento no encontrado'});
    }

    public async create (req: Request, res: Response) {
        await pool.query ('INSERT INTO mantenimientos set ?', [req.body]);
        res.json({message: 'Mantenimiento guardado'});
    }

    public async update (req: Request, res: Response) {
        const { id } = req.params;
        await pool.query ('UPDATE mantenimientos SET ? WHERE id_mantenimiento =?', [req.body, id]);
        res.json ({message: 'El mantenimiento fue actualizado'});
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query ('DELETE FROM mantenimientos WHERE id_mantenimiento =?', [id]);
        res.json ({message: 'El mantenimiento fue eleminado'});
    }

}

const mantenimientosController = new MantenimientosController();
export default mantenimientosController;