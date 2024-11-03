import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Injector } from '@angular/core';
import { Paciente } from '../model/paciente.interface';
import { Especialidad } from '../model/especialidad.interface';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private http = inject(HttpClient);
  constructor() { }

  listar(){
    return this.http.get<Paciente[]>('http://localhost:8080/api/paciente/listar')
  }

  registrar(paciente: any){
    //const  especialidad: Especialidad = {id:1, nombre:"test"};
    return this.http.post('http://localhost:8080/api/paciente/registrar', paciente)
  }
}
