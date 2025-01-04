import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {
  decodedToken:any;
  constructor() { }

  decodeToken(): JwtPayload | null {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        return jwtDecode<JwtPayload>(token);
      } catch (error) {
        console.error('Invalid token:', error);
        return null;
      }
    }
    return null;
  }
}
