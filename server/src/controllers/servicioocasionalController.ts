import {Request, Response } from 'express';

import pool from '../database';

class ServicioOcasionalesController {

    public async list (req: Request, res: Response) {
        const servicioOcasionales = await pool.query('SELECT * FROM servicio_ocasional');
        res.json(servicioOcasionales);
    }

    public async listOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const servicioOcasional = await pool.query('SELECT * FROM servicio_ocasional WHERE id_sv_ocacional = ?',[id]);
        if (servicioOcasional.length > 0) {
            return res.json(servicioOcasional[0]);
        }
        res.status(404).json({text: 'Servicio ocasional no encontrado'});
    }

    public async create (req: Request, res: Response) {
        await pool.query ('INSERT INTO servicio_ocasional set ?', [req.body]);
        res.json({message: 'Servicio ocasional guardado'});
    }

    public async update (req: Request, res: Response) {
        const { id } = req.params;
        await pool.query ('UPDATE servicio_ocasional SET ? WHERE id_sv_ocacional =?', [req.body, id]);
        res.json ({message: 'Servicio ocasional fue actualizado'});
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query ('DELETE FROM servicio_ocasional WHERE id_sv_ocacional =?', [id]);
        res.json ({message: 'Servicio ocasional fue eleminado'});
    }

}

const servicioocasionalesController = new ServicioOcasionalesController();
export default servicioocasionalesController;