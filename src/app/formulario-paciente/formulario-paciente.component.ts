import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Paciente } from '../model/paciente.interface';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
export default class FormularioPacienteComponent implements OnInit{
  private fb = inject(FormBuilder);
  private pacienteService = inject(PacienteService);
  private especialidadService = inject(EspecialidadService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  listaEspecialidades: Especialidad[]=[]
  form?: FormGroup;
  editarDatosPaciente?:Paciente;

  constructor(
    private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')  
    if(id!=null){//si existe valores, esto es para editar
      this.pacienteService.obtener(parseInt(id)).subscribe(res =>{
        this. editarDatosPaciente = res;
        this.form = this.fb.group({
          apellidoPaterno:[res.apellidoPaterno,[Validators.required]],
          apellidoMaterno:[res.apellidoMaterno,[Validators.required]],
          nombres:[res.nombres,[Validators.required]],
          dni:[res.dni,[Validators.required]],
          peso:[res.peso,[Validators.required]],
          talla:[res.talla,[Validators.required]],
          imc:[res.imc,[Validators.required]],
          idEspecialidad: [res.especialidad.id,[Validators.required]]
        })
        }
      )
    }else{//no existe valores previos, esto es para crear
      this.form = this.fb.group({
        apellidoPaterno:['',[Validators.required]],
        apellidoMaterno:['',[Validators.required]],
        nombres:['',[Validators.required]],
        dni:['',[Validators.required]],
        peso:['',[Validators.required]],
        talla:['',[Validators.required]],
        imc:[0,[Validators.required]],
        idEspecialidad: ['',[Validators.required]]
      })
  
    }
    
    //Traer todos los valores del listado de especialidades para pintar en el combo de selección
    this.especialidadService.listar().subscribe(
      (lista)=>{
        this.listaEspecialidades = lista
      }
    )
  }

  calcularIMC(peso: number, talla: number): number {
    if (talla === 0) {
      throw new Error('La talla no puede ser cero');
    }
    const imc = peso / Math.pow(talla, 2);
    return parseFloat(imc.toFixed(2));
  }

  actualizarIMC(): void {
    let peso = parseFloat(this.form!.get('peso')?.value);
    let talla = parseFloat(this.form!.get('talla')?.value);
    let imc = this.calcularIMC(peso, talla);
    if(!isNaN(imc)){
      this.form!.get('imc')?.setValue(imc)
    }    
  }

  guardar(){
    if (this.form!.invalid) {//validar todos los campos del formulario como obligatorios
      return;
    }

    const pacienteFormulario = this.form!.value;
    if(this.editarDatosPaciente){
      let idPAciente = this.editarDatosPaciente.id;
      this.pacienteService.actualizar(idPAciente, pacienteFormulario)
      .subscribe(
        ()=>{
          this.router.navigate(['/']);
        }
      )
      this.openSnackBarActualizar();

    }else{
      this.pacienteService.registrar(pacienteFormulario)
      .subscribe(
        ()=>{
          this.router.navigate(['/']);
        }
      )
      this.openSnackBarCrear();
    }
  }

  openSnackBarCrear() {
    this._snackBar.open('Registrado con éxito!', 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:4000
    });
  }

  openSnackBarActualizar() {
    this._snackBar.open('Actualizado con éxito!', 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:4000
    });
  }
}
