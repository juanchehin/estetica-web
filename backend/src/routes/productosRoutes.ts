import { Router } from 'express';
var mdAutenticacion = require('../middlewares/autenticacion');
import productosController from '../controllers/productosController';

class ProductosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        this.router.post('/alta/:IdPersona/:id_sucursal',productosController.altaProducto);
        this.router.get('/baja/:IdPersona/:pIdProducto',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],productosController.bajaProducto);

        this.router.get('/listar/:desde/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],productosController.listarProductosPaginado); 
        this.router.get('/listar/busqueda/autocomplete/:pProductoBuscado/:IdSucursal/:IdPersona',  [mdAutenticacion.verificaToken],productosController.buscarProductoAutoComplete); 
        this.router.get('/buscar/:pDesde/:pParametroBusqueda/:IdSucursal/:IdPersona',  [mdAutenticacion.verificaToken],productosController.buscarProductoPaginado); 
    }

}

const productosRoutes = new ProductosRoutes();
export default productosRoutes.router;