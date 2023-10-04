import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import empleadosController from '../controllers/empleadosController';

class EmpleadosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // Empleados
        this.router.post('/alta/:IdPersona/:id_sucursal', empleadosController.altaEmpleado);
        this.router.get('/baja/:IdEmpleado/:IdPersona', empleadosController.bajaEmpleado);
        this.router.get('/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], empleadosController.dameDatosEmpleado);
        this.router.get('/listar/busqueda/:empleadoBuscado/:pIdSucursal', empleadosController.buscarEmpleado);

        this.router.get('/listar/paginado/:IdPersona/:desde/:empleadoBuscado',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], empleadosController.buscarEmpleadosPaginado);
        this.router.get('/historico/:desde/:fecha_inicio/:fecha_fin/:id_empleado/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], empleadosController.listar_historico_empleado);

        this.router.get('/editar/datos-formulario/:pIdEmpleado/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], empleadosController.cargarDatosFormEditarEmpleado);
        this.router.post('/editar/:IdPersona', empleadosController.editarEmpleado);
        this.router.post('/front/editar/:IdPersona', empleadosController.editarEmpleadoFront);

    }

}

const empleadosRoutes = new EmpleadosRoutes();
export default empleadosRoutes.router;