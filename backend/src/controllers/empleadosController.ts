import { Request, Response, NextFunction, response } from 'express';
import pool from '../database';
const bcrypt = require('bcrypt');

const logger = require("../utils/logger").logger;

class EmpleadosController {


// ==================================================
//        Obtiene un empleado de la BD
// ==================================================
public async dameDatosEmpleado(req: Request, res: Response): Promise<any> {
    const { IdPersona } = req.params;

    pool.query(`call bsp_dame_empleado('${IdPersona}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        
        res.status(200).json(result[0]);
    })

}

// ==================================================
//        Inserta un empleado enviando un correo de confirmacion
// ==================================================
public async altaEmpleado(req: Request, res: Response) {

    const { IdPersona } = req.params;
    var Apellidos = req.body[0];
    var Nombres = req.body[1];
    var DNI = req.body[2];
    var Telefono = req.body[3];
    var Email = req.body[4];
    var Observaciones = req.body[5];
    
    pool.query(`call bsp_alta_empleado_panel('${IdPersona}','${Apellidos}','${Nombres}','${DNI}','${Telefono}','${Email}','${Observaciones}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })

    // enviarMailBienvenida(Email);   

}
// ==================================================
//      
// ==================================================
public async editarEmpleado(req: Request, res: Response) {

    const { IdPersona } = req.params;

    var Apellidos = req.body[0];
    var Nombres = req.body[1];
    var Telefono = req.body[2];
    var DNI = req.body[3];
    var Email = req.body[4];
    var Observaciones = req.body[5];

    var pIdEmpleado = req.body[6];

    pool.query(`call bsp_editar_empleado('${IdPersona}','${pIdEmpleado}','${Apellidos}','${Nombres}','${Telefono}','${DNI}','${Email}','${Observaciones}')`,function(err: any, result: any, fields: any){
        
                if(err){
                    res.status(404).json(err);
                    return;
                }
                
                if(result[0][0].Mensaje !== 'Ok'){
                    return res.json( result );
                }

                return res.json({ Mensaje: 'Ok' });
            })          
    
}

// ==================================================
//   Edita el empleado desde la cuenta del empleado por el empleado
// ==================================================
public async editarEmpleadoFront(req: Request, res: Response) {

    const { IdPersona } = req.params;

    var Apellidos = req.body[0];
    var Nombres = req.body[1];
    var Telefono = req.body[2];
    var DNI = req.body[3];
    var Email = req.body[4];

    pool.query(`call bsp_editar_empleado_front('${IdPersona}','${Apellidos}','${Nombres}','${Telefono}','${DNI}','${Email}')`,function(err: any, result: any){
        
                if(err){
                    logger.error("Error en editarEmpleadoFront - empleadosController " + err);

                    res.status(404).json(err);
                    return;
                }
                
                if(result[0][0].Mensaje !== 'Ok'){
                    logger.error("Error en editarEmpleadoFront - empleadosController " + result );

                    return res.json( result );
                }

                return res.json({ Mensaje: 'Ok' });
            })          
    
}


// ==================================================
//        Lista Empleados desde cierto valor
// ==================================================
public async buscarEmpleadosPaginado(req: Request, res: Response): Promise<void> {
    console.log("pasa emp");
    
    var desde = req.params.desde || 0;
    desde  = Number(desde);

    var pIdPersona = req.params.IdPersona;
    var empleadoBuscado: any = req.params.empleadoBuscado;
    var filtroEmpleado: any = req.params.filtroEmpleado;
    
    if(empleadoBuscado == '0' || empleadoBuscado == 0)
    {
        empleadoBuscado = "todosEmpleados";
    }

    pool.query(`call bsp_buscar_empleados_paginado('${empleadoBuscado}','${desde}')`, function(err: any, result: any, fields: any){
        if(err){
           res.status(404).json(result);
           return;
       }
       res.status(200).json(result);
    })

 }

// ==================================================
//        
// ==================================================
public async buscarEmpleado(req: Request, res: Response): Promise<any> {
    var empleadoBuscado = req.params.empleadoBuscado;

    pool.query(`call bsp_buscar_empleado_autocomplete('${empleadoBuscado}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json({ text: "El empleado no existe" });
            return;
        }
        
        res.status(200).json(result[0]);
    })

}
 // ==================================================
//        Lista 
// ==================================================

public async cargarDatosFormEditarEmpleado(req: Request, res: Response): Promise<void> {
    var pIdEmpleado = req.params.pIdEmpleado;
    var IdPersona = req.params.IdPersona;

    pool.query(`call bsp_dame_datos_empleado('${IdPersona}','${pIdEmpleado}')`, function(err: any, result: any, fields: any){
       if(err){
           console.log("error", err);
           return;
       }
       res.json(result);
   })
}

// ==================================================
//        Obtiene un empleado de la BD
// ==================================================
public async bajaEmpleado(req: Request, res: Response): Promise<any> {
    const { IdPersona } = req.params;
    const { IdEmpleado } = req.params;

    pool.query(`call bsp_baja_empleado('${IdPersona}','${IdEmpleado}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        
        res.status(200).json(result[0]);
    })

}

// ==================================================
//        Edita un empleado
// ==================================================


public async actualizaEmpleado(req: Request, res: Response) {

    var IdPersona = req.body.IdPersona;
    var IdTipoDocumento = req.body.IdTipoDocumento;
    var Apellidos = req.body.Apellidos;
    var Nombres = req.body.Nombres;
    var Documento = req.body.Documento;
    var Password = req.body.Password;
    var Telefono = req.body.Telefono;
    var Sexo = req.body.Sexo;
    var Observaciones = req.body.Observaciones;
    var FechaNac = req.body.FechaNac;
    var Correo = req.body.Correo;
    var Usuario = req.body.Usuario;
    var Calle = req.body.Calle;
    var Piso = req.body.Piso;
    var Departamento = req.body.Departamento;
    var Ciudad = req.body.Ciudad;
    var Pais = req.body.Pais;
    var Numero = req.body.Numero;    // 20
    var Objetivo = req.body.Objetivo;
    var Ocupacion = req.body.Ocupacion;
    var Horario = req.body.Horario;

    pool.query(`call bsp_editar_empleado('${IdPersona}','${IdTipoDocumento}','${Apellidos}','${Nombres}',
    '${Documento}','${Password}','${Telefono}','${Sexo}','${Observaciones}','${FechaNac}',
    '${Correo}','${Usuario}','${Calle}',${Piso},'${Departamento}','${Ciudad}','${Pais}',${Numero},
    '${Objetivo}','${Ocupacion}','${Horario}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error : ", err);
            res.status(404).json({ text: "Ocurrio un problema" });
            return;
        }
    
        if(result[0][0].Mensaje !== 'Ok'){
            return res.json({
                ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }

        return res.json({ Mensaje: 'Ok' });
    })

}

}


const empleadosController = new EmpleadosController;
export default empleadosController;