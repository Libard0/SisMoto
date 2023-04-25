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
class ServicioOcasionalesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const servicioOcasionales = yield database_1.default.query('SELECT * FROM servicio_ocasional');
            res.json(servicioOcasionales);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const servicioOcasional = yield database_1.default.query('SELECT * FROM servicio_ocasional WHERE id_sv_ocacional = ?', [id]);
            if (servicioOcasional.length > 0) {
                return res.json(servicioOcasional[0]);
            }
            res.status(404).json({ text: 'Servicio ocasional no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO servicio_ocasional set ?', [req.body]);
            res.json({ message: 'Servicio ocasional guardado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE servicio_ocasional SET ? WHERE id_sv_ocacional =?', [req.body, id]);
            res.json({ message: 'Servicio ocasional fue actualizado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM servicio_ocasional WHERE id_sv_ocacional =?', [id]);
            res.json({ message: 'Servicio ocasional fue eleminado' });
        });
    }
}
const servicioocasionalesController = new ServicioOcasionalesController();
exports.default = servicioocasionalesController;
