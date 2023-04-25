"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calificacionController_1 = __importDefault(require("../controllers/calificacionController"));
class CalificacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', calificacionController_1.default.list);
        // this.router.get('/:id', calificacionController.listOne);
        this.router.post('/', calificacionController_1.default.create);
        // this.router.put('/:id', calificacionController.update);
        // this.router.delete('/:id', calificacionController.delete);
    }
}
const calificacionRoutes = new CalificacionRoutes();
exports.default = calificacionRoutes.router;
