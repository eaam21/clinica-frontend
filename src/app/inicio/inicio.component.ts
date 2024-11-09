import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { ConfirmarDialogComponent } from '../confirmar-dialog/confirmar-dialog.component';
import { Paciente } from '../model/paciente.interface';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatIconModule, MatPaginatorModule, MatTableModule, MatIconModule, MatTooltipModule, MatButtonModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export default class InicioComponent implements OnInit{
  private pacienteService = inject(PacienteService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dataSource:any;
  displayedColumns: string[] = ['id', 'apellidoPaterno', 'apellidoMaterno', 'nombres', 'dni', 'peso', 'talla', 'imc', 'especialidad', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.pacienteService.listar().subscribe(
      (paciente)=>{
        this.dataSource = new MatTableDataSource<Paciente>(paciente)
        this.dataSource.paginator=this.paginator
      }
    )
  }

  eliminar(idPaciente: number): void {
    const dialogRef = this.dialog.open(ConfirmarDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.pacienteService.eliminar(idPaciente).subscribe(
          (paciente)=>{
            if(paciente!=undefined){
              this.listar();
              this.openSnackBarEliminar();
            }
          }
        )
      }
    });
  }

  openSnackBarEliminar() {
    this.snackBar.open('Eliminado con éxito!', 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:4000
    });
  }
}
