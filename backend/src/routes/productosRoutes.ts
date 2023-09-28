import { Router } from 'express';
var mdAutenticacion = require('../middlewares/autenticacion');
import productosController from '../controllers/productosController';

class ProductosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // *** Front ***
        this.router.get('/front/buscar/:pDesde/:pParametroBusqueda',productosController.buscarProductoPaginadoFront);
        this.router.get('/producto/detalle/:pIdProducto/:pIdSabor',productosController.dameDatosProducto); 
        this.router.post('/alta/:IdPersona',productosController.altaProducto);
        this.router.get('/baja/:IdPersona/:pIdProducto',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],productosController.bajaProducto); 
        this.router.get('/listar/busqueda/autocomplete/transferencia/:pProductoBuscado/:pIdSucursalOrigen',  [mdAutenticacion.verificaToken],productosController.buscarProductoAutoCompleteTransferencia); 
        this.router.get('/stock/sabor/producto/:pIdProducto/:pIdSabor',productosController.dameStockSaborProducto);
        this.router.get('/promocion/home',productosController.listarPromocionesHome);
        this.router.get('/promociones/home/paginado/:pDesde',productosController.listarPromocionesPaginadoFront);
        this.router.get('/destacados/home',productosController.listarProductosDestacadosHome);
        this.router.get('/listar/categoria/:IdCategoria/:pDesde',productosController.listarProductosCategoria);

        // *** Back ***
        // Productos
        this.router.get('/publicar/:IdProducto/:IdPersona',  [mdAutenticacion.verificaToken],productosController.publicarProducto); 
        this.router.get('/destacar/:IdProducto/:IdPersona',  [mdAutenticacion.verificaToken],productosController.destacarProducto); 
        this.router.get('/ofertar/:IdProducto/:IdPersona',  [mdAutenticacion.verificaToken],productosController.ofertarProducto); 

        this.router.get('/listar/:desde/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],productosController.listarProductosPaginado); 
        this.router.get('/listar/busqueda/autocomplete/:pProductoBuscado/:IdSucursal/:IdPersona',  [mdAutenticacion.verificaToken],productosController.buscarProductoAutoComplete); 
        this.router.get('/buscar/:pDesde/:pParametroBusqueda/:IdSucursal/:IdPersona',  [mdAutenticacion.verificaToken],productosController.buscarProductoPaginado); 
        this.router.get('/nuevo/datos-formulario',  [mdAutenticacion.verificaToken], productosController.cargarDatosFormNuevoProducto);
        this.router.get('/editar/datos-formulario/:IdProducto/:IdPersona',  [mdAutenticacion.verificaToken], productosController.cargarDatosFormEditarProducto);
    }

}

const productosRoutes = new ProductosRoutes();
export default productosRoutes.router;