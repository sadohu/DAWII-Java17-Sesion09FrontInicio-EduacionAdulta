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
    console.log(">>> buscaCliente  >>");
    const dialogRef = this.dialogService.open(ModelClienteComponent);
    dialogRef.afterClosed().subscribe( () =>{
          this.cargaCliente();
    });
  }

  cargaCliente(){
    console.log(">>> cargaCliente >>> ");
    console.log(">>> cargaCliente >>> " + (window.sessionStorage.getItem("CLIENTE")|| '{}') );
    var str = window.sessionStorage.getItem("CLIENTE")|| '{}';
    this.objCliente = JSON.parse(str);
    console.log(">>> objCliente >>> " + this.objCliente.nombre);
  }

  buscaProducto(){
    console.log(">>> buscaProducto  >>");
    const dialogRef = this.dialogService.open(ModelProductoComponent);
    dialogRef.afterClosed().subscribe( () =>{
          this.cargaProducto();
    });
  }

  cargaProducto(){
    console.log(">>> cargaProducto >>> ");
    console.log(">>> cargaProducto >>> " + (window.sessionStorage.getItem("PRODUCTO")|| '{}') );
    var str = window.sessionStorage.getItem("PRODUCTO")|| '{}';
    this.objProducto = JSON.parse(str);
    console.log(">>> objProducto >>> " + this.objProducto.nombre);
  }

  agregarProducto(){
    var i = this.lstProductos.indexOf(this.objProducto);
    if (i == -1){
      this.lstProductos.push(this.objProducto);
    }else{
      this.lstProductos[i] = this.objProducto;
    }
    this.dataSource = new MatTableDataSource<Producto>(this.lstProductos);
    this.dataSource.paginator = this.paginator; 
  }

  eliminaProducto(objProducto: Producto){
    this.lstProductos.forEach( (item, index) => {
      if(item.idProducto == objProducto.idProducto) this.lstProductos.splice(index,1);
    });
    this.dataSource = new MatTableDataSource<Producto>(this.lstProductos);
    this.dataSource.paginator = this.paginator; 
  }
  registrarBoleta(){
      var lstDetalles : BoletaHasProducto[] = [];
      
      this.lstProductos.forEach( (element) => {
            var objBoletaHasProductoPK : BoletaHasProductoPK = {
                 idProducto : element.idProducto
             };
            var objDetalle : BoletaHasProducto = {
                  cantidad : element.cantidad,
                  precio : element.precio,
                  producto: element,
                  boletaHasProductoPK : objBoletaHasProductoPK
            };  
            lstDetalles.push(objDetalle);
      });

      var objBoleta : Boleta ={
            cliente:  this.objCliente,
            usuario : this.objUsuario,
            detallesBoleta: lstDetalles
      };

      console.log(objBoleta);

      this.boletaService.inserta(objBoleta).subscribe(
             x => { 
                  console.log();
                  
                  Swal.fire('Mensaje', x.mensaje, 'info'); 
                  this.objCliente  = {};
                  this.objProducto  = {};
                  this.lstProductos  = [];
                  this.dataSource = new MatTableDataSource<Producto>(this.lstProductos);
                  this.dataSource.paginator = this.paginator; 
             }   
      );
  }
  
}
