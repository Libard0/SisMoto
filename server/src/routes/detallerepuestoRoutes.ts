import { Router } from 'express';
import detallerepuestoController from '../controllers/detallerepuestoController';

class DetalleRepuestoRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }
    
    config(): void{
        this.router.get('/', detallerepuestoController.list);
        this.router.get('/:id', detallerepuestoController.listOne);
        this.router.post('/', detallerepuestoController.create);
        this.router.put('/:id', detallerepuestoController.update);
        this.router.delete('/:id', detallerepuestoController.delete);
    }
}

const detallerepuestoRoutes = new DetalleRepuestoRoutes();
export default detallerepuestoRoutes.router;