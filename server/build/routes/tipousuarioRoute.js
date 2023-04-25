"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipousuarioController_1 = __importDefault(require("../controllers/tipousuarioController"));
class TipoUsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', tipousuarioController_1.default.list);
        this.router.get('/:id', tipousuarioController_1.default.listOne);
        this.router.post('/', tipousuarioController_1.default.create);
        this.router.put('/:id', tipousuarioController_1.default.update);
        this.router.delete('/:id', tipousuarioController_1.default.delete);
    }
}
const tipousuarioRoutes = new TipoUsuarioRoutes();
exports.default = tipousuarioRoutes.router;
