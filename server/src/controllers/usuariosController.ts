import { Request, Response } from 'express';

import pool from '../database';

class UsuariosController {


    public async list(req: Request, res: Response) {
        const usuarios = await pool.query('SELECT * FROM usuarios');
        res.json(usuarios);
    }

    public async listOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = id;
        //let mensaje: String;
        console.log(dato);

        if (dato.length > 3) {
            const user = await pool.query('SELECT cedula, contrasena, idtipousuario FROM usuarios WHERE cedula = ?', [dato]);
            if (user.length > 0) {
                return res.json(user[0]);
            }
            //mensaje = 'cedula no encontrado';
            res.status(404).json({ text: 'Cedula no encontrada' });

        } else {
            const usuario = await pool.query('SELECT * FROM usuarios WHERE id = ?', [dato]);

            if (usuario.length > 0) {
                return res.json(usuario[0]);
            }
            //mensaje = 'Usuario no encontrado';
            res.status(404).json({ text: 'Usuario no encontrada' });

        }

    }

    // public async listOne(req: Request, res: Response): Promise<any> {
    //     const { id } = req.params;
    //     if (id.length > 3) {

    //     }


    // }

    // public async listActive(req: Request, res: Response): Promise<any> {
    //     const { cedula } = req.params;
    //     if (cedula.length <= 3) {
    //         return this.listOne(req, res);
    //     } else {
    //         const user = await pool.query('SELECT * FROM usuarios WHERE cedula = ?', [cedula]);
    //         if (user.length > 0) {
    //             return res.json(user[0]);
    //         }
    //         res.status(404).json({ text: 'Cedula no encontrada' });

    //     }

    // }



    public async create(req: Request, res: Response) {
        await pool.query('INSERT INTO usuarios set ?', [req.body]);
        res.json({ message: 'Usuario guardado' });
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('UPDATE usuarios SET ? WHERE id =?', [req.body, id]);
        res.json({ message: 'El usuario fue actualizado' });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM usuarios WHERE id =?', [id]);
        res.json({ message: 'El usuario fue eleminado' });
    }

    /*public async list (req: Request, res: Response) {
        const tipousuario = await pool.query('SELECT * FROM tipousuario');
        res.json(tipousuario);
    }
*/
 

}

const usuariosController = new UsuariosController();
export default usuariosController;