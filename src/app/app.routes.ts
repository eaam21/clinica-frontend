import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'', loadComponent:()=>import('./login/login.component')},
    {path:'salir', loadComponent:()=>import('./logout/logout.component')},
    {path:'inicio', loadComponent:()=>import('./inicio/inicio.component')},
    {path:'registrar', loadComponent:()=>import('./formulario-paciente/formulario-paciente.component'), canActivate:[authGuard]},
    {path:'editar/:id', loadComponent:()=>import('./formulario-paciente/formulario-paciente.component'), canActivate:[authGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }