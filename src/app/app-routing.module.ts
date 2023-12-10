import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BoletaComponent } from './components/boleta/boleta.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';
import { TransaccionAsignacionPasatiempoComponent } from './components/transaccion-asignacion-pasatiempo/transaccion-asignacion-pasatiempo.component';


const routes: Routes = [
  {path:"verBoleta", component:BoletaComponent },
  {path:"verAsignacionPasatiempo", component:TransaccionAsignacionPasatiempoComponent },

  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
