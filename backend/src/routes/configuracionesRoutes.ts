import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import configuracionesController from '../controllers/configuracionesController';

class ConfiguracionesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // 
        this.router.get('/listar/empresa',[mdAutenticacion.verificaToken],configuracionesController.dame_configuraciones);
        this.router.put('/actualizar/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], configuracionesController.actualizarConfiguraciones);

    }

}

const configuracionesRoutes = new ConfiguracionesRoutes();
export default configuracionesRoutes.router;