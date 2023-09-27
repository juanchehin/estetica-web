import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class CajasService {

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'token': this.token
      }
    }
  }
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


  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) { }

// ==================================================
//
// ==================================================
  listarCajasPaginado(desde: any,IdSucursal: any){

    let url = URL_SERVICIOS + '/caja/listar/' + desde + '/' + IdSucursal + '/' + this.IdPersona;

    return this.http.get( url, this.headers );
  }  

// ==================================================
//        
// ==================================================
apertura( monto: any ) {

  const IdSucursal = localStorage.getItem('id_sucursal');

  let url = URL_SERVICIOS + '/caja/apertura/' + IdSucursal;

  return this.http.post( url, monto, this.headers);
}

// ==================================================
//        
// ==================================================
cierre( monto: any ) {

  const IdSucursal = localStorage.getItem('id_sucursal');


  let url = URL_SERVICIOS + '/caja/cierre/' + IdSucursal;

  return this.http.post( url, monto, this.headers);
}
}
