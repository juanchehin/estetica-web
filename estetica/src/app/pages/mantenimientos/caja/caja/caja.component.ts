import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CajasService } from 'src/app/services/cajas.service';

@Component({
  selector: 'app-cajas',
  templateUrl: './caja.component.html',
  styles: []
})
export class CajaComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  totalMovimientos = 0;
  IdSucursal: any;
  cajas!: any;
  movimientos: any;
  totalCajas = 0;
  estado_caja = 'N';
  monto_apertura: any;
  monto_cierre: any;
  boton_apertura_cierre = 'A';


  @ViewChild('inputCajaBuscado') inputCajaBuscado!: ElementRef;

  constructor(
    public cajasService: CajasService,
    public alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.listar_movimientos_caja();
  }

// ==================================================
// Carga
// ==================================================

listar_movimientos_caja() {

    // const inputElement: HTMLInputElement = document.getElementById('buscarCaja') as HTMLInputElement;
    // const cajaBuscado: any = inputElement.value || '-';

    this.IdSucursal = localStorage.getItem('id_sucursal');

    this.cajasService.listarCajasPaginado( this.desde , this.IdSucursal  )
               .subscribe( {
                next: (resp: any) => { 

                  if(resp[0].length <= 0)
                  { 
                    this.movimientos = [];
                    this.totalCajas = 0;
                    
                    return;
                  }
  
                  if ( resp[3][0].mensaje == 'Ok') {
                    
                    this.totalCajas = resp[1][0].cantCajasBuscados;
                    this.movimientos = resp[0];

                    if(resp[2][0].estado_caja == 'A')
                    {
                      this.estado_caja = 'Aperturada';
                      this.boton_apertura_cierre = 'A';
                    }else{
                      this.estado_caja = 'Cerrada';
                      this.boton_apertura_cierre = 'C';
                    }

                  } else {
                    this.alertService.alertFail('Ocurrio un error',false,2000);
                  }
                  return;
                 },
                error: () => { 
                  this.alertService.alertFail('Ocurrio un error',false,2000)
                }
              });

  }

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalCajas ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.listar_movimientos_caja();

}


// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  // this.inputCajaBuscado.nativeElement.value = '';
  
  this.desde = 0;
  this.listar_movimientos_caja();

}


// ==================================================
// 
// ==================================================

apertura() {

  if(this.monto_apertura <= 0)
  {
    this.alertService.alertFail('Mensaje','Monto invalido',2000);
    return;
  }

  this.cajasService.apertura( this.monto_apertura )
  .subscribe({
    next: (resp: any) => { 


      if(resp[0][0].mensaje == 'Ok') {
        this.alertService.alertSuccess('top-end','Caja dado de baja',3000);
        // this.buscarCaja();
        
      } else {
        this.alertService.alertFail(resp[0][0].mensaje,false,1200);
        
      }
      },
    error: (resp: any) => {  this.alertService.alertFail(resp[0][0].mensaje,false,1200); }
  });

}

// ==================================================
// 
// ==================================================

cierre() {

  if(this.monto_cierre <= 0)
  {
    this.alertService.alertFail('Mensaje','Monto invalido',2000);
    return;
  }

  this.cajasService.cierre( this.monto_cierre )
  .subscribe({
    next: (resp: any) => { 


      if(resp[0][0].mensaje == 'Ok') {
        this.alertService.alertSuccess('top-end','Caja dado de baja',3000);
        // this.buscarCaja();
        
      } else {
        this.alertService.alertFail(resp[0][0].mensaje,false,1200);
        
      }
      },
    error: (resp: any) => {  this.alertService.alertFail(resp[0][0].mensaje,false,1200); }
  });

}

}
