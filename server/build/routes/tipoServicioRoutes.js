"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tiposervicioController_1 = __importDefault(require("../controllers/tiposervicioController"));
class TipoServicioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', tiposervicioController_1.default.list);
        this.router.get('/:id', tiposervicioController_1.default.listOne);
        this.router.post('/', tiposervicioController_1.default.create);
        this.router.put('/:id', tiposervicioController_1.default.update);
        this.router.delete('/:id', tiposervicioController_1.default.delete);
    }
}
const tiposervicioRoutes = new TipoServicioRoutes();
exports.default = tiposervicioRoutes.router;
