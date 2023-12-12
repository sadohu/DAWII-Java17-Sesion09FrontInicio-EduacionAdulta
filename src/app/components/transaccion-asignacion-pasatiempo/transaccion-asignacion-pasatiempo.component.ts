import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pasatiempo } from 'src/app/models/pasatiempo.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PasatiempoService } from 'src/app/services/pasatiempo.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaccion-asignacion-pasatiempo',
  templateUrl: './transaccion-asignacion-pasatiempo.component.html',
  styleUrls: ['./transaccion-asignacion-pasatiempo.component.css']
})
export class TransaccionAsignacionPasatiempoComponent {

  // Select List
  listaPasatiempo: Pasatiempo[] = [];
  listaUsuario: Usuario[] = [];
  listaPasatiempoPorUsuario: Pasatiempo[] = [];

  // ngModel
  idPasatiempo: number = 0;
  idUsuario: number = 0;

  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ["idPasatiempo", "nombre", 'actions'];

  constructor(
    private utilService: UtilService,
    private pasatiempoService: PasatiempoService
  ) {
    this.utilService.listaPasatiempo().subscribe(
      data => this.listaPasatiempo = data
    );
    this.utilService.listaUsuario().subscribe(
      data => this.listaUsuario = data
    );
  }

  cargaPasatiempo() {
    this.pasatiempoService.listaPasatiempoPorUsuario(this.idUsuario).subscribe(
      (data) => {
        this.listaPasatiempoPorUsuario = data;
        this.dataSource = new MatTableDataSource(this.listaPasatiempoPorUsuario);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  registraPasatiempo() {
    const pasatiempoIds = {
      idUsuario: this.idUsuario,
      idPasatiempo: this.idPasatiempo
    }
    this.pasatiempoService.registraPasatiempo(pasatiempoIds).subscribe(
      (data) => {
        Swal.fire({ title: "Mensaje", text: data.mensaje, icon: "info" });
        this.listaPasatiempoPorUsuario = data.lista;
        this.dataSource = new MatTableDataSource(this.listaPasatiempoPorUsuario);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  eliminaPasatiempo(pasatiempo: Pasatiempo) {

  }

}
