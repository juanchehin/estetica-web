import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiciosComponent } from './servicios/servicios.component';
import { EditarServicioComponent } from './servicios/editar-servicio.component';
import { ServicioComponent } from './servicios/servicio.component';
import { LoginGuardGuard } from 'src/app/guards/login-guard.guard';
import { VerificaTokenGuard } from 'src/app/guards/verifica-token.guard';

const routes: Routes = [
   // Servicios
   { path: '', component: ServiciosComponent, data: { titulo: 'Servicios' }},
   { path: 'nuevo', component: ServicioComponent, data: { titulo: 'Nuevo Servicio' }},
   { path: 'editar/:IdServicio', component: EditarServicioComponent, data: { titulo: 'Edicion de servicio' }}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule { }
