import { Request, Response } from 'express';
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require("dotenv").config();

var SEED = process.env.JWT_KEY;

import pool from '../database';
const logger = require("../utils/logger").logger;

class LoginController {

// ========================================================
// Login
// ========================================================

public async login(req: Request, res: Response){

    const email = req.body[0];
    const pass = req.body[1];
    console.log('req.body::: ', req.body);
// 
pool.query(`call bsp_login('${email}')`, function(err: any, resultLogin: string | any[]){
    var menu: any = [];

    if(err){
        pool.query(`call bsp_alta_log('0','0','LoginController','0','loginUsuario','Error de login en panel + ${email}')`, function(err: any, result: any, fields: any){
            if(err){
                logger.error("Error en bsp_alta_log - loginUsuario - loginController " + email);
                return;
            }
        })

        console.log("pasa 1");

        res.status(401).json({
            ok: true,
            mensaje : 'Error de credenciales'
        });
        return;
    }
    // Chequeo la contraseña
    bcrypt.compare(pass, resultLogin[0][0].lPassword, function(err: any, result: any) {

        console.log("pasa 2");
        if(result != true || err){
            logger.error("Error en bcrypt.compare - loginUsuario - loginController ");

            res.status(500).json({
                ok: true,
                mensaje : 'Ocurrio un problema, contactese con el administrador'
            });
            
            return;
        }
        else{ 
            console.log("pasa 3");
             // Creo el token
            var token = jwt.sign({ IdPersona: resultLogin[0][0].lIdPersona }, SEED, { expiresIn: 14400});
            
            menu = resultLogin[1];
            
            // Respuesta
            res.status(200).json({
                ok: true,
                IdPersona: resultLogin[0][0].lIdPersona,
                token: token,
                menu: menu
            });
        }
    });
   
    
})

}


// ==========================================
//  Renueva TOKEN
// ==========================================
public async renuevatoken(req: Request, res: Response): Promise<void> {
    
    var body = req.body;    // Usuario y contraseña

    var token = jwt.sign({ usuario: body.correo }, SEED, { expiresIn: 14400});// 4 horas

    res.status(200).json({
        ok: true,
        token: token
    });

}

}

const loginController = new LoginController;
export default loginController;
