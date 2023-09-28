import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import { CategoriasService } from '../../../../services/categorias.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styles: []
})
export class EditarServicioComponent implements OnInit {

  IdServicio: any;

  // ==============================
  servicio: any;
  precio: any;
  descripcion: any;
  
  constructor(
    private router: Router, 
    public serviciosService: ServiciosService, 
    public activatedRoute: ActivatedRoute,
    public categoriasService: CategoriasService,
    public alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.IdServicio = this.activatedRoute.snapshot.paramMap.get('IdServicio');
    this.cargarDatosFormEditarServicio();

  }

// ==================================================
//    
// ==================================================

update_servicio() {

      //** */
      if((this.precio <= 0) ){
        this.alertService.alertFail('Mensaje','Precio invalido',3000);
        return;
      }
      

      const servicioEditado = new Array(
        this.IdServicio,
        this.servicio,
        this.precio,
        this.descripcion
      );
      
      this.serviciosService.editarServicio( servicioEditado )
                .subscribe( {
                  next: (resp: any) => { 
  
                    console.log("resp serv : ",resp)
                  
                    if ( resp.mensaje === 'Ok') {
                      this.alertService.alertSuccess('Mensaje','Servicio actualizado',2000);
                      this.router.navigate(['/dashboard/servicios']);
                    } else {
                      this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);
                    }
                    return;
                   },
                  error: () => { this.alertService.alertFail('Ocurrio un error',false,2000) }
                });

            }

// ==================================================
// Carga
// ==================================================

cargarDatosFormEditarServicio() {

    this.serviciosService.cargarDatosFormEditarServicio( this.IdServicio )
    .subscribe( {
      next: (resp: any) => { 

        if(resp[1][0].mensaje == 'Ok'){

          this.servicio = resp[0][0].servicio;
          this.precio = resp[0][0].precio;
          this.descripcion = resp[0][0].descripcion;

        }else{
          this.alertService.alertFail('Mensaje','Ocurrio un error',400);

        }

    },
    error: (err: any) => {
      this.alertService.alertFail('Mensaje','Ocurrio un error',400); }
  });

  }


}
