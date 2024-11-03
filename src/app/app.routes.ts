import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {path:'', loadComponent:()=>import('./inicio/inicio.component')},
    {path:'registrar', loadComponent:()=>import('./formulario-paciente/formulario-paciente.component')},
    /*
    {path:'', component:InicioComponent},
    {path:'registrar', component: RegistrarPacienteComponent},
    */
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  