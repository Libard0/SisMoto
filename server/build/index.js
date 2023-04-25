"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const calificacionRoutes_1 = __importDefault(require("./routes/calificacionRoutes"));
const productosRoutes_1 = __importDefault(require("./routes/productosRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const categoriasRoutes_1 = __importDefault(require("./routes/categoriasRoutes"));
const empleadosRoutes_1 = __importDefault(require("./routes/empleadosRoutes"));
const mantenimientosRoutes_1 = __importDefault(require("./routes/mantenimientosRoutes"));
const facturasRoutes_1 = __importDefault(require("./routes/facturasRoutes"));
const servicioocasionalRoutes_1 = __importDefault(require("./routes/servicioocasionalRoutes"));
const proveedoresRoutes_1 = __importDefault(require("./routes/proveedoresRoutes"));
const pagosRoutes_1 = __importDefault(require("./routes/pagosRoutes"));
const tiposervicioRoutes_1 = __importDefault(require("./routes/tiposervicioRoutes"));
const tipousuarioRoutes_1 = __importDefault(require("./routes/tipousuarioRoutes"));
const detallefacturaRoute_1 = __importDefault(require("./routes/detallefacturaRoute"));
const detallerepuestoRoutes_1 = __importDefault(require("./routes/detallerepuestoRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev')); //el argumento dev nos muestra cuando se hace una peticion a cualquier ruta en el navegador
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json()); //acepta formatos Json - this.app.use(express.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/productos', productosRoutes_1.default);
        this.app.use('/api/usuarios', usuariosRoutes_1.default);
        this.app.use('/api/categorias', categoriasRoutes_1.default);
        this.app.use('/api/empleados', empleadosRoutes_1.default);
        this.app.use('/api/mantenimientos', mantenimientosRoutes_1.default);
        this.app.use('/api/facturas', facturasRoutes_1.default);
        this.app.use('/api/servicioocasional', servicioocasionalRoutes_1.default);
        this.app.use('/api/proveedores', proveedoresRoutes_1.default);
        this.app.use('/api/pagos', pagosRoutes_1.default);
        this.app.use('/api/tiposervicio', tiposervicioRoutes_1.default);
        this.app.use('/api/tipousuario', tipousuarioRoutes_1.default);
        this.app.use('/api/detallefactura', detallefacturaRoute_1.default);
        this.app.use('/api/detallerepuesto', detallerepuestoRoutes_1.default);
        this.app.use('/api/calificacion', calificacionRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port')), () => {
            console.log(`Server running on port`, this.app.get('port'));
        };
    }
}
const server = new Server();
server.start();
