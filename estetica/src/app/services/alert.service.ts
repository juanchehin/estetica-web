import { Injectable } from '@angular/core';
// import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  cargando = false;
  
  constructor(private toastr: ToastrService) { }

  // ==============================
  alertSuccess(pTitulo: any,pMensaje: any,pTimer: any) {
    
    this.toastr.success(pMensaje,pTitulo , {
      timeOut: pTimer,
      positionClass: 'toast-top-right'
    });

  }

 // ==============================
 alertFail(pTitulo: any,pMensaje: any,pTimer: any) {

  this.toastr.error(pMensaje, pTitulo, {
    timeOut: pTimer,
    positionClass: 'toast-top-right'
  });

}

 // ==============================
 alertFailWithText(pTitulo: any,pMensaje: any,pTimer: any) {

  this.toastr.error(pMensaje, pTitulo, {
    timeOut: pTimer,
    positionClass: 'toast-top-right'
  });
}

}
