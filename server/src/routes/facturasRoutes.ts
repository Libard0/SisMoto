import { Router } from 'express';
import facturasController from '../controllers/facturasController';

class FacturasRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/', facturasController.list);
        this.router.get('/:id', facturasController.listOne);
        this.router.post('/', facturasController.create);
        this.router.put('/:id', facturasController.update);
        this.router.delete('/:id', facturasController.delete);
    }

}

const facturasRoutes = new FacturasRoutes();
export default facturasRoutes.router;