import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  credenciales = { usuario: '', clave: '' };
  private loginService = inject(LoginService);

  onSubmit(){
    console.log("TEST");
    this.loginService.login(this.credenciales).subscribe({
      next:(response)=>{
        console.log(response)
        console.log('Login successful', response);
      },
      error:(err)=>{
        console.error('Login failed', err);
      }
    })
  }
}
