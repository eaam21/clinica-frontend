import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Paciente } from '../model/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private http = inject(HttpClient);
  constructor() { }

  listar(){
    let token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Pass token in Authorization header
    });
    return this.http.get<Paciente[]>('http://localhost:8080/api/paciente/listar', { headers })
  }

  registrar(paciente: Paciente){
    let token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Pass token in Authorization header
    });
    return this.http.post('http://localhost:8080/api/paciente/registrar', paciente, { headers })
  }

  obtener(id:number){
    let token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Pass token in Authorization header
    });
    return this.http.get<Paciente>('http://localhost:8080/api/paciente/obtener/'+id, { headers })
  }

  actualizar(id:number, paciente: Paciente){
    let token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Pass token in Authorization header
    });
    return this.http.put('http://localhost:8080/api/paciente/actualizar/'+id, paciente, { headers })
  }

  eliminar(id:number){
    let token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Pass token in Authorization header
    });
    return this.http.delete('http://localhost:8080/api/paciente/eliminar/'+id, { headers })
  }
}
