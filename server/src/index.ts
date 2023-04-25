import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import calificacionRoutes from './routes/calificacionRoutes';
import productosRoutes from './routes/productosRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import categoriasRoutes from './routes/categoriasRoutes';
import empleadosRoutes from './routes/empleadosRoutes';
import mantenimientosRoutes from './routes/mantenimientosRoutes';
import facturasRoutes from './routes/facturasRoutes';
import servicioocasionalesRoutes from './routes/servicioocasionalRoutes';
import proveedoresRoutes from './routes/proveedoresRoutes';
import pagosRoutes from './routes/pagosRoutes';
import tipoServicioRoutes from './routes/tiposervicioRoutes';
import tipousuarioRoutes from './routes/tipousuarioRoutes';
import detallefacturaRoute from './routes/detallefacturaRoute';
import detallerepuestoRoutes from './routes/detallerepuestoRoutes';

class Server {

    public app: Application;

    constructor() {
       this.app = express();
       this.config();
       this.routes();
    }
    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev')); //el argumento dev nos muestra cuando se hace una peticion a cualquier ruta en el navegador
        this.app.use(cors());
        this.app.use(express.json()); //acepta formatos Json - this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));

    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/productos', productosRoutes);
        this.app.use('/api/usuarios', usuariosRoutes);
        this.app.use('/api/categorias', categoriasRoutes);
        this.app.use('/api/empleados', empleadosRoutes);
        this.app.use('/api/mantenimientos', mantenimientosRoutes);
        this.app.use('/api/facturas', facturasRoutes);
        this.app.use('/api/servicioocasional', servicioocasionalesRoutes);
        this.app.use('/api/proveedores', proveedoresRoutes);
        this.app.use('/api/pagos', pagosRoutes);
        this.app.use('/api/tiposervicio', tipoServicioRoutes);
        this.app.use('/api/tipousuario', tipousuarioRoutes);
        this.app.use('/api/detallefactura', detallefacturaRoute);
        this.app.use('/api/detallerepuesto', detallerepuestoRoutes);
        this.app.use('/api/calificacion', calificacionRoutes);
    }

    start(): void{
        this.app.listen(this.app.get('port')), () => {
            console.log(`Server running on port`, this.app.get('port'));
        }
    }

}

const server = new Server();
server.start();