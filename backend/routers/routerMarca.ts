import {Router} from 'express';
import {brandController} from '../controllers/MarcasController';
import {brandModel} from '../models/Marcas';

export const brandRouter = () => {
    const Brandrouter = Router();
    const Brandcontroller = new brandController(brandModel);

    Brandrouter.get('/', Brandcontroller.getAll);
    Brandrouter.post('/', Brandcontroller.addBrand);
    Brandrouter.patch('/:id', Brandcontroller.editBrand);
    Brandrouter.delete('/:id', Brandcontroller.deleteBrand);

    return Brandrouter;

}