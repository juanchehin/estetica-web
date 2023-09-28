import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { RouterModule } from '@angular/router';

import { ServicioComponent } from './servicios/servicio.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarServicioComponent } from './servicios/editar-servicio.component';
// import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ServiciosRoutingModule,
    RouterModule,
    // AutocompleteLibModule,
    ReactiveFormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ServicioComponent,
    ServiciosComponent,
    EditarServicioComponent
  ]
})
export class ServiciosModule { }
