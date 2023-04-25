"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const facturasController_1 = __importDefault(require("../controllers/facturasController"));
class FacturasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', facturasController_1.default.list);
        this.router.get('/:id', facturasController_1.default.listOne);
        this.router.post('/', facturasController_1.default.create);
        this.router.put('/:id', facturasController_1.default.update);
        this.router.delete('/:id', facturasController_1.default.delete);
    }
}
const facturasRoutes = new FacturasRoutes();
exports.default = facturasRoutes.router;
