import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VentasService } from 'src/app/services/ventas.service';
import { UtilService } from 'src/app/services/util.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {

  nombreEmpresa: any;
  desde = 0;
  transacciones: any;
  id_transaccion_seleccionado: any;

  fechaInicio = this.utilService.formatDateNow(new Date(Date.now()));
  fechaFin = this.utilService.formatDateNow(new Date(Date.now()));

  ventas_total = 0;
  efectivo = 0;
  credito = 0;
  debito = 0;
  transferencia = 0;
  egresos = 0;
  cta_cte = 0;
  voucher = 0;

  @ViewChild('divCerrarModalBajaTransaccion') divCerrarModalBajaTransaccion!: ElementRef<HTMLElement>;
  @ViewChild('cerrarModalNuevaTransaccionMenu') divCerrarModalNuevoTransaccionMenu!: ElementRef<HTMLElement>;

  constructor(
    private ventasService: VentasService,
    private utilService: UtilService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.cargarDatosDashboard();
  }


// ====================
// 
// =================
cargarDatosDashboard(){

  this.ventasService.listar_transacciones(this.desde,this.fechaInicio,this.fechaFin  )
              .subscribe( (resp: any) => {
              console.log('resp::: ', resp);

              this.transacciones = resp[0];

              this.ventas_total = resp[2][0].p_suma_ventas || 0;
              this.efectivo = resp[2][0].p_suma_efectivo || 0;
              this.credito = resp[2][0].p_suma_deposito || 0;
              this.debito = resp[2][0].p_suma_retiro || 0;
              this.transferencia = resp[2][0].p_suma_transferencia || 0;
              this.egresos = resp[2][0].p_suma_gastos || 0;
              this.voucher = resp[2][0].p_suma_voucher || 0;

            });

}

// ==================================================
// 
// ==================================================

modal_baja_transaccion(id_transaccion: string) {

  this.id_transaccion_seleccionado = id_transaccion;

}

// ==================================================
// 
// ==================================================

baja_transaccion() {

      this.ventasService.baja_transaccion( this.id_transaccion_seleccionado )
      .subscribe({
        next: (resp: any) => {
  
          if((resp[0].Mensaje == 'Ok')) {

            // this.alertService.alertSuccess('Eliminacion','Transaccion dada de baja',3000);
            
            // let el: HTMLElement = this.divCerrarModalBajaTransaccion.nativeElement;
            // el.click();

            this.cargarDatosDashboard();
            
          } else {
            
            this.alertService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
            
          }
         },
        error: (resp: any) => {  

          this.alertService.alertFail(resp[0][0].mensaje,false,1200);
        
        }
      });
  
  }
}
