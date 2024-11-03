import { inject, Injectable } from '@angular/core';
import { Especialidad } from '../model/especialidad.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private http = inject(HttpClient);
  constructor() { }

  listar(){
    return this.http.get<Especialidad[]>('http://localhost:8080/api/especialidad/listar');
  }
}
