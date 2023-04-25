import {Request, Response } from 'express';

import pool from '../database';

class FacturasController {

    public async list (req: Request, res: Response) {
        const facturas = await pool.query('SELECT * FROM facturas');
        res.json(facturas);
    }

    public async listOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const factura = await pool.query('SELECT * FROM facturas WHERE id = ?',[id]);
        if (factura.length > 0) {
            return res.json(factura[0]);
        }
        res.status(404).json({text: 'Factura no encontrada'});
    }

    public async create (req: Request, res: Response) {
        await pool.query ('INSERT INTO facturas set ?', [req.body]);
        res.json({message: 'Factura guardada'});
    }

    public async update (req: Request, res: Response) {
        const { id } = req.params;
        await pool.query ('UPDATE facturas SET ? WHERE id =?', [req.body, id]);
        res.json ({message: 'La factura fue actualizada'});
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query ('DELETE FROM facturas WHERE id =?', [id]);
        res.json ({message: 'La factura fue eleminada'});
    }

}

const facturasController = new FacturasController();
export default facturasController;