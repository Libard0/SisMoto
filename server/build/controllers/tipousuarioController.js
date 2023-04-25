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
class TipoUsuarioController {
    /*id  tipo */
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipousuario = yield database_1.default.query('SELECT * FROM tipousuario');
            res.json(tipousuario);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const tipousuario = yield database_1.default.query('SELECT * FROM tipousuario WHERE id = ?', [id]);
            if (tipousuario.length > 0) {
                return res.json(tipousuario[0]);
            }
            res.status(404).json({ text: 'tipoUsuario no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO tipousuario set ?', [req.body]);
            res.json({ message: 'TipoUsuario guardado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE tipousuario SET ? WHERE id =?', [req.body, id]);
            res.json({ message: 'tipousuario fue actualizado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM tipousuario WHERE id =?', [id]);
            res.json({ message: 'tipo usuario fue eleminado' });
        });
    }
}
const tipousuarioController = new TipoUsuarioController();
exports.default = tipousuarioController;
