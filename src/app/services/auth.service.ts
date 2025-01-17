import { inject, Injectable } from '@angular/core';
import { JwtDecoderService } from './jwt-decoder.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtDecoder = inject(JwtDecoderService)
  decodedToken:any
  constructor() { }

  isAuth(){
    this.decodedToken = this.jwtDecoder.decodeToken();
    if(this.decodedToken.role=="ASISTENTE"){
      return false;
    }else{
      return true;
    }
  }
}
