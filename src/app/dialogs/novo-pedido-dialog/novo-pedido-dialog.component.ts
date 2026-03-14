import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
import { Prato } from '../../models/prato.model';

interface ItemNovo {
  idPrato: number;
  nomePrato: string;
  precoUnitario: number;
  quantidade: number;
}

@Component({
  selector: 'app-novo-pedido-dialog',
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
  templateUrl: './novo-pedido-dialog.component.html',
  styleUrl: './novo-pedido-dialog.component.scss'
})
export class NovoPedidoDialogComponent implements OnInit {
  pratos: Prato[] = [];
  itens: ItemNovo[] = [];
  pratoSelecionadoId: number | null = null;
  quantidadeNova: number = 1;
  salvando = false;

  constructor(
    private dialogRef: MatDialogRef<NovoPedidoDialogComponent>,
    private pedidoService: PedidoService,
    private pratoService: PratoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.pratoService.listar().subscribe({
      next: (pratos) => this.pratos = pratos,
      error: () => this.snackBar.open('Erro ao carregar pratos.', 'Fechar', { duration: 3000 })
    });
  }

  fechar(): void {
    this.dialogRef.close(false);
  }

  getTotal(): number {
    return this.itens.reduce((acc, i) => acc + i.quantidade * i.precoUnitario, 0);
  }

  adicionarItem(): void {
    if (!this.pratoSelecionadoId || !this.quantidadeNova || this.quantidadeNova < 1) return;
    const prato = this.pratos.find(p => p.id === this.pratoSelecionadoId);
    if (!prato) return;

    const existente = this.itens.find(i => i.idPrato === this.pratoSelecionadoId);
    if (existente) {
      existente.quantidade += this.quantidadeNova;
    } else {
      this.itens.push({
        idPrato: prato.id!,
        nomePrato: prato.nome,
        precoUnitario: prato.preco,
        quantidade: this.quantidadeNova
      });
    }
    this.pratoSelecionadoId = null;
    this.quantidadeNova = 1;
  }

  removerItem(index: number): void {
    this.itens.splice(index, 1);
  }

  confirmar(): void {
    if (this.itens.length === 0) return;
    this.salvando = true;
    this.pedidoService.salvar({
      id: null,
      data: new Date().toISOString(),
      idCliente: null,
      itens: this.itens.map(i => ({ idPrato: i.idPrato, quantidade: i.quantidade }))
    }).subscribe({
      next: () => {
        this.snackBar.open('Pedido criado com sucesso!', 'Fechar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.snackBar.open('Erro ao criar pedido: ' + err.message, 'Fechar', { duration: 3000 });
        this.salvando = false;
      }
    });
  }
}
