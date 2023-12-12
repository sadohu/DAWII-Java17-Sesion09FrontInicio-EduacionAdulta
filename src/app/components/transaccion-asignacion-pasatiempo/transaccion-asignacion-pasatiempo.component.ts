import { Component } from '@angular/core';
import { Pasatiempo } from 'src/app/models/pasatiempo.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-transaccion-asignacion-pasatiempo',
  templateUrl: './transaccion-asignacion-pasatiempo.component.html',
  styleUrls: ['./transaccion-asignacion-pasatiempo.component.css']
})
export class TransaccionAsignacionPasatiempoComponent {

  // Select List
  listaPasatiempo: Pasatiempo[] = [];
  listaUsuario: Usuario[] = [];

  // ngModel
  idPasatiempo: number = 0;
  idUsuario: number = 0;


  constructor(
    private utilService: UtilService
  ) {
    this.utilService.listaPasatiempo().subscribe(
      data => this.listaPasatiempo = data
    );
    this.utilService.listaUsuario().subscribe(
      data => this.listaUsuario = data
    );
  }

}
