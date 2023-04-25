import { Router } from 'express';
import empleadosController from '../controllers/empleadosController';

class EmpleadosRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }
    
    config(): void{
        this.router.get('/', empleadosController.list);
        this.router.get('/:id', empleadosController.listOne);
        this.router.post('/', empleadosController.create);
        this.router.put('/:id', empleadosController.update);
        this.router.delete('/:id', empleadosController.delete);
    }
}

const empleadosRoutes = new EmpleadosRoutes();
export default empleadosRoutes.router;