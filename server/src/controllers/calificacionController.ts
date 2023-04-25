import {Request, Response } from 'express';

import pool from '../database';

class CalificacionController {

    public async list (req: Request, res: Response) {
        const calificaciones = await pool.query('SELECT * FROM calificacion');
        res.json(calificaciones);
    }

   public async create (req: Request, res: Response) {
        await pool.query ('INSERT INTO calificacion set ?', [req.body]);
        res.json({message: 'calificacion guardada'});
    }
}

const calificacionController = new CalificacionController();
export default calificacionController;