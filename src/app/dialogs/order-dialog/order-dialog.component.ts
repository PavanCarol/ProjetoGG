import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PedidoService } from '../../services/pedido.service';
import { PratoService } from '../../services/prato.service';
import { ResponsePedido, ResponseItemPedido } from '../../models/pedido.model';
import { Prato } from '../../models/prato.model';

interface ItemPedidoUI extends ResponseItemPedido {
  editando: boolean;
  novaQuantidade: number;
}

@Component({
  selector: 'app-order-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.scss'
})
export class OrderDialogComponent implements OnInit {
  pedido: ResponsePedido;
  itens: ItemPedidoUI[] = [];
  pratos: Prato[] = [];
  pratoSelecionadoId: number | null = null;
  quantidadeNova: number = 1;
  salvando = false;
  alterou = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { pedido: ResponsePedido },
    private dialogRef: MatDialogRef<OrderDialogComponent>,
    private pedidoService: PedidoService,
    private pratoService: PratoService,
    private snackBar: MatSnackBar
  ) {
    this.pedido = data.pedido;
  }

  ngOnInit(): void {
    this.mapearItens(this.pedido);
    this.pratoService.listar().subscribe({
      next: (pratos) => this.pratos = pratos,
      error: () => this.snackBar.open('Erro ao carregar pratos.', 'Fechar', { duration: 3000 })
    });
  }

  private mapearItens(pedido: ResponsePedido): void {
    this.itens = (pedido.itens ?? []).map(item => ({
      ...item,
      editando: false,
      novaQuantidade: item.quantidade
    }));
  }

  private recarregarPedido(): void {
    this.pedidoService.obterPorId(this.pedido.id).subscribe({
      next: (pedido) => {
        this.pedido = pedido;
        this.mapearItens(pedido);
        this.salvando = false;
        this.alterou = true;
      },
      error: (err) => {
        this.snackBar.open('Erro ao atualizar pedido: ' + err.message, 'Fechar', { duration: 3000 });
        this.salvando = false;
      }
    });
  }

  fechar(): void {
    this.dialogRef.close(this.alterou);
  }

  getSubtotalGeral(): number {
    return this.itens.reduce((acc, item) => acc + item.subTotal, 0);
  }

  iniciarEdicao(item: ItemPedidoUI): void {
    item.novaQuantidade = item.quantidade;
    item.editando = true;
  }

  cancelarEdicao(item: ItemPedidoUI): void {
    item.editando = false;
  }

  salvarQuantidade(item: ItemPedidoUI): void {
    if (!item.novaQuantidade || item.novaQuantidade < 1) return;
    this.salvando = true;
    const itensAtualizados = this.itens.map(i => ({
      idPrato: i.idPrato,
      quantidade: i === item ? item.novaQuantidade : i.quantidade
    }));
    this.pedidoService.salvar({
      id: this.pedido.id,
      data: this.pedido.data ?? new Date().toISOString(),
      idCliente: this.pedido.clienteId,
      itens: itensAtualizados
    }).subscribe({
      next: () => this.recarregarPedido(),
      error: (err) => {
        this.snackBar.open('Erro ao salvar quantidade: ' + err.message, 'Fechar', { duration: 3000 });
        this.salvando = false;
      }
    });
  }

  removerItem(item: ItemPedidoUI): void {
    this.salvando = true;
    const itensFiltrados = this.itens
      .filter(i => i !== item)
      .map(i => ({ idPrato: i.idPrato, quantidade: i.quantidade }));
    this.pedidoService.salvar({
      id: this.pedido.id,
      data: this.pedido.data ?? new Date().toISOString(),
      idCliente: this.pedido.clienteId,
      itens: itensFiltrados
    }).subscribe({
      next: () => this.recarregarPedido(),
      error: (err) => {
        this.snackBar.open('Erro ao remover item: ' + err.message, 'Fechar', { duration: 3000 });
        this.salvando = false;
      }
    });
  }

  adicionarItem(): void {
    if (!this.pratoSelecionadoId || !this.quantidadeNova || this.quantidadeNova < 1) return;
    this.salvando = true;
    this.pedidoService.adicionarItens(this.pedido.id, {
      itens: [{ idPrato: this.pratoSelecionadoId, quantidade: this.quantidadeNova }]
    }).subscribe({
      next: () => {
        this.pratoSelecionadoId = null;
        this.quantidadeNova = 1;
        this.recarregarPedido();
      },
      error: (err) => {
        this.snackBar.open('Erro ao adicionar item: ' + err.message, 'Fechar', { duration: 3000 });
        this.salvando = false;
      }
    });
  }
}
