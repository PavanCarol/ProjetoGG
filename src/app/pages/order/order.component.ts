import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { PedidoService } from '../../services/pedido.service';
import { ResponsePedido } from '../../models/pedido.model';
import { OrderDialogComponent } from '../../dialogs/order-dialog/order-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { NovoPedidoDialogComponent } from '../../dialogs/novo-pedido-dialog/novo-pedido-dialog.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  filtroControl = new FormControl('');
  statusOptions = ['Pago', 'Pendente'];

  pedidos: ResponsePedido[] = [];
  pedidosFiltrados: ResponsePedido[] = [];
  carregando = false;

  constructor(
    private pedidoService: PedidoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarPedidos();

    this.filtroControl.valueChanges.subscribe(value => {
      this.pedidosFiltrados = value
        ? this.pedidos.filter(p => this.getStatus(p).toLowerCase() === value.toLowerCase())
        : this.pedidos;
    });
  }

  carregarPedidos(): void {
    this.carregando = true;
    this.pedidoService.listar().subscribe({
      next: (dados) => {
        this.pedidos = dados;
        this.pedidosFiltrados = dados;
        this.carregando = false;
      },
      error: (err) => {
        this.snackBar.open('Erro ao carregar pedidos: ' + err.message, 'Fechar', { duration: 3000 });
        this.carregando = false;
      }
    });
  }

  getStatus(pedido: ResponsePedido): string {
    return pedido.paga ? 'Pago' : 'Pendente';
  }

  getTotal(pedido: ResponsePedido): number {
    return pedido.itens?.reduce((acc, item) => acc + item.subTotal, 0) ?? pedido.valor;
  }

  abrirNovoPedido(): void {
    this.dialog.open(NovoPedidoDialogComponent, {
      width: '580px'
    }).afterClosed().subscribe(criado => {
      if (criado) this.carregarPedidos();
    });
  }

  abrirEdicao(event: Event, pedido: ResponsePedido): void {
    event.stopPropagation();
    this.dialog.open(OrderDialogComponent, {
      width: '580px',
      data: { pedido }
    }).afterClosed().subscribe(atualizado => {
      if (atualizado) this.carregarPedidos();
    });
  }

  pagar(event: Event, pedido: ResponsePedido): void {
    //event.stopPropagation();
    this.dialog.open(ConfirmDialogComponent, {
      width: '380px',
      data: {
        titulo: 'Confirmar Pagamento',
        mensagem: `Deseja confirmar o pagamento do Pedido #${pedido.id}?`,
        botaoConfirmar: 'Pagar',
        botaoCancelar: 'Cancelar',
        icone: 'payments',
        corBotao: 'primary'
      }
    }).afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.pedidoService.pagar(pedido.id).subscribe({
        next: () => {
          this.snackBar.open(`Pedido #${pedido.id} pago com sucesso!`, 'Fechar', { duration: 3000 });
          this.carregarPedidos();
        },
        error: (err) => {
          this.snackBar.open('Erro ao pagar: ' + err.message, 'Fechar', { duration: 3000 });
        }
      });
    });
  }
}
