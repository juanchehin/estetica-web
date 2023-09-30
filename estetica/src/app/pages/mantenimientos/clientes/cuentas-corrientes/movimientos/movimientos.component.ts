import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CuentasService } from 'src/app/services/cuentas.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html'
})
export class MovimientosComponent implements OnInit {

  desde = 0;
  filtroCliente = 4;  // Indica si es un cliente web o un cliente registrado desde el panel
  activarModal = false;
  movimientos!: any;
  cantPlanes = 0;
  IdPersona: any;
  saldo = 0;
  totalMovimientos = 0;
  cargando = true;
  monto = 0;
  descripcion: any;
  apellidos: any;
  tiposPago: any;
  IdTipoPagoSelect = 0;
  nombres: any;
  @ViewChild('divCerrarModal') divCerrarModal!: ElementRef<HTMLElement>;

  constructor(
    public cuentasService: CuentasService,
    private alertService: AlertService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private ventasService: VentasService
  ) {
   }

  ngOnInit() {
    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');
    this.cargarMovimientosClienteCuenta();
    this.cargarTiposPago();
  }

// ==================================================
// Carga
// ==================================================

cargarMovimientosClienteCuenta() {

    this.cuentasService.cargarMovimientosClienteCuenta( this.desde , this.IdPersona )
               .subscribe( {
                next: (resp: any) => { 

                  if(resp[5][0].mensaje == 'Ok')
                  { 
                    this.apellidos = resp[0][0].apellidos;
                    this.nombres = resp[0][0].nombres;

                    this.saldo = resp[3][0].saldo;
    
                    this.movimientos = resp[1];

                    this.totalMovimientos = resp[4][0].cantMovimientos;
                    return;
                  } else {
                    this.alertService.alertFail('Ocurrio un error',false,2000);
                  }
                  return;
                 },
                error: () => { this.alertService.alertFail('Ocurrio un error',false,2000) }
              });

  }



// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalMovimientos ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarMovimientosClienteCuenta();

}
// ==================================================
//   
// ==================================================

acreditar() {
  
 this.activarModal = true;
}

// ==============================
// 
// ================================
cerrarModal(){
  let el: HTMLElement = this.divCerrarModal.nativeElement;
  el.click();
}

// ==============================
// 
// ================================
guardarAcreditacion(){

  if((this.IdTipoPagoSelect == undefined) || (this.IdTipoPagoSelect == 0))
  {
    this.alertService.alertFail('Mensaje','Tipo pago invalido',2000);
    return;
  }

  this.cuentasService.altaAcreditarCliente( this.monto , this.IdPersona ,this.descripcion,this.IdTipoPagoSelect )
  .subscribe( {
   next: (resp: any) => {

    this.cerrarModal();

     if(resp.Mensaje == 'Ok')
     { 
      this.alertService.alertSuccess('Mensaje','Registro guardado',2000);

      this.router.navigate(['/dashboard/clientes/cuenta/movimientos/',this.IdPersona]);
      this.cargarMovimientosClienteCuenta();

      return;
     } else {
       this.alertService.alertFail('Ocurrio un error',false,2000);
     }
     return;
    },
   error: () => { this.alertService.alertFail('Ocurrio un error',false,2000) }
 });

  
}

// ==================================================
// Carga
// ==================================================
cargarTiposPago() {

  this.ventasService.cargarTiposPago( )
             .subscribe( {
              next: (resp: any) => { 
              
              this.tiposPago = resp[0];

            },
            error: (err: any) => {
              this.alertService.alertFail('Ocurrio un error al cargar los tipos de pago ' + err,false,400); }
          });

}
// 
onChangeTipoPago(val: any){
  this.IdTipoPagoSelect = val;
}

}
