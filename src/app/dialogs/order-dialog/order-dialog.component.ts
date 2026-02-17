import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-dialog',
  imports: [],
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.scss'
})
export class OrderDialogComponent {
constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
