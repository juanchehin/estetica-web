import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { VentasService } from 'src/app/services/ventas.service';
import { AlertService } from 'src/app/services/alert.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-mis-ventas',
  templateUrl: './mis-ventas.component.html',
  styles: []
})
export class MisVentasComponent implements OnInit {

  @ViewChild('content') content: ElementRef | undefined;

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;
  fecha: any;
  ventas!: any;
  cantPlanes = 0;
  IdPersona: any;
  controlFechas = false;
  totalProveedores = 0;
  cargando = true;
  totalVentas: any = '-';


  constructor(
    public proveedoresService: ProveedoresService,
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public ventasService: VentasService,
    private alertService: AlertService,
    private utilService: UtilService
  ) {
   }

  ngOnInit() {
    this.fecha = new Date();
    const previous = new Date(this.fecha.getTime());
    previous.setDate(this.fecha.getDate() - 1);
    this.fecha = this.utilService.formatDate(previous);
    this.cargarVentasIdUsuario();

    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');


    if(this.IdPersona || (this.IdPersona.length == 0))
    { 
      this.authService.quoteIdPersona.subscribe((data : any)=>{
        this.IdPersona = data;

        if(Object.keys(this.IdPersona).length <= 0)
        { 
          this.IdPersona = localStorage.getItem('id');
        }
      });
    }
  }

// ==================================================
// Carga
// ==================================================

cargarVentasIdUsuario() { 

  const pFecha = this.utilService.formatDate(this.fecha);

    this.ventasService.listarVentasIdUsuario(this.desde, pFecha  )
    .subscribe({
      next: (resp: any) => { 

        console.log("resp cargarVentasIdUsuario : ",resp)

        if(resp[2][0].mensaje == 'Ok') {
          this.ventas = resp[0];
          this.totalVentas = resp[1][0].totalVentas;
          
        } else {
          this.alertService.alertFail('Ocurrio un error',false,400);
          
        }
       },
      error: (err: any) => { 
        this.alertService.alertFail('Ocurrio un error',false,400);
       }
    });

  }


// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  this.desde = 0;
  this.cargarVentasIdUsuario();
}

// ==================================================
// Detecta los cambios en el select
// ==================================================
cambiosFecha(nuevaFechaInicio: any) {

  if (nuevaFechaInicio > this.fecha) {
    // this.FechaInicio = nuevaFechaInicio;
    this.controlFechas = true;
  } else {
    this.controlFechas = false;
  }

}
// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalVentas ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarVentasIdUsuario();

}


// ==================================================
// 
// ==================================================

factura( pIdTransaccion: any) {  


  }


}
