import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirmar-dialog.component.html',
  styleUrl: './confirmar-dialog.component.css'
})
export class ConfirmarDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmarDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Confirmed deletion
  }

  onCancel(): void {
    this.dialogRef.close(false); // Cancelled deletion
  }
}
