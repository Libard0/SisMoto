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
class FacturasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const facturas = yield database_1.default.query('SELECT * FROM facturas');
            res.json(facturas);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const factura = yield database_1.default.query('SELECT * FROM facturas WHERE id = ?', [id]);
            if (factura.length > 0) {
                return res.json(factura[0]);
            }
            res.status(404).json({ text: 'Factura no encontrada' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO facturas set ?', [req.body]);
            res.json({ message: 'Factura guardada' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE facturas SET ? WHERE id =?', [req.body, id]);
            res.json({ message: 'La factura fue actualizada' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM facturas WHERE id =?', [id]);
            res.json({ message: 'La factura fue eleminada' });
        });
    }
}
const facturasController = new FacturasController();
exports.default = facturasController;
