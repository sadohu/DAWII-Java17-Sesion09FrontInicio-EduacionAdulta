import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ModelProductoComponent } from './components/model-producto/model-producto.component';
import { ModelClienteComponent } from './components/model-cliente/model-cliente.component';
import { BoletaComponent } from './components/boleta/boleta.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app.material.module';
import { MatIconModule } from '@angular/material/icon';
import { ProdInterceptorService } from './interceptors/prod-interceptor.service';
import { LoginComponent } from './auth/login.component';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';
import { TransaccionAsignacionPasatiempoComponent } from './components/transaccion-asignacion-pasatiempo/transaccion-asignacion-pasatiempo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    IndexComponent,


    ModelProductoComponent,
    ModelClienteComponent,
    BoletaComponent,
    TransaccionAsignacionPasatiempoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    CommonModule,
    MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
