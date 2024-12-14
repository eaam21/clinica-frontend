import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = "http://localhost:8080/api/usuario"
  private http = inject(HttpClient);

  constructor() { }

  login(credenciales:{usuario: string, clave:string}):Observable<any>{
    return this.http.post(this.baseUrl+"/login", credenciales)
  }
}
