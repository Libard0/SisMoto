import {Request, Response } from 'express';

import pool from '../database';

class TipoServicioController {

    public async list (req: Request, res: Response) {
        const tipoServicio = await pool.query('SELECT * FROM tipos_servicio');
        res.json(tipoServicio);
    }

    public async listOne (req: Request, res: Response): Promise<any> {
        const { id_tiposervicio } = req.params;
        const tipoServicio = await pool.query('SELECT * FROM tipos_servicio WHERE id_tiposervicio = ?',[id_tiposervicio]);
        if (tipoServicio.length > 0) {
            return res.json(tipoServicio[0]);
        }
        res.status(404).json({text: 'Servicio no encontrado'});
    }

    public async create (req: Request, res: Response) {
        await pool.query ('INSERT INTO tipos_servicio set ?', [req.body]);
        res.json({message: 'Servicio guardado'});
    }

    public async update (req: Request, res: Response) {
        const { id_tiposervicio } = req.params;
        await pool.query ('UPDATE tipos_servicio SET ? WHERE id_tiposervicio =?', [req.body, id_tiposervicio]);
        res.json ({message: 'Servicio fue actualizado'});
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const { id_tiposervicio } = req.params;
        await pool.query ('DELETE FROM tipos_servicio WHERE id_tiposervicio =?', [id_tiposervicio]);
        res.json ({message: 'Servicio fue eleminado'});
    }

}

const tiposervicioController = new TipoServicioController();
export default tiposervicioController;