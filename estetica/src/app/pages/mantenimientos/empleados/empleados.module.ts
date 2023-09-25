import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './empleados/empleados.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmpleadosComponent,
    EmpleadoComponent,
    EditarEmpleadoComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    ReactiveFormsModule,
    FormsModule
    // CuentaComponent,
    // MovimientosComponent,
    // CuentasComponent,
    // EditarEmpleadoCuentaComponent,
    // CuentaComponent
  ]
})
export class EmpleadosModule { }
