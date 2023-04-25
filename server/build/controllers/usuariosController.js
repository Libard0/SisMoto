"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class UsuariosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield database_1.default.query('SELECT * FROM usuarios');
            res.json(usuarios);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const dato = id;
            //let mensaje: String;
            console.log(dato);
            if (dato.length > 3) {
                const user = yield database_1.default.query('SELECT cedula, contrasena, idtipousuario FROM usuarios WHERE cedula = ?', [dato]);
                if (user.length > 0) {
                    return res.json(user[0]);
                }
                //mensaje = 'cedula no encontrado';
                res.status(404).json({ text: 'Cedula no encontrada' });
            }
            else {
                const usuario = yield database_1.default.query('SELECT * FROM usuarios WHERE id = ?', [dato]);
                if (usuario.length > 0) {
                    return res.json(usuario[0]);
                }
                //mensaje = 'Usuario no encontrado';
                res.status(404).json({ text: 'Usuario no encontrada' });
            }
        });
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
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO usuarios set ?', [req.body]);
            res.json({ message: 'Usuario guardado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE usuarios SET ? WHERE id =?', [req.body, id]);
            res.json({ message: 'El usuario fue actualizado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM usuarios WHERE id =?', [id]);
            res.json({ message: 'El usuario fue eleminado' });
        });
    }
}
const usuariosController = new UsuariosController();
exports.default = usuariosController;
