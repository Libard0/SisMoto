"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mantenimientosController_1 = __importDefault(require("../controllers/mantenimientosController"));
class MantenimientosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', mantenimientosController_1.default.list);
        this.router.get('/:id', mantenimientosController_1.default.listOne);
        this.router.post('/', mantenimientosController_1.default.create);
        this.router.put('/:id', mantenimientosController_1.default.update);
        this.router.delete('/:id', mantenimientosController_1.default.delete);
    }
}
const mantenimientosRoutes = new MantenimientosRoutes();
exports.default = mantenimientosRoutes.router;
