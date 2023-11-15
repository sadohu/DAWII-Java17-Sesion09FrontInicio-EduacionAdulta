import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BoletaComponent } from './components/boleta/boleta.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';


const routes: Routes = [
  {path:"verBoleta", component:BoletaComponent },

  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
