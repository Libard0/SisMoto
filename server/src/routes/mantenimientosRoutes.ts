import { Router } from 'express';
import mantenimientosController from '../controllers/mantenimientosController';

class MantenimientosRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/', mantenimientosController.list);
        this.router.get('/:id', mantenimientosController.listOne);
        this.router.post('/', mantenimientosController.create);
        this.router.put('/:id', mantenimientosController.update);
        this.router.delete('/:id', mantenimientosController.delete);
    }

}

const mantenimientosRoutes = new MantenimientosRoutes();
export default mantenimientosRoutes.router;