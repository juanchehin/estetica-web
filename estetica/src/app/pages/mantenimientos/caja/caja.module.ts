import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajaRoutingModule } from './caja-routing.module';
import { RouterModule } from '@angular/router';

import { CajaComponent } from './caja/caja.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CajaRoutingModule,
    RouterModule,
    // AutocompleteLibModule,
    // ReactiveFormsModule,
    // ReactiveFormsModule
  ],
  declarations: [
    CajaComponent
  ]
})
export class CajasModule { }
