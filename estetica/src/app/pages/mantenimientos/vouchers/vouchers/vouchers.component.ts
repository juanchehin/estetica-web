import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { VouchersService } from 'src/app/services/vouchers.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styles: []
})
export class VouchersComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;
  estado_voucher = 'T';
  vouchers!: any;
  sucursales: any;
  cantidad_vouchers = 0;
  id_voucher_seleccionado: any;

  @ViewChild('inputVoucherBuscado') inputVoucherBuscado!: ElementRef;
  @ViewChild('divCerrarModalBajaVoucher') divCerrarModalBajaVoucher!: ElementRef;


  constructor(
    public vouchersService: VouchersService,
    public alertaService: AlertService
  ) {
   }

  ngOnInit() {
    this.listar_vouchers();
  }

// ==================================================
// Carga
// ==================================================

listar_vouchers() {

  this.alertaService.cargando = true;

    this.vouchersService.listar_vouchers_paginado( this.desde , this.estado_voucher  )
               .subscribe( {
                next: (resp: any) => { 

                  if(resp[0].length <= 0)
                  { 
                    this.vouchers = [];
                    this.cantidad_vouchers = 0;
                    this.alertaService.cargando = false;
                    
                    return;
                  }
  
                  if ( resp[2][0].mensaje == 'Ok') {
                    
                    this.cantidad_vouchers = resp[1][0].cantidad_transacciones;
                    this.vouchers = resp[0];
                    this.alertaService.cargando = false;

                  } else {
                    this.alertaService.alertFail('Ocurrio un error',false,2000);
                  }
                  this.alertaService.cargando = false;

                  return;
                 },
                error: () => { 
                  this.alertaService.alertFail('Ocurrio un error',false,2000)
                }
              })
              this.alertaService.cargando = false;
              ;

  }

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.cantidad_vouchers ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.listar_vouchers();

}


// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  
  this.desde = 0;
  
  this.listar_vouchers();

}


// ==================================================
// 
// ==================================================

baja_voucher() {

  this.vouchersService.baja_voucher( this.id_voucher_seleccionado )
  .subscribe({
    next: (resp: any) => {

      if((resp[0][0].Mensaje == 'Ok')) {

        this.alertaService.alertSuccess('Eliminacion','Voucher dada de baja',3000);
        
        let el: HTMLElement = this.divCerrarModalBajaVoucher.nativeElement;
        el.click();

        this.refrescar();
        
      } else {
        
        this.alertaService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
        
      }
     },
    error: (resp: any) => {  

      this.alertaService.alertFail(resp[0][0].mensaje,false,1200);
    
    }
  });

}

// ==================================================
// 
// ==================================================

modal_baja_voucher(id_voucher: string) {

  this.id_voucher_seleccionado = id_voucher;

}


}
