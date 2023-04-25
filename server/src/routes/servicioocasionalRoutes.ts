import { Router } from 'express';
import servicioocasionalesController from '../controllers/servicioocasionalController';

class ServicioOcasionalesRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/', servicioocasionalesController.list);
        this.router.get('/:id', servicioocasionalesController.listOne);
        this.router.post('/', servicioocasionalesController.create);
        this.router.put('/:id', servicioocasionalesController.update);
        this.router.delete('/:id', servicioocasionalesController.delete);
    }

}

const servicioocasionalesRoutes = new ServicioOcasionalesRoutes();
export default servicioocasionalesRoutes.router;