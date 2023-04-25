import {Request, Response } from 'express';

import pool from '../database';

class DetalleRepuestoController {

    public async list (req: Request, res: Response) {
        const detalle_reps = await pool.query('SELECT * FROM detalle_reps');
        res.json(detalle_reps);
    }

    public async listOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const detalle_reps = await pool.query('SELECT * FROM detalle_reps WHERE idDetalleRep = ?',[id]);
        if (detalle_reps.length > 0) {
            return res.json(detalle_reps[0]);
        }
        res.status(404).json({text: 'Detalle repuestos no encontrado'});
    }

    public async create (req: Request, res: Response) {
        await pool.query ('INSERT INTO detalle_reps set ?', [req.body]);
        res.json({message: 'Detalle repuestos guardado'});
    }

    public async update (req: Request, res: Response) {
        const { id } = req.params;
        await pool.query ('UPDATE detalle_reps SET ? WHERE idDetalleRep =?', [req.body, id]);
        res.json ({message: 'El detalle reps fue actualizado'});
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query ('DELETE FROM detalle_reps WHERE idDetalleRep =?', [id]);
        res.json ({message: 'El detalle_reps fue eleminado'});
    }

}

const detallerepuestoController = new DetalleRepuestoController();
export default detallerepuestoController;