import { Router } from 'express';
import usuariosController from '../controllers/usuariosController';

class UsuariosRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', usuariosController.list);
        this.router.get('/:id', usuariosController.listOne);
        //this.router.get('/:cedula', usuariosController.listActive);
        this.router.post('/', usuariosController.create);
        this.router.put('/:id', usuariosController.update);
        this.router.delete('/:id', usuariosController.delete);
        
    }

}

const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;