import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../model/paciente.interface';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from '../app.routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatIconModule, MatPaginatorModule, MatTableModule, MatIconModule, MatTooltipModule, MatButtonModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export default class InicioComponent implements OnInit{
  private pacienteService = inject(PacienteService);
  dataSource:any;
  displayedColumns: string[] = ['id', 'apellidoPaterno', 'apellidoMaterno', 'nombres', 'dni', 'peso', 'talla', 'imc', 'especialidad', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;

  ngOnInit(): void {
    this.pacienteService.listar().subscribe(
      (paciente)=>{
        this.dataSource = new MatTableDataSource<Paciente>(paciente)
        this.dataSource.paginator=this.paginator
      }
    )
  }
}
