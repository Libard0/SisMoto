import {Request, Response } from 'express';

import pool from '../database';

class EmpleadosController {

    public async list (req: Request, res: Response) {
        const empleados = await pool.query('SELECT * FROM empleados');
        res.json(empleados);
    }

    public async listOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const empleado = await pool.query('SELECT * FROM empleados WHERE id = ?',[id]);
        if (empleado.length > 0) {
            return res.json(empleado[0]);
        }
        res.status(404).json({text: 'Empleado no encontrado'});
    }

    public async create (req: Request, res: Response) {
        await pool.query ('INSERT INTO empleados set ?', [req.body]);
        res.json({message: 'Empleado guardado'});
    }

    public async update (req: Request, res: Response) {
        const { id } = req.params;
        await pool.query ('UPDATE empleados SET ? WHERE id =?', [req.body, id]);
        res.json ({message: 'El empleado fue actualizado'});
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query ('DELETE FROM empleados WHERE id =?', [id]);
        res.json ({message: 'El empleado fue eleminado'});
    }
}

const empleadosController = new EmpleadosController();
export default empleadosController;