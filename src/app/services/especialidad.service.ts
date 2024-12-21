import { inject, Injectable } from '@angular/core';
import { Especialidad } from '../model/especialidad.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private http = inject(HttpClient);
  constructor() { }

  listar(){
    let token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Pass token in Authorization header
    });
    return this.http.get<Especialidad[]>('http://localhost:8080/api/especialidad/listar', { headers });
  }
}
