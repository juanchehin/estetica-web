import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { NuevoGastoComponent } from './gastos/nuevo-gasto/nuevo-gasto.component';
import { ListarGastosComponent } from './gastos/listar-gastos/listar-gastos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ListarGastosComponent,
    NuevoGastoComponent
  ],
  imports: [
    CommonModule,
    ComprasRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class ComprasModule { }
