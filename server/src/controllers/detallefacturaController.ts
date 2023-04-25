import {Request, Response } from 'express';

import pool from '../database';

class DetalleFacturasController {

    public async list (req: Request, res: Response) {
        const detalle_factura = await pool.query('SELECT * FROM detalle_factura');
        res.json(detalle_factura);
    }

    public async listOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const detalle_factura = await pool.query('SELECT * FROM detalle_factura WHERE id_dtfact = ?',[id]);
        if (detalle_factura.length > 0) {
            return res.json(detalle_factura[0]);
        }
        res.status(404).json({text: 'Factura no encontrada'});
    }

    public async create (req: Request, res: Response) {
        await pool.query ('INSERT INTO detalle_factura set ?', [req.body]);
        res.json({message: 'Factura guardada'});
    }

    public async update (req: Request, res: Response) {
        const { id } = req.params;
        await pool.query ('UPDATE detalle_factura SET ? WHERE id_dtfact =?', [req.body, id]);
        res.json ({message: 'La factura fue actualizada'});
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query ('DELETE FROM detalle_factura WHERE id_dtfact =?', [id]);
        res.json ({message: 'La detalle_factura fue eleminada'});
    }

}

const detallefacturasController = new DetalleFacturasController();
export default detallefacturasController;