import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styles: []
})
export class EmpleadoComponent implements OnInit {

  forma!: FormGroup;

  constructor(
    private router: Router, 
    private alertService: AlertService, 
    public empleadosService: EmpleadosService, 
    public activatedRoute: ActivatedRoute
    ) {
  }

  ngOnInit() {
    this.forma = new FormGroup({      
      Apellidos: new FormControl(null, Validators.required ),
      Nombres: new FormControl(null, Validators.required ),
      DNI: new FormControl(null),
      Telefono: new FormControl(null ),
      Email: new FormControl(null, Validators.email ),
      Observaciones: new FormControl(null )
    });
  }

// ==================================================
//        Crear 
// ==================================================

  altaEmpleado() {

      if ( this.forma.invalid ) {
        // this.alertService.alertFail('Formulario invalido, chequee que los campos sean correctos',2000);
        return;
      }

      const empleado = new Array(
        this.forma.value.Apellidos,
        this.forma.value.Nombres,
        this.forma.value.DNI,
        this.forma.value.Telefono,
        this.forma.value.Email,
        this.forma.value.direccion,
        this.forma.value.fecha_nac,
        this.forma.value.Observaciones
      );

      this.empleadosService.altaEmpleado( empleado )
                .subscribe(
                  {
                    next: (resp: any) => {
                      if ( resp[0][0].mensaje == 'Ok') {

                            this.alertService.alertSuccess('Mensaje','Empleado cargado',2000);
                            
                            this.router.navigate(['/dashboard/empleados']);
                          } else {
                            this.alertService.alertFail('Mensaje','Ocurrio un error : ' + resp[0][0].mensaje,2000);
                          }
                          return;
                     },
                    error: (resp: any) => {
                
                      this.alertService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',2000);
                    
                    }
                  });

                }
}
