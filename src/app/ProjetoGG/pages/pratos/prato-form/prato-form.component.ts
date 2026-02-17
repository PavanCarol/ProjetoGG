import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// Importações do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Importações locais
import { PratoService } from '../../../../services/prato.service';
import { Prato, PratoRequest } from '../../../../models/prato.model';

/**
 * Componente de Formulário de Prato
 * 
 * Este componente é reutilizado para criar e editar pratos.
 * Detecta automaticamente o modo (criar/editar) baseado na presença
 * de um ID na rota.
 * 
 * Funcionalidades:
 * - Validação de campos obrigatórios
 * - Validação de preço mínimo
 * - Feedback visual de sucesso/erro
 * - Navegação automática após salvar
 */
@Component({
  selector: 'app-prato-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './prato-form.component.html',
  styleUrl: './prato-form.component.scss'
})
export class PratoFormComponent implements OnInit {
  // Formulário reativo
  formulario!: FormGroup;
  
  // ID do prato sendo editado (null = novo prato)
  pratoId: number | null = null;
  
  // Controles de estado
  carregando = false;
  salvando = false;
  
  // Título dinâmico baseado no modo
  get titulo(): string {
    return this.pratoId ? 'Editar Prato' : 'Novo Prato';
  }
  
  // Texto do botão de submit
  get textoBotao(): string {
    return this.pratoId ? 'Atualizar' : 'Criar';
  }

  constructor(
    private fb: FormBuilder,
    private pratoService: PratoService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook - Inicializa o componente
   * Configura o formulário e carrega dados se for edição
   */
  ngOnInit(): void {
    this.inicializarFormulario();
    this.verificarModoEdicao();
  }

  /**
   * Inicializa o FormGroup com validações
   * 
   * Validações:
   * - Nome: obrigatório, mínimo 2 caracteres
   * - Preço: obrigatório, mínimo 0.01
   */
  private inicializarFormulario(): void {
    this.formulario = this.fb.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      preco: [null, [
        Validators.required,
        Validators.min(0.01),
        Validators.max(99999.99)
      ]]
    });
  }

  /**
   * Verifica se existe ID na rota (modo edição)
   * Se existir, carrega os dados do prato
   */
  private verificarModoEdicao(): void {
    const id = this.route.snapshot.params['id'];
    
    if (id) {
      this.pratoId = +id; // Converte para número
      this.carregarPrato();
    }
  }

  /**
   * Carrega os dados do prato para edição
   */
  private carregarPrato(): void {
    if (!this.pratoId) return;
    
    this.carregando = true;
    
    this.pratoService.obterPorId(this.pratoId).subscribe({
      next: (prato) => {
        // Preenche o formulário com os dados do prato
        this.formulario.patchValue({
          nome: prato.nome,
          preco: prato.preco
        });
        this.carregando = false;
      },
      error: (erro) => {
        this.mostrarMensagem(erro.message, 'erro');
        this.carregando = false;
        this.router.navigate(['/pratos']); // Volta para lista
      }
    });
  }

  /**
   * Submete o formulário
   * Valida os dados e chama o método apropriado (criar/atualizar)
   */
  onSubmit(): void {
    // Verifica se o formulário é válido
    if (this.formulario.invalid) {
      // Marca todos os campos como "tocados" para exibir erros
      this.formulario.markAllAsTouched();
      return;
    }
    
    // Prepara os dados para envio
    const dadosPrato: PratoRequest = {
      nome: this.formulario.value.nome.trim(),
      preco: this.formulario.value.preco,
      produtos: [] // Array vazio para CRUD básico
    };
    
    this.salvando = true;
    
    // Decide entre criar ou atualizar
    if (this.pratoId) {
      this.atualizarPrato(dadosPrato);
    } else {
      this.criarPrato(dadosPrato);
    }
  }

  /**
   * Cria um novo prato via API
   */
  private criarPrato(dados: PratoRequest): void {
    this.pratoService.criar(dados).subscribe({
      next: () => {
        this.mostrarMensagem('Prato criado com sucesso!', 'sucesso');
        this.router.navigate(['/pratos']); // Volta para lista
      },
      error: (erro) => {
        this.mostrarMensagem(erro.message, 'erro');
        this.salvando = false;
      }
    });
  }

  /**
   * Atualiza um prato existente via API
   */
  private atualizarPrato(dados: PratoRequest): void {
    if (!this.pratoId) return;
    
    this.pratoService.atualizar(this.pratoId, dados).subscribe({
      next: () => {
        this.mostrarMensagem('Prato atualizado com sucesso!', 'sucesso');
        this.router.navigate(['/pratos']); // Volta para lista
      },
      error: (erro) => {
        this.mostrarMensagem(erro.message, 'erro');
        this.salvando = false;
      }
    });
  }

  /**
   * Cancela a operação e volta para a lista
   */
  cancelar(): void {
    this.router.navigate(['/pratos']);
  }

  /**
   * Retorna mensagem de erro para um campo específico
   * @param campo - Nome do campo do formulário
   * @returns Mensagem de erro ou string vazia
   */
  getErro(campo: string): string {
    const controle = this.formulario.get(campo);
    
    if (!controle || !controle.errors || !controle.touched) {
      return '';
    }
    
    // Mapeia os erros para mensagens amigáveis
    if (controle.errors['required']) {
      return `${this.getNomeCampo(campo)} é obrigatório`;
    }
    if (controle.errors['minlength']) {
      return `${this.getNomeCampo(campo)} deve ter no mínimo ${controle.errors['minlength'].requiredLength} caracteres`;
    }
    if (controle.errors['maxlength']) {
      return `${this.getNomeCampo(campo)} deve ter no máximo ${controle.errors['maxlength'].requiredLength} caracteres`;
    }
    if (controle.errors['min']) {
      return `${this.getNomeCampo(campo)} deve ser maior que ${controle.errors['min'].min}`;
    }
    if (controle.errors['max']) {
      return `${this.getNomeCampo(campo)} deve ser menor que ${controle.errors['max'].max}`;
    }
    
    return 'Campo inválido';
  }

  /**
   * Retorna o nome amigável do campo para mensagens de erro
   */
  private getNomeCampo(campo: string): string {
    const nomes: { [key: string]: string } = {
      'nome': 'Nome',
      'preco': 'Preço'
    };
    return nomes[campo] || campo;
  }

  /**
   * Exibe uma mensagem toast usando MatSnackBar
   */
  private mostrarMensagem(mensagem: string, tipo: 'sucesso' | 'erro'): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: tipo === 'sucesso' ? 'snackbar-sucesso' : 'snackbar-erro'
    });
  }
}
