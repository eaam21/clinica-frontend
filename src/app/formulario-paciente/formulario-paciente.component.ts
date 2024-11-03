import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Paciente } from '../model/paciente.interface';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PacienteService } from '../services/paciente.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Especialidad } from '../model/especialidad.interface';
import { EspecialidadService } from '../services/especialidad.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-formulario-paciente',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatInputModule, MatButtonModule, FormsModule, MatGridListModule, MatSelectModule, MatIconModule],
  templateUrl: './formulario-paciente.component.html',
  styleUrl: './formulario-paciente.component.css'
})
export default class FormularioPacienteComponent {
  private fb = inject(FormBuilder);
  private pacienteService = inject(PacienteService);
  private especialidadService = inject(EspecialidadService);
  private router = inject(Router);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  listaEspecialidades: Especialidad[]=[]

  constructor(
    private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.especialidadService.listar().subscribe(
      (lista)=>{
        this.listaEspecialidades = lista
      }
    )
  }

  form = this.fb.group({
    apellidoPaterno:['',[Validators.required]],
    apellidoMaterno:['',[Validators.required]],
    nombres:['',[Validators.required]],
    dni:['',[Validators.required]],
    peso:['',[Validators.required]],
    talla:['',[Validators.required]],
    imc:[0,[Validators.required]],
    idEspecialidad: ['',[Validators.required]]
  })

  calcularIMC(peso: number, talla: number): number {
    if (talla === 0) {
      throw new Error('La talla no puede ser cero');
    }
    const imc = peso / Math.pow(talla, 2);
    return parseFloat(imc.toFixed(2));
  }

  actualizarIMC(): void {
    let peso:number=this.form.controls.peso.value==null?0:parseFloat(this.form.controls.peso.value);
    let talla:number=this.form.controls.talla.value==null?0:parseFloat(this.form.controls.talla.value);

    let imc = this.calcularIMC(peso, talla);
    if(!isNaN(imc)){
      this.form.get('imc')?.setValue(imc)
    }
  }

  create(){
    if (this.form.invalid) {
      return;
    }
    const pacienteFormulario = this.form.value;
    this.pacienteService.registrar(pacienteFormulario)
    .subscribe(
      ()=>{
        this.router.navigate(['/']);
      }
    )
    this.openSnackBar();
  }

  openSnackBar() {
    this._snackBar.open('Registrado con éxito!', 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:4000
    });
  }


  
  
  
}
