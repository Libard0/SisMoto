"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empleadosController_1 = __importDefault(require("../controllers/empleadosController"));
class EmpleadosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', empleadosController_1.default.list);
        this.router.get('/:id', empleadosController_1.default.listOne);
        this.router.post('/', empleadosController_1.default.create);
        this.router.put('/:id', empleadosController_1.default.update);
        this.router.delete('/:id', empleadosController_1.default.delete);
    }
}
const empleadosRoutes = new EmpleadosRoutes();
exports.default = empleadosRoutes.router;
