import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatTable } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrderDialogComponent } from '../../../dialogs/order-dialog/order-dialog.component';

@Component({
  selector: 'app-order',
  imports: [
    MatCard,
    MatSpinner,
    MatFormField,
    MatLabel, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatChipsModule,
    CommonModule,
    MatDialogModule,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  myControl = new FormControl('');

  options: string[] = ['Finalizado', 'Em Andamento', 'Cancelado'];

  pedidos = [
    { nome: 'Carlos', valor: 50, status: 'Finalizado' },
    { nome: 'Carlos', valor: 50, status: 'Em Andamento' },
    { nome: 'Carlos', valor: 50, status: 'Cancelado' }
  ];

  pedidosFiltrados = this.pedidos;

  constructor(private dialog: MatDialog) {
  this.myControl.valueChanges.subscribe(value => {
    if (!value) {
      this.pedidosFiltrados = this.pedidos;
    } else {
      this.pedidosFiltrados = this.pedidos.filter(p =>
        p.status.toLowerCase() === value.toLowerCase()
      );
    }
  });
}

abrirDialog(pedido: any) {
  this.dialog.open(OrderDialogComponent, {
    width: '400px',
    data: pedido
  });
}

}
