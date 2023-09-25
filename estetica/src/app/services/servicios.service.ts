import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

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
  listarServiciosPaginado(desde: any,IdSucursal: any,pParametroBusqueda: any){

    let url = URL_SERVICIOS + '/servicios/buscar/' + desde + '/' + pParametroBusqueda + '/' + IdSucursal + '/' + this.IdPersona;

    return this.http.get( url, this.headers );
  }  

  // ==================================================
//        
// ==================================================
altaProducto( servicio: any ) {

  let url = URL_SERVICIOS + '/servicios/alta/' + this.IdPersona;

  return this.http.post( url, servicio, this.headers);
}
  // ==================================================
//        
// ==================================================
destacarProducto( IdProducto: any ) {

  let url = URL_SERVICIOS + '/servicios/destacar/' + IdProducto + '/' + this.IdPersona;

  return this.http.get(url,this.headers);
}
  // ==================================================
//        
// ==================================================
ofertarProducto( IdProducto: any ) {

  let url = URL_SERVICIOS + '/servicios/ofertar/' + IdProducto + '/' + this.IdPersona;

  return this.http.get(url,this.headers);
}
  // ==================================================
//        
// ==================================================
publicarProducto( IdProducto: any ) {

  let url = URL_SERVICIOS + '/servicios/publicar/' + IdProducto + '/' + this.IdPersona;

  return this.http.get(url,this.headers);
}
  // ==================================================
//        
// ==================================================
editarProducto( servicioEditado: any ) {

  let url = URL_SERVICIOS + '/servicios/editar/' + this.IdPersona;

  return this.http.post(
    url,
    servicioEditado,
    {
      headers: {
        token: this.token
      }
    }
);
}
  // ==================================================
//        
// ==================================================
bajaProducto( IdProductoSabor: any ) {

  let url = URL_SERVICIOS + '/servicios/baja/' + IdProductoSabor + '/' + this.IdPersona;

  return this.http.get(
    url,
    {
      headers: {
        token: this.token
      }
    }
);
}
// ==================================================
//  Carga los servicios en el autocomplete, que coincidan con el parametroBusqueda
// ==================================================
cargarServicios( parametroBusqueda: string, IdSucursal: any){

    let url = URL_SERVICIOS + '/servicios/listar/busqueda/autocomplete/' + parametroBusqueda + '/' + IdSucursal + '/' + this.IdPersona;
    return this.http.get( url, this.headers ); 
    
}
// ==================================================
//
// ==================================================
cargarServiciosTranferencia( parametroBusqueda: string, IdSucursalOrigen: any){

  let url = URL_SERVICIOS + '/servicios/listar/busqueda/autocomplete/transferencia/' + parametroBusqueda + '/' + IdSucursalOrigen;
  return this.http.get( url, this.headers ); 
  
}
// ==================================================
// Cargo las marcas,categorias,unidades,sucursal principal
// ==================================================
cargarDatosFormNuevoProducto( ){
  
    let url = URL_SERVICIOS + '/servicios/nuevo/datos-formulario';
    return this.http.get( url , this.headers);
  
}
// ==================================================
// Cargo las marcas,categorias,unidades,sucursal principal y el servicio
// ==================================================
cargarDatosFormEditarProducto(IdProducto: any ){
  
  let url = URL_SERVICIOS + '/servicios/editar/datos-formulario/' + IdProducto + '/' + this.IdPersona;
  return this.http.get( url , this.headers );

}
// ==================================================
// Busca 
// ==================================================

buscarServicios( servicio: string , pDesde: any ): any {

  if(servicio == '' || servicio == null){
    let url = URL_SERVICIOS + '/servicios/listar/' + 0;
    return this.http.get(url, this.headers);
  }
  else
  { 
    const url = URL_SERVICIOS + '/servicios/buscar/' + servicio + '/' + pDesde;
    return this.http.get(url, this.headers);
  } 

}

// ==================================================
//  ******* Promociones *******        
// ==================================================
// ==================================================
//
// ==================================================
listarPromocionesPaginado(desde: any){

  let url = URL_SERVICIOS + '/servicios/promociones/listar/' + desde;

  return this.http.get( url );
}

  // ==================================================
//        
// ==================================================
altaPromocion( promocion: any ) {

  let url = URL_SERVICIOS + '/servicios/promocion/alta/'+ this.IdPersona;

  return this.http.post( url, promocion, this.headers);
}


  // ==================================================
//        
// ==================================================
editarPromocion( promocion: any ) {

  let url = URL_SERVICIOS + '/servicios/promocion/update';
  // url += '?IdRol=' + this.IdRol;

  return this.http.put(
    url,
    promocion
    // {
    //   headers: {
    //     token: this.token
    //   }
    // }
);
}

  // ==================================================
//        
// ==================================================
publicarPromocion( IdPromocion: any ) {

  let url = URL_SERVICIOS + '/servicios/promocion/publicar/' + IdPromocion + '/' + this.IdPersona;

  return this.http.get(url,this.headers);
}

  // ==================================================
//        
// ==================================================
bajaPromocion( IdPromocion: any ) {

  let url = URL_SERVICIOS + '/servicios/promocion/baja/' + IdPromocion + '/' + this.IdPersona;

  return this.http.get(url,this.headers);

}
// ==================================================
//  ******* Transferencias *******        
// ==================================================

// ==================================================
//
// ==================================================
listarTransferenciasPaginado(desde: any,fecha: any){

  let url = URL_SERVICIOS + '/servicios/transferencias/listar/' + desde + '/' + fecha + '/' + this.IdPersona;

  return this.http.get( url, this.headers );
}  
  // ==================================================
//        
// ==================================================
altaTransferencia( transferencia: any ) {

  let url = URL_SERVICIOS + '/servicios/transferencias/alta/' + this.IdPersona;

  return this.http.post(
    url,
    transferencia,
    {
      headers: {
        token: this.token
      }
    }
);
}
  // ==================================================
//        
// ==================================================
bajaTransferencia( IdTransferencia: any ) {

  let url = URL_SERVICIOS + '/servicios/transferencias/baja/' + IdTransferencia + '/' + this.IdPersona;

  return this.http.get(
    url,
    {
      headers: {
        token: this.token
      }
    }
);
}
}
