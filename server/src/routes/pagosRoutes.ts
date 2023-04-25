import { Router } from 'express';
import pagoscontroller from '../controllers/pagosController';

class PagosRoutes {

    public router: Router = Router();

    constructor(){
        this.config();

    }

    config(): void{
        this.router.get('/', pagoscontroller.list);
        this.router.get('/:id', pagoscontroller.listOne);
        this.router.post('/', pagoscontroller.create);
        this.router.put('/:id', pagoscontroller.update);
        this.router.delete('/:id', pagoscontroller.delete);
        
    }
}

const pagosRoutes = new PagosRoutes();
export default pagosRoutes.router;