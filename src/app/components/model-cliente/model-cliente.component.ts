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
    this.refreshTable();
  }

  seleccioneCliente(objCliente: Cliente) {
    window.sessionStorage.setItem("CLIENTE", JSON.stringify(objCliente));
    console.log(">>>> " + objCliente.apellido);
    this.dialog.closeAll();
  }

  applyFilter() {
      console.log(">>> applyFilter >> " + this.filtro); 
      this.clienteService.consultaFiltro(this.filtro, this.pageIndex, this.pageSize).subscribe(
        x => {
          this.dataSource = new MatTableDataSource<Cliente>(x);
          this.dataSource.paginator = this.paginator; 
        }
      );
   }

   onPageChange(any : any){
      console.log(">>> any.length >> " + any.length);
      console.log(">>> any.pageIndex >> " + any.pageIndex);
      console.log(">>> any.pageSize >> " + any.pageSize);
      console.log(">>> any.previousPageIndex >> " + any.previousPageIndex);

      this.clienteService.consultaFiltro(this.filtro, any.pageIndex, any.pageSize).subscribe(
        x => {
          this.dataSource = new MatTableDataSource<Cliente>(x);
          this.dataSource.paginator = this.paginator; 
        }
      );
   }

  private refreshTable() {
      console.log(">>> refreshTable >>> ");
      this.clienteService.consultaFiltro("",this.pageIndex, this.pageSize).subscribe(
        x => {
          this.dataSource = new MatTableDataSource<Cliente>(x);
          this.dataSource.paginator = this.paginator; 
        }
      );
  }

}
