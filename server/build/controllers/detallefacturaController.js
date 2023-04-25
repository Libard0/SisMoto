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
class DetalleFacturasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const detalle_factura = yield database_1.default.query('SELECT * FROM detalle_factura');
            res.json(detalle_factura);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const detalle_factura = yield database_1.default.query('SELECT * FROM detalle_factura WHERE id_dtfact = ?', [id]);
            if (detalle_factura.length > 0) {
                return res.json(detalle_factura[0]);
            }
            res.status(404).json({ text: 'Factura no encontrada' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO detalle_factura set ?', [req.body]);
            res.json({ message: 'Factura guardada' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE detalle_factura SET ? WHERE id_dtfact =?', [req.body, id]);
            res.json({ message: 'La factura fue actualizada' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM detalle_factura WHERE id_dtfact =?', [id]);
            res.json({ message: 'La detalle_factura fue eleminada' });
        });
    }
}
const detallefacturasController = new DetalleFacturasController();
exports.default = detallefacturasController;
