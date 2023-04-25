import {Request, Response } from 'express';

import pool from '../database';

class PagosController {

    public async list (req: Request, res: Response) {
        const pagos = await pool.query('SELECT * FROM pagos');
        res.json(pagos);
    }

    public async listOne (req: Request, res: Response): Promise<any> {
        const { id }= req.params;
        const pago = await pool.query('SELECT * FROM pagos WHERE id_pago = ?',[id]);
        if (pago.length > 0) {
            return res.json(pago[0]);
        }
        res.status(404).json({text:'Tipo de pago no encontrado'});

    }

    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO pagos set ?', [req.body]);
        res.json({message: 'Tipo de pago guardado'});
    }

    public async update (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query ('UPDATE pagos SET ? WHERE id_pago = ?', [req.body, id]);
        res.json ({message: 'El tipo de pago fue actualizado'});
        
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query ('DELETE FROM pagos WHERE id_pago = ?', [id]);
        res.json({message: 'El tipo de pago fue eliminado'});
    }

}

const pagoscontroller = new PagosController();
export default pagoscontroller;