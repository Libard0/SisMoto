"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const servicioocasionalController_1 = __importDefault(require("../controllers/servicioocasionalController"));
class ServicioOcasionalesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', servicioocasionalController_1.default.list);
        this.router.get('/:id', servicioocasionalController_1.default.listOne);
        this.router.post('/', servicioocasionalController_1.default.create);
        this.router.put('/:id', servicioocasionalController_1.default.update);
        this.router.delete('/:id', servicioocasionalController_1.default.delete);
    }
}
const servicioocasionalesRoutes = new ServicioOcasionalesRoutes();
exports.default = servicioocasionalesRoutes.router;
