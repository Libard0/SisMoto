import {Request, Response } from 'express';

import pool from '../database';

class TipoUsuarioController {

    /*id  tipo */
    public async list (req: Request, res: Response) {
        const tipousuario = await pool.query('SELECT * FROM tipousuario');
        res.json(tipousuario);
    }

    public async listOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const tipousuario = await pool.query('SELECT * FROM tipousuario WHERE id = ?',[id]);
        if (tipousuario.length > 0) {
            return res.json(tipousuario[0]);
        }
        res.status(404).json({text: 'tipoUsuario no encontrado'});
    }

    public async create (req: Request, res: Response) {
        await pool.query ('INSERT INTO tipousuario set ?', [req.body]);
        res.json({message: 'TipoUsuario guardado'});
    }

    public async update (req: Request, res: Response) {
        const { id } = req.params;
        await pool.query ('UPDATE tipousuario SET ? WHERE id =?', [req.body, id]);
        res.json ({message: 'tipousuario fue actualizado'});
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query ('DELETE FROM tipousuario WHERE id =?', [id]);
        res.json ({message: 'tipo usuario fue eleminado'});
    }

}

const tipousuarioController = new TipoUsuarioController();
export default tipousuarioController;