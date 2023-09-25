import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class ServiciosController {

    
// ==================================================
//        Inserta 
// ==================================================
public async altaServicio(req: Request, res: Response) {

    var IdCategoria = req.body[0];
    var IdSubCategoria = req.body[1];
    var IdMarca = req.body[2];
    var IdUnidad = req.body[3];    
    var Servicio = req.body[4];
    var IdProveedor = req.body[5];
    var FechaVencimiento = req.body[6];
    var Descripcion = req.body[7];
    var StockAlerta = req.body[8];
    var Medida = req.body[9];
    var PrecioCompra = req.body[10];
    var PrecioVenta = req.body[11];
    var PrecioMayorista = req.body[12];
    var PrecioMeli = req.body[13];
    var Descuento = req.body[14];
    var Moneda = req.body[15].charAt(0);
    var arraySaboresCodigo = req.body[16];

    if(IdSubCategoria == undefined || IdSubCategoria == 'undefined' || IdSubCategoria == null || IdSubCategoria == 'null')
    { 
        IdSubCategoria = 1; // sin subcategoria
    }

    if(FechaVencimiento == null || FechaVencimiento == 'null')
    { 
        FechaVencimiento = null;
    }

    pool.query(`call bsp_alta_servicio('${req.params.IdPersona}','${IdCategoria}','${IdSubCategoria}','${IdMarca}','${IdUnidad}','${IdProveedor}','${Servicio}',${FechaVencimiento},'${Descripcion}',${StockAlerta},'${Medida}',${PrecioCompra},'${PrecioVenta}','${PrecioMayorista}','${PrecioMeli}',${Descuento},'${Moneda}')`, async function(err: any, result: any, fields: any){
        
        if(err || result[0][0].mensaje != 'Ok'){
            logger.error("Error en bsp_alta_servicio - serviciosController " + err);

            res.status(404).json({ text: err });
            return;
        }

        // ==============================
       if(result[0][0].mensaje == 'Ok')
       {

            arraySaboresCodigo.forEach(function (value: any) {

                var respuesta = pool.query(`call bsp_alta_sabores_codigo_servicio('${result[1][0].pIdServicio}','${value.id_sabor}','${value.codigo}')`, function(err2: any, result2: any){
                    
                    if(err2 || result2[0][0].mensaje != 'Ok'){
                        logger.error("Error en bsp_alta_sabores_codigo_servicio - serviciosController " + err);

                        return false;
                    }

                    if(result2[0][0].Level == 'Error'){
                        logger.error("Error en bsp_alta_sabores_codigo_servicio - serviciosController " + result2[0][0].Level);

                        return false;
                    }
                    
                })

                if(!respuesta){
                    logger.error("Error en bsp_alta_sabores_codigo_servicio - serviciosController 2 ");

                    return res.json({
                        ok: false,
                        mensaje: 'Ocurrio un error'
                    });
                }
            });
        }
        // ==============================      

        return res.json({ mensaje: 'Ok' });
    })

}

// ==================================================
//        Lista servicios
// ==================================================
public async listarServiciosPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_servicios_paginado('${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//        Lista servicios
// ==================================================
public async bajaServicio(req: Request, res: Response): Promise<void> {

    var IdPersona = req.params.IdPersona;
    var IdServicio = req.params.pIdServicio;

    pool.query(`call bsp_baja_servicio('${IdPersona}','${IdServicio}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//   Listado de servicios en panel
// ==================================================
public async buscarServicioPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);
    var pParametroBusqueda = req.params.pParametroBusqueda || '';
    const IdSucursal = req.params.IdSucursal;

    if(pParametroBusqueda == null || pParametroBusqueda == 'null' || pParametroBusqueda == '-' || pParametroBusqueda == '')
    {
        pParametroBusqueda = '-';
    }

    pool.query(`call bsp_buscar_servicios_paginado('${req.params.IdPersona}','${pParametroBusqueda}','${desde}','${IdSucursal}')`, function(err: any, result: any){
        
        if(err){
            logger.error("Error en bsp_buscar_servicio_paginado - serviciosController");

            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//        Autocomplete servicios
// ==================================================
public async buscarServicioAutoComplete(req: Request, res: Response): Promise<void> {

    var pParametroBusqueda = req.params.pParametroBusqueda || '';
    var pIdSucursal = req.params.IdSucursal;
    var pIdUsuario = req.params.IdPersona;

    if(pParametroBusqueda == null || pParametroBusqueda == 'null')
    {
        pParametroBusqueda = '';
    }

    pool.query(`call bsp_buscar_servicio_autocomplete('${pParametroBusqueda}','${pIdSucursal}','${pIdUsuario}')`, function(err: any, result: any){
        logger.error("Error en bsp_buscar_servicio_autocomplete - serviciosController");

        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//        
// ==================================================
public async bajaPromocion(req: Request, res: Response): Promise<void> {

    var IdPersona = req.params.IdPersona;
    var pIdPromocion = req.params.pIdPromocion;

    pool.query(`call bsp_baja_promocion('${IdPersona}','${pIdPromocion}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//        Lista
// ==================================================
public async listarPromociones(req: Request, res: Response): Promise<void> {
    var desde = req.params.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_promociones('${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}
// ==================================================
//        Lista los servicios destacados para mostrar en el home
// ==================================================
public async listarServiciosDestacadosHome(req: Request, res: Response): Promise<void> {
    
    pool.query(`call bsp_listar_servicios_destacados_home()`, function(err: any, result: any, fields: any){
        if(err){
            res.status(500).json(result);
            return;
        }
        res.status(200).json(result);
    })
}
// ==================================================
//        
// ==================================================
public async publicarServicio(req: Request, res: Response): Promise<void> {

    var pIdServicio = req.params.IdServicio;

    pool.query(`call bsp_publicar_servicio('${pIdServicio}')`, function(err: any, result: any){

        if(err || result[0][0].mensaje !== 'Ok'){
            
            return res.status(200).json({
                ok: false,
                mensaje: result[0][0].mensaje
            });
        }
        
        res.status(200).json(result);
    })
}

// ==================================================
//        
// ==================================================
public async ofertarServicio(req: Request, res: Response): Promise<void> {

    var pIdServicio = req.params.IdServicio;

    pool.query(`call bsp_ofertar_servicio('${pIdServicio}')`, function(err: any, result: any){

        if(err || result[0][0].mensaje !== 'Ok'){
            return res.status(200).json({
                ok: false,
                mensaje: result[0][0].mensaje
            });
        }
        
        res.status(200).json(result);
    })
}
// ==================================================
//      
// ==================================================
public async destacarServicio(req: Request, res: Response): Promise<void> {

    var pIdServicio = req.params.IdServicio;

    pool.query(`call bsp_destacar_servicio('${pIdServicio}')`, function(err: any, result: any){

        if(err || result[0][0].mensaje !== 'Ok'){
            return res.status(200).json({
                ok: false,
                mensaje: result[0][0].mensaje
            });
        }
        
        res.status(200).json(result);
    })
}
// ==================================================
//        Lista los servicios destacados para mostrar en el home
// ==================================================
public async listarPromocionesHome(req: Request, res: Response): Promise<void> {
    
    pool.query(`call bsp_listar_promociones_home()`, function(err: any, result: any, fields: any){
        if(err){
            res.status(500).json(result);
            return;
        }
        res.status(200).json(result);
    })
}
// ==================================================
//        Lista
// ==================================================
public async listarServiciosCategoria(req: Request, res: Response): Promise<void> {

    const IdCategoria = req.params.IdCategoria;
    var desde = req.params.pDesde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_dame_servicios_categoria_id('${IdCategoria}','${desde}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}


// ==================================================
//  Obtiene loss detalles del servicio para el e-commerce
// ==================================================
public async dameDatosServicio(req: Request, res: Response): Promise<void> {

    const { pIdSabor } = req.params;
    const { pIdServicio } = req.params;

    pool.query(`call bsp_dame_servicio_front('${pIdServicio}','${pIdSabor}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//       
// ==================================================
public async listarServiciosRelacionados(req: Request, res: Response): Promise<void> {

    const { pIdServicio } = req.params;

    pool.query(`call bsp_dame_servicios_relacionados('${pIdServicio}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}
// ==================================================
//   Cargo las marcas,categorias,subcategorias,unidades,sucursal principal
// ==================================================
public async cargarDatosFormEditarServicio(req: Request, res: Response): Promise<void> {

    const { IdServicio } = req.params;
    const { IdPersona } = req.params;

    pool.query(`call bsp_dame_datos_form_editar_servicio('${IdPersona}','${IdServicio}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//  
// ==================================================
public async dameStockSaborServicio(req: Request, res: Response): Promise<void> {

    const { pIdServicio } = req.params;
    const { pIdSabor } = req.params;

    pool.query(`call bsp_stock_sabor_servicio('${pIdServicio}','${pIdSabor}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}
// ==================================================
//   Cargo las marcas,categorias,subcategorias,unidades,sucursal principal
// ==================================================
public async cargarDatosFormNuevoServicio(req: Request, res: Response): Promise<void> {

    pool.query(`call bsp_dame_datos_form_nuevo_servicio()`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}
// ==============================
// ==================================================
//       ***** UNIDADES *****
// ==================================================
// ==============================
public async listarUnidadesPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_unidades_paginado('${desde}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

public async listarTodasUnidades(req: Request, res: Response): Promise<void> {

    pool.query(`call bsp_listar_todas_unidades()`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}
// ==================================================
//    Nueva unidad
// ==================================================
public async altaUnidad(req: Request, res: Response, callback: any) {

    var pUnidad = req.body[0];
    var pNombreCorto = req.body[1];

    pool.query(`call bsp_alta_unidad('${pUnidad}','${pNombreCorto}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
   
}

// ==================================================
//        Edita una 
// ==================================================
public async editarUnidad(req: Request, res: Response) {

    var pIdUnidad = req.body[0];
    var pUnidad = req.body[1];
    var pNombreCorto = req.body[2];

    var pNombreCorto =  pNombreCorto.replace(/'/g, "");

    pool.query(`call bsp_editar_unidad('${pIdUnidad}','${pUnidad}','${pNombreCorto}')`, function(err: any, result: any){
        
        if(err || result.mensaje !== 'Ok'){
            logger.error("Error en editarUnidad - bsp_editar_unidad - serviciosController");

            return res.json({
                ok: false,
                mensaje: result[0][0].mensaje
            });
        }

        return res.json({ mensaje: 'Ok' });
    })

}

// ==================================================
//   Cargo 
// ==================================================
public async cargarDatosFormEditarUnidad(req: Request, res: Response): Promise<void> {

    const { IdPersona } = req.params;
    const { IdUnidad } = req.params;

    pool.query(`call bsp_dame_datos_form_editar_unidad('${IdPersona}','${IdUnidad}')`, function(err: any, result: any){
        if(err){
            logger.error("Error en bsp_dame_datos_form_editar_unidad - ServiciosController ");

            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//      
// ==================================================
public async bajaUnidad(req: Request, res: Response): Promise<void> {

    var IdUnidad = req.params.IdUnidad;

    pool.query(`call bsp_baja_unidad('${IdUnidad}')`, function(err: any, result: any){

        if(err || result[0][0].mensaje !== 'Ok'){
            logger.error("Error en bsp_baja_unidad - ServiciosController ");

            return res.status(200).json({
                ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }
        
        res.status(200).json(result);
    })
}

// ==================================================
//       ***** Promociones *****
// ==================================================
// ==============================
public async listarPromocionesPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_promociones_paginado('${desde}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//  Obtiene loss detalles de la promocion para el e-commerce
// ==================================================
public async dameDatosPromocion(req: Request, res: Response): Promise<void> {

    const { pIdPromocion } = req.params;
    const { pIdSabor1 } = req.params;
    const { pIdSabor2 } = req.params;

    pool.query(`call bsp_dame_promocion_front('${pIdPromocion}','${pIdSabor1}','${pIdSabor2}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}
// ==============================
public async altaPromocion(req: Request, res: Response) {

    var pIdProdUno = req.body[0]; 
    var pIdProdDos = req.body[1];
    var pPromocion = req.body[2];
    var pDescripcion = req.body[3];

    if(pDescripcion == undefined || pDescripcion == 'undefined')
    { 
        pDescripcion = '';
    }

    pool.query(`call bsp_alta_promocion('${req.params.IdPersona}','${pIdProdUno}','${pIdProdDos}','${pPromocion}','${pDescripcion}')`, function(err: any, result: any, fields: any){
        
        if(err){
            logger.error("Error en bsp_alta_promocion - serviciosController");

            res.status(404).json({ text: err });
            return;
        }

        if(result[0][0].mensaje !== 'Ok'){
            return res.status(200).json({
                ok: false,
                mensaje: result[0][0].mensaje
            });
        }else{
            logger.error("Error en altaPromocion - serviciosController");
        }

        res.status(200).json(result);

    })

}

// ==================================================
//        
// ==================================================
public async publicarPromocion(req: Request, res: Response): Promise<void> {

    var pIdPromocion = req.params.IdPromocion;

    pool.query(`call bsp_publicar_promocion('${pIdPromocion}')`, function(err: any, result: any){

        if(err || result[0][0].mensaje !== 'Ok'){
            return res.status(200).json({
                ok: false,
                mensaje: result[0][0].mensaje
            });
        }
        
        res.status(200).json(result);
    })
}
// ==================================================
//        
// ==================================================
public async listarPromocionesPaginadoFront(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_promociones_paginado_front('${desde}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//       ***** Tranferencias *****
// ==================================================
// ==============================
public async listarTransferenciasPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);

    var pFecha = req.params.pFecha;
    var pIdUsuario = req.params.IdPersona;

    pool.query(`call bsp_listar_transferencias_paginado('${pIdUsuario}','${desde}','${pFecha}')`, function(err: any, result: any){

        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//    Nueva transferencia de stock
// ==================================================
public async altaTransferencia(req: Request, res: Response, callback: any) {

    var fechaTransferencia = req.body[0];
    var pIdSucursalOrigen = req.body[1];
    var pIdSucursalDestino = req.body[2];
    var totalTransferencia = req.body[3];
    var pLineaTransferencias = req.body[4];

    var pIdUsuario = req.params.IdPersona;

    pool.query(`call bsp_alta_transferencia('${pIdUsuario}','${fechaTransferencia}','${pIdSucursalOrigen}','${pIdSucursalDestino}','${totalTransferencia}')`, (err: any, result: any) =>{

       if(err || result[0][0].mensaje != 'Ok' || result[0][0].Level == 'Error'){
        logger.error("Error en altaTransferencia - bsp_alta_transferencia - serviciosController");

            callback(err,null);

            pool.query(`call bsp_alta_log('${pIdUsuario}',"${String(result[0][0].Message)}",'serviciosController','${result[0][0].code}','bsp_alta_linea_transferencia','${err}')`, function(err: any, result: any){               
                if(err){
                    return;
                }
            })

            pool.query(`call bsp_baja_transferencia('${result[0][0].pIdTransferencia}')`, function(err: any, result: any){
                if(err){
                    return;
                }
            })
           
            res.status(404).json(result[0][0].mensaje);
            return;
       }
       else{ 
        pLineaTransferencias.forEach(function (value: any) {
    
            pool.query(`call bsp_alta_linea_transferencia('${result[0][0].pIdTransferencia}','${value.IdServicioSabor}','${pIdSucursalOrigen}','${pIdSucursalDestino}','${value.Cantidad}')`, function (err2: any, result2: any) {
    
    
                if (err2 || result2[0][0].mensaje != 'Ok' || result2[0][0].Level == 'Error') {
                    logger.error("Error en altaTransferencia - bsp_alta_linea_transferencia - serviciosController");

    
                    pool.query(`call bsp_baja_transferencia('${result[0][0].pIdTransferencia}')`, function (err: any, result: any) {
                        if (err) {
                            return;
                        }
                    });
    
                    pool.query(`call bsp_alta_log('${pIdUsuario}',"${String(result2[0][0].Message)}",'serviciosController','${result2[0][0].Code}','bsp_alta_linea_transferencia','${err2}')`, function (err: any, result: any) {

                    });
                    
                    res.status(400).json({mensaje: 'Error'});
                    return;
                }
                else
                {
                    res.status(200).json({mensaje: 'Ok'});
                }
            });
            
        });
    
       }
        
    });
   
}


// ==================================================
//        buscarServicioAutoCompleteTransferencia
// ==================================================
public async buscarServicioAutoCompleteTransferencia(req: Request, res: Response): Promise<void> {

    var pParametroBusqueda = req.params.pParametroBusqueda || '';
    var pIdSucursalOrigen = req.params.pIdSucursalOrigen || '';

    if(pParametroBusqueda == null || pParametroBusqueda == 'null')
    {
        pParametroBusqueda = '';
    }

    pool.query(`call bsp_buscar_servicio_autocomplete_sucursal('${pParametroBusqueda}','${pIdSucursalOrigen}')`, function(err: any, result: any){
        
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}


}


const serviciosController = new ServiciosController;
export default serviciosController;