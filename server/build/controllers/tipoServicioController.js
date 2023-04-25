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
class TipoServicioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoServicio = yield database_1.default.query('SELECT * FROM tipos_servicio');
            res.json(tipoServicio);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_tiposervicio } = req.params;
            const tipoServicio = yield database_1.default.query('SELECT * FROM tipos_servicio WHERE id_tiposervicio = ?', [id_tiposervicio]);
            if (tipoServicio.length > 0) {
                return res.json(tipoServicio[0]);
            }
            res.status(404).json({ text: 'Servicio no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO tipos_servicio set ?', [req.body]);
            res.json({ message: 'Servicio guardado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_tiposervicio } = req.params;
            yield database_1.default.query('UPDATE tipos_servicio SET ? WHERE id_tiposervicio =?', [req.body, id_tiposervicio]);
            res.json({ message: 'Servicio fue actualizado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_tiposervicio } = req.params;
            yield database_1.default.query('DELETE FROM tipos_servicio WHERE id_tiposervicio =?', [id_tiposervicio]);
            res.json({ message: 'Servicio fue eleminado' });
        });
    }
}
const tiposervicioController = new TipoServicioController();
exports.default = tiposervicioController;
