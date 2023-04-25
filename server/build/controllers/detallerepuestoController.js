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
class DetalleRepuestoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const detalle_reps = yield database_1.default.query('SELECT * FROM detalle_reps');
            res.json(detalle_reps);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const detalle_reps = yield database_1.default.query('SELECT * FROM detalle_reps WHERE idDetalleRep = ?', [id]);
            if (detalle_reps.length > 0) {
                return res.json(detalle_reps[0]);
            }
            res.status(404).json({ text: 'Detalle repuestos no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO detalle_reps set ?', [req.body]);
            res.json({ message: 'Detalle repuestos guardado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE detalle_reps SET ? WHERE idDetalleRep =?', [req.body, id]);
            res.json({ message: 'El detalle reps fue actualizado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM detalle_reps WHERE idDetalleRep =?', [id]);
            res.json({ message: 'El detalle_reps fue eleminado' });
        });
    }
}
const detallerepuestoController = new DetalleRepuestoController();
exports.default = detallerepuestoController;
