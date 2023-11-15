import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente.model';

const baseUrl =  AppSettings.API_ENDPOINT + "/boleta";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }
 
  consultaFiltro(filtro:string, page: number, size: number):Observable<Cliente[]>{
      if (filtro == ""){
        return  this.http.get<Cliente[]>(baseUrl +'/listaCliente?page='+ page+'&size=' + size); 
      }else{
        return  this.http.get<Cliente[]>(baseUrl +'/listaCliente/'+filtro+'?page='+ page+'&size=' + size); 
      }
  }  
}
