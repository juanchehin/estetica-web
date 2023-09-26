import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import { UnidadesService } from '../../../../services/unidades.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styles: []
})
export class ServicioComponent implements OnInit {

  cargando = true;
 
  // ==============================    
  servicio = '';
  descripcion = '';
  precio: any;

  

  constructor(
    private router: Router, 
    public serviciosService: ServiciosService, 
    public activatedRoute: ActivatedRoute,
    public unidadesService: UnidadesService,
    public alertService: AlertService
    ) {

  }

  ngOnInit() {
  }

// ==================================================
//        Crear 
// ==================================================

altaServicio() {

      //** */
      if((this.servicio.length <= 0 || this.servicio == '') ){
        this.alertService.alertFailWithText('Debe cargar un nombre para el servicio','Atencion',2000);
        return;
      }
      //** */
      if((this.precio == undefined || this.precio.length <= 0 || this.precio == '' || this.precio <= 0) ){
        console.log("pasa err");
        this.alertService.alertFailWithText('Debe cargar un precio para el servicio','Atencion',2000);
        return;
      }
   

      const servicio = new Array(        
        this.servicio,
        this.precio,
        this.descripcion
      );

      this.serviciosService.altaServicio( servicio )
                .subscribe( {
                  next: (resp: any) => { 
                    
                    if ( resp.mensaje === 'Ok') {
                      this.alertService.alertSuccess('Atencion','Servicio cargado',2000);
                      this.router.navigate(['/dashboard/servicios']);
                    } else {
                      this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);
                    }
                    return;
                   },
                  error: () => { this.alertService.alertFail('Ocurrio un error',false,2000) }
                });

}

}
