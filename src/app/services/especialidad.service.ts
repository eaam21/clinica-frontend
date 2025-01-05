import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Especialidad } from '../model/especialidad.interface';

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
