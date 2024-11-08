import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {path:'', loadComponent:()=>import('./inicio/inicio.component')},
    {path:'registrar', loadComponent:()=>import('./formulario-paciente/formulario-paciente.component')},
    {path:'editar/:id', loadComponent:()=>import('./formulario-paciente/formulario-paciente.component')},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  