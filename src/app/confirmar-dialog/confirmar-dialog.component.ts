import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirmar-dialog.component.html',
  styleUrl: './confirmar-dialog.component.css'
})
export class ConfirmarDialogComponent {
  private dialogRef = inject(MatDialogRef<ConfirmarDialogComponent>);

  confirmar(): void {
    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
