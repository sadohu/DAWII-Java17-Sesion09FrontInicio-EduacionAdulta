import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Pasatiempo } from '../models/pasatiempo.model';


const baseUrlUtil = AppSettings.API_ENDPOINT + '/pasatiempo';

@Injectable({
    providedIn: 'root'
})
export class PasatiempoService {

    constructor(private http: HttpClient) { }

    listaPasatiempoPorUsuario(idUsuario: number): Observable<Pasatiempo[]> {
        return this.http.get<Pasatiempo[]>(baseUrlUtil + "/listaPasatiempoPorUsuario/" + idUsuario);
    }

}