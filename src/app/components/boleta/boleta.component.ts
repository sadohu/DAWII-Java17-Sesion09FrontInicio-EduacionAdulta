import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModelClienteComponent } from '../model-cliente/model-cliente.component';
import { ModelProductoComponent } from '../model-producto/model-producto.component';
import { Cliente } from 'src/app/models/cliente.model';
import { Producto } from 'src/app/models/producto.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Boleta } from 'src/app/models/boleta.model';
import { BoletaService } from 'src/app/services/boleta.service';
import { Usuario } from 'src/app/models/usuario.model';
import { BoletaHasProducto } from 'src/app/models/boletaHasProducto.model';
import Swal from 'sweetalert2';
import { BoletaHasProductoPK } from 'src/app/models/boletaHasProductoPK.model';
import { TokenService } from 'src/app/security/token.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.component.html',
  styleUrls: ['./boleta.component.css']
})
export class BoletaComponent {

  objCliente : Cliente = {};
  objProducto : Producto = {};
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ["idProducto","nombre","precio","cantidad",'actions'];

  lstProductos : Producto [] = [];
  objUsuario: Usuario = {} ;

  constructor(private dialogService: MatDialog, 
              private boletaService: BoletaService,
              private tokenService: TokenService) {
              this.objUsuario.idUsuario = tokenService.getUserId();
  }

  
  ngOnInit(): void {}

  buscaCliente(){
      console.log(">>> buscaCliente ");
      const dialog  = this.dialogService.open(ModelClienteComponent);
      dialog.afterClosed().subscribe( () => this.cargaCliente());
  }

  cargaCliente(){
      var str = window.sessionStorage.getItem("CLIENTE") || '{}';
      this.objCliente = JSON.parse(str);
  }

  buscaProducto(){
    console.log(">>> buscaProducto ");
    const dialog  = this.dialogService.open(ModelProductoComponent);
    dialog.afterClosed().subscribe( () => this.cargaProducto());
  }

  cargaProducto(){
      var str = window.sessionStorage.getItem("PRODUCTO") || '{}';
      this.objProducto = JSON.parse(str);
  }

  agregarProducto(){
      if (!this.objProducto.idProducto || !this.objProducto.cantidad || !this.objProducto.stock) {
         Swal.fire({title: "Validación", text: "Por favor, complete todos los campos", icon: "info"});
         return;
      }
      if (this.objProducto.cantidad <= 0) {
         Swal.fire({ title: "Validación", text: "La cantidad debe ser mayor a cero", icon: "info" });
         return;
      }  
      if (this.objProducto.stock! < this.objProducto.cantidad!){
          Swal.fire({title:"Validación", text:"La cantidad es mayor al stock", icon:"info"});
          return;
      }
      if (this.lstProductos.some(x => x.idProducto === this.objProducto.idProducto)) {
        Swal.fire({ title: "Validación", text: "El producto ya está en la lista", icon: "info" });
        return;
      }
      this.lstProductos.push(this.objProducto);
      this.dataSource = new MatTableDataSource(this.lstProductos);
      this.dataSource.paginator = this.paginator 
  }

  eliminaProducto(objProducto: Producto){
    const index = this.lstProductos.findIndex(x => x.idProducto === objProducto.idProducto);
    if (index !== -1) {
      this.lstProductos.splice(index, 1); 
      this.dataSource = new MatTableDataSource(this.lstProductos);
      this.dataSource.paginator = this.paginator;
    }
  }

  registrarBoleta(){
     let lstDetalles : BoletaHasProducto[] = [];
     
     this.lstProductos.forEach( (item) => {
         var pk : BoletaHasProductoPK = {
                idProducto : item.idProducto
         }

         var objDetalle : BoletaHasProducto = {
              cantidad : item.cantidad,
              precio :item.precio,
              producto : item,
              boletaHasProductoPK : pk
         }

         lstDetalles.push(objDetalle);
     });

     let objBoleta : Boleta = {
        cliente : this.objCliente,
        usuario : this.objUsuario,
        detallesBoleta : lstDetalles
     };

     this.boletaService.inserta(objBoleta).subscribe(x => {
          Swal.fire({ title: "Mensaje", text: x.mensaje, icon: "info" });
          this.objCliente = {};
          this.objProducto = {};
          this.lstProductos = [];
          this.dataSource = new MatTableDataSource(this.lstProductos);
          this.dataSource.paginator = this.paginator;
     });

  }
  
}
