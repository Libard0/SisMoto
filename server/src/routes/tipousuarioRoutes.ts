import { Router } from 'express';
import tipousuarioController from '../controllers/tipousuarioController';

class TipoUsuarioRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/', tipousuarioController.list);
        this.router.get('/:id', tipousuarioController.listOne);
        this.router.post('/', tipousuarioController.create);
        this.router.put('/:id', tipousuarioController.update);
        this.router.delete('/:id', tipousuarioController.delete);
    }

}

const tipousuarioRoutes = new TipoUsuarioRoutes();
export default tipousuarioRoutes.router;