import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  // ==============================
  get IdPersona(): any {
    if(this.authService.IdPersona)
    {
      return this.authService.IdPersona;
    }
    else
    {
      return localStorage.getItem('id') || '';
    }
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  
  // ==============================
  get headers() {
    return {
      headers: {
        'token': this.token
      }
    }
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

// ==================================================
//
// ==================================================
  listarVentasFecha(desde: number , FechaInicio: any , FechaFin: any){

    let url = URL_SERVICIOS + '/ventas/listar/' + desde + '/' + FechaInicio + '/' + FechaFin;

    return this.http.get( url, this.headers );
  }

// ==================================================
//
// ==================================================
altaVenta( venta : any){

  let url = URL_SERVICIOS + '/ventas/alta/' + this.IdPersona;

  return this.http.post( url, venta,this.headers );
}

// ==================================================
//
// ==================================================
listarVentasIdUsuario(desde: number , Fecha: string ){

  let url = URL_SERVICIOS + '/ventas/listar/mis-ventas/' + desde + '/' + Fecha + '/' + this.IdPersona;

  return this.http.get( url );
}
// ==================================================
//
// ==================================================
cargarTiposPago(){

  let url = URL_SERVICIOS + '/ventas/listar/tipos-pago';

  return this.http.get( url );
}

// ==================================================
//
// ==================================================
dameDatosPDFVenta( pIdTransaccion: any ){

  let url = URL_SERVICIOS + '/ventas/datos-pdf/' + pIdTransaccion;

  return this.http.get( url ,this.headers);
}


// ==================================================
//
// ==================================================
listar_transacciones( desde: number , fecha_inicio: string, fecha_fin: string, turno_seleccionado: string){

  const id_sucursal = localStorage.getItem('id_sucursal');

  let url = URL_SERVICIOS + '/ventas/listar/' + desde + '/' + fecha_inicio + '/' + fecha_fin + '/' + id_sucursal + '/' + turno_seleccionado;

  return this.http.get( url ,this.headers);
}

// ==================================================
//        
// ==================================================
baja_transaccion(id_transaccion: any ) {

  let url = URL_SERVICIOS + '/ventas/baja/' + id_transaccion + '/' + this.IdPersona;

  return this.http.get( url, this.headers);
}

// ==================================================
//
// ==================================================
alta_egreso( egreso : any){

  let url = URL_SERVICIOS + '/ventas/egreso/alta/' + this.IdPersona;

  return this.http.post( url, egreso,this.headers );
}

// ==================================================
//
// ==================================================
dame_transaccion( pIdTransaccion: any ){

  let url = URL_SERVICIOS + '/ventas/dame/' + pIdTransaccion + '/' + this.IdPersona;

  return this.http.get( url ,this.headers);
}


}
