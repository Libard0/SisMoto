import { Router } from 'express';
import proveedoresController from '../controllers/proveedoresController';

class ProveedoresRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/', proveedoresController.list);
        this.router.get('/:id', proveedoresController.listOne);
        this.router.post('/', proveedoresController.create);
        this.router.put('/:id', proveedoresController.update);
        this.router.delete('/:id', proveedoresController.delete);
    }

}

const proveedoresRoutes = new ProveedoresRoutes();
export default proveedoresRoutes.router;