import { Component, OnInit, NgZone, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor( 
    private router: Router,              
    public authService: AuthService,
    private alertService: AlertService
  )
  { }

  ngOnInit(): void {
    this.authService.logout();

    this.form = new FormGroup({      
      usuario: new FormControl(null, Validators.required ),
      password: new FormControl(null, Validators.required )
    });
  }

// ==================================================
//  Proceso de LOGUEO
// ==================================================
ingresar() {
  console.log('ingresar::: ');

  if ( this.form.invalid ) {
    return;
  }

  const persona = new Array(
    this.form.value.usuario,
    this.form.value.password
  );

  console.log('ingresar::: 2');

  this.authService.login(persona)
      .subscribe((resp: any) => {
        console.log('resp::: ', resp);
        
        if ( resp == true) {
          this.router.navigate(['/dashboard']);
          return;
        }

        this.alertService.alertFailWithText('Error','Error de credenciales',false,3000)

    },
    ( error: any) => {
      console.log('err::: ');

      this.alertService.alertFailWithText('Atencion','Ocurrio un error, contactese con el adminsitrador',false,3000)

    }

    );

}

}
