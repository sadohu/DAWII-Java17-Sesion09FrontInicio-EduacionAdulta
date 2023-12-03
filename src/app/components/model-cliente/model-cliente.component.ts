import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

const OPCIONES_CLIENTE = 'Opciones';

@Component({
  selector: 'app-model-cliente',
  templateUrl: './model-cliente.component.html',
  styleUrls: ['./model-cliente.component.css']
})
export class ModelClienteComponent {

  //Filtro de Grila
  filtro: string ="";

  //Grilla
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  displayedColumns = ["idCliente","nombre","apellido",'actions'];
  pageIndex = 0;
  pageSize = 20;
  pageSizeOptions = [5,10];
  dataSource:any;

  constructor(private dialog: MatDialog, private clienteService: ClienteService) {

  }

  seleccioneCliente(objCliente: Cliente) {
   
  }

  applyFilter() {
      
   }

   onPageChange(any : any){
     
   }

  private refreshTable() {
      
  }

}
