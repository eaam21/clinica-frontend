import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Pass token in Authorization header
    });
    return this.http.get<Paciente[]>('http://localhost:8080/api/paciente/listar', { headers })
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
