"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detallerepuestoController_1 = __importDefault(require("../controllers/detallerepuestoController"));
class DetalleRepuestoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', detallerepuestoController_1.default.list);
        this.router.get('/:id', detallerepuestoController_1.default.listOne);
        this.router.post('/', detallerepuestoController_1.default.create);
        this.router.put('/:id', detallerepuestoController_1.default.update);
        this.router.delete('/:id', detallerepuestoController_1.default.delete);
    }
}
const detallerepuestoRoutes = new DetalleRepuestoRoutes();
exports.default = detallerepuestoRoutes.router;
