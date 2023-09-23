import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/services/ventas.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {

  nombreEmpresa: any;
  desde = 0;
  transacciones: any;

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

  constructor(
    private ventasService: VentasService,
    private utilService: UtilService
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


                // this.nombreEmpresa = resp[0][0].nombreEmpresa || 0;
                // this.valorVentasDiarias = resp[1][0].ventasDiaHoy || 0;
                // this.valorComprasDiarias = resp[2][0].comprasDiaHoy || 0;
                // this.valorComprasOnline = resp[3][0].ventasOnlineHoy || 0;
                // this.productosMasVendidosMes = resp[4];
                // this.pedidosConfirmadosHoy = resp[3][0].pedidosConfirmadosHoy || 0;

              });


  }

  
}
