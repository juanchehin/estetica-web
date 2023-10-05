import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: []
})
export class ClienteComponent implements OnInit {

  forma!: FormGroup;

  constructor(
    private router: Router, 
    private alertService: AlertService, 
    public clientesService: ClientesService, 
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
      direccion: new FormControl(null ),
      fecha_nac: new FormControl(null ),
      Observaciones: new FormControl(null )
    });
  }

// ==================================================
//        Crear 
// ==================================================

  altaCliente() {

      if ( this.forma.invalid ) {
        this.alertService.alertFailWithText('Ocurrio un error','Formulario invalido, chequee que los campos sean correctos',4000);

        return;
      }

      const id_sucursal = localStorage.getItem('id_sucursal');

      const cliente = new Array(
        this.forma.value.Apellidos,
        this.forma.value.Nombres,
        this.forma.value.DNI,
        this.forma.value.Telefono,
        this.forma.value.Email,
        this.forma.value.direccion,
        this.forma.value.fecha_nac,
        this.forma.value.Observaciones,
        id_sucursal
      );

      this.clientesService.altaCliente( cliente )
                .subscribe( (resp: any) => {
                  
                  if ( resp[0][0].mensaje == 'Ok') {

                    this.alertService.alertSuccess('Mensaje','cliente cargado con exito',2000);
                    
                    this.router.navigate(['/dashboard/clientes']);
                  } else {
                    this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',4000);
                  }
                  return;
                });


              }

}
