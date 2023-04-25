import { Router } from 'express';
import detallefacturaController from '../controllers/detallefacturaController';

class DetalleFacturaRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }
    
    config(): void{
        this.router.get('/', detallefacturaController.list);
        this.router.get('/:id', detallefacturaController.listOne);
        this.router.post('/', detallefacturaController.create);
        this.router.put('/:id', detallefacturaController.update);
        this.router.delete('/:id', detallefacturaController.delete);
    }
}

const detallefacturaRoutes = new DetalleFacturaRoutes();
export default detallefacturaRoutes.router;