import { Router } from 'express';
var mdAutenticacion = require('../middlewares/autenticacion');
import serviciosController from '../controllers/serviciosController';

class ServiciosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // *** Front ***
        this.router.get('/servicio/detalle/:pIdServicio/:pIdSabor',serviciosController.dameDatosServicio); 
        this.router.post('/alta/:IdPersona',serviciosController.altaServicio);
        this.router.get('/baja/:IdPersona/:pIdServicio',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],serviciosController.bajaServicio); 
        this.router.get('/listar/busqueda/autocomplete/transferencia/:pServicioBuscado/:pIdSucursalOrigen',  [mdAutenticacion.verificaToken],serviciosController.buscarServicioAutoCompleteTransferencia); 
        this.router.get('/buscar/:pDesde/:pParametroBusqueda/:IdSucursal/:IdPersona',  [mdAutenticacion.verificaToken],serviciosController.buscarServicioPaginado); 
    
    }

}

const serviciosRoutes = new ServiciosRoutes();
export default serviciosRoutes.router;