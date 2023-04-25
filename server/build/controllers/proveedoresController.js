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
class ProveedoresController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const proveedores = yield database_1.default.query('SELECT * FROM proveedores');
            res.json(proveedores);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const proveedor = yield database_1.default.query('SELECT * FROM proveedores WHERE id = ?', [id]);
            if (proveedor.length > 0) {
                return res.json(proveedor[0]);
            }
            res.status(404).json({ text: 'Proveedor no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO proveedores set ?', [req.body]);
            res.json({ message: 'El proveedor fue guardado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE proveedores SET ? WHERE id =?', [req.body, id]);
            res.json({ message: 'El proveedor fue actualizado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM proveedores WHERE id =?', [id]);
            res.json({ message: 'El proveedor fue eleminado' });
        });
    }
}
const proveedoresController = new ProveedoresController();
exports.default = proveedoresController;
