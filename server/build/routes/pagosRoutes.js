"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pagosController_1 = __importDefault(require("../controllers/pagosController"));
class PagosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', pagosController_1.default.list);
        this.router.get('/:id', pagosController_1.default.listOne);
        this.router.post('/', pagosController_1.default.create);
        this.router.put('/:id', pagosController_1.default.update);
        this.router.delete('/:id', pagosController_1.default.delete);
    }
}
const pagosRoutes = new PagosRoutes();
exports.default = pagosRoutes.router;
