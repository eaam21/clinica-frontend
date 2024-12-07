import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../services/login.service';
import { LoginOutput } from '../model/usuario.interface';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  credenciales = { usuario: '', clave: '' };
  private loginService = inject(LoginService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  onSubmit(){
    this.loginService.login(this.credenciales).subscribe({
      next:(response:LoginOutput)=>{
        if(response.success){
          this.router.navigate(['/inicio']);
        }else{
          this.openSnackBarLoginIncorrecto(response.respuesta);
          console.log(response.respuesta);
        }
      },
      error:(err)=>{
        console.error('Login failed', err);
      }
    })
  }

  openSnackBarLoginIncorrecto(mensaje:string) {
    this.snackBar.open(mensaje, 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:4000
    });
  }
}
