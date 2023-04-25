"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detallefacturaController_1 = __importDefault(require("../controllers/detallefacturaController"));
class DetalleFacturaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', detallefacturaController_1.default.list);
        this.router.get('/:id', detallefacturaController_1.default.listOne);
        this.router.post('/', detallefacturaController_1.default.create);
        this.router.put('/:id', detallefacturaController_1.default.update);
        this.router.delete('/:id', detallefacturaController_1.default.delete);
    }
}
const detallefacturaRoutes = new DetalleFacturaRoutes();
exports.default = detallefacturaRoutes.router;
