import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Usuario } from '../models/usuario.model';
import { Pasatiempo } from '../models/pasatiempo.model';


const baseUrlUtil = AppSettings.API_ENDPOINT + '/util';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(private http: HttpClient) { }

    listaPasatiempo(): Observable<Pasatiempo[]> {
        return this.http.get<Pasatiempo[]>(baseUrlUtil + "/listaPasatiempo");
    }

    listaUsuario(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(baseUrlUtil + "/listaUsuario");
    }

}