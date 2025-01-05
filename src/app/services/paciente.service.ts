import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Paciente } from '../model/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private http = inject(HttpClient);
  constructor() { }

  listar(){
    return this.http.get<Paciente[]>('http://localhost:8080/api/paciente/listar')
  }

  registrar(paciente: Paciente){
    return this.http.post('http://localhost:8080/api/paciente/registrar', paciente)
  }

  obtener(id:number){
    return this.http.get<Paciente>('http://localhost:8080/api/paciente/obtener/'+id)
  }

  actualizar(id:number, paciente: Paciente){
    return this.http.put('http://localhost:8080/api/paciente/actualizar/'+id, paciente)
  }

  eliminar(id:number){
    return this.http.delete('http://localhost:8080/api/paciente/eliminar/'+id)
  }
}
