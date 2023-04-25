import { Router } from 'express';
import productoscontroller from '../controllers/productosController';

class ProductosRoutes {

    public router: Router = Router();

    constructor(){
        this.config();

    }

    config(): void{
        this.router.get('/', productoscontroller.list);
        this.router.get('/:id', productoscontroller.listOne);
        this.router.post('/', productoscontroller.create);
        this.router.put('/:id', productoscontroller.update);
        this.router.delete('/:id', productoscontroller.delete);
        
    }
}

const productosRoutes = new ProductosRoutes();
export default productosRoutes.router;