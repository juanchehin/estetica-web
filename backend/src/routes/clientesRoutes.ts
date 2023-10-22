import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import clientesController from '../controllers/clientesController';

class ClientesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // Clientes
        this.router.post('/alta/:IdPersona', clientesController.altaCliente);
        this.router.get('/baja/:IdCliente/:IdPersona', clientesController.bajaCliente);
        this.router.get('/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], clientesController.dameDatosCliente);
        this.router.get('/listar/busqueda/:clienteBuscado/:pIdSucursal', clientesController.buscarCliente);
        this.router.get('/listar/paginado/:IdPersona/:desde/:clienteBuscado/:pIdSucursal',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], clientesController.buscarClientesPaginado);
        
        this.router.get('/historico/listar/paginado/:IdPersona/:desde/:pIdCliente',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], clientesController.cargarHistoricoCliente);

        this.router.get('/editar/datos-formulario/:pIdCliente/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], clientesController.cargarDatosFormEditarCliente);
        this.router.post('/editar/:IdPersona', clientesController.editarCliente);

    }

}

const clientesRoutes = new ClientesRoutes();
export default clientesRoutes.router;