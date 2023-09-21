import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasComponent } from './listar-ventas/ventas.component';
import { MisVentasComponent } from './mis-ventas/mis-ventas.component';
import { NuevaVentaComponent } from './nueva-venta/nueva-venta.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VentasComponent,
    MisVentasComponent,
    NuevaVentaComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    FormsModule
  ]
})
export class VentasModule { }
