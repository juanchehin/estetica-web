import { Router } from 'express';
var mdAutenticacion = require('../middlewares/autenticacion');
import vouchersController from '../controllers/vouchersController';

class VouchersRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        this.router.get('/baja/:IdPersona/:pIdProducto',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],vouchersController.baja_voucher);
        this.router.get('/confirmar/:id_transaccion/:id_empleado/:pIdPersona',  [mdAutenticacion.verificaToken],vouchersController.confirmar_voucher);
        this.router.get('/listar/:pDesde/:estado_voucher/:IdPersona/:id_sucursal',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],vouchersController.listar_vouchers_paginado);

    }

}

const vouchersRoutes = new VouchersRoutes();
export default vouchersRoutes.router;