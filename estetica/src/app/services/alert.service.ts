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


// ==============================
 alertConfirm(pTitulo: any,pSubTitulo: any): any {  

  // Swal.fire({
  //   title: pTitulo,
  //   text: pSubTitulo,
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonColor: '#d33',
  //   confirmButtonText: 'Si'
  // }).then((result) => {

  //   return result;

  // }) 
  
}

}
