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
class PagosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagos = yield database_1.default.query('SELECT * FROM pagos');
            res.json(pagos);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pago = yield database_1.default.query('SELECT * FROM pagos WHERE id_pago = ?', [id]);
            if (pago.length > 0) {
                return res.json(pago[0]);
            }
            res.status(404).json({ text: 'Tipo de pago no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO pagos set ?', [req.body]);
            res.json({ message: 'Tipo de pago guardado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE pagos SET ? WHERE id_pago = ?', [req.body, id]);
            res.json({ message: 'El tipo de pago fue actualizado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM pagos WHERE id_pago = ?', [id]);
            res.json({ message: 'El tipo de pago fue eliminado' });
        });
    }
}
const pagoscontroller = new PagosController();
exports.default = pagoscontroller;
