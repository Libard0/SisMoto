import { Router } from 'express';
import tiposervicioController from '../controllers/tiposervicioController';

class TipoServicioRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/', tiposervicioController.list);
        this.router.get('/:id', tiposervicioController.listOne);
        this.router.post('/', tiposervicioController.create);
        this.router.put('/:id', tiposervicioController.update);
        this.router.delete('/:id', tiposervicioController.delete);
    }

}

const tiposervicioRoutes = new TipoServicioRoutes();
export default tiposervicioRoutes.router;