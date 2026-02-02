import { Component, computed, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

/**
 * Interface que define a estrutura de um item do menu
 */
export type MenuItem = {
  icon: string;    // Ícone do Material Icons
  label: string;   // Texto exibido
  route: string;   // Rota de navegação
};

/**
 * Componente de Menu Lateral
 * 
 * Exibe o menu de navegação da aplicação.
 * Suporta estado colapsado/expandido.
 */
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  // Signal para controlar estado do menu (colapsado ou expandido)
  sideNavCollapsed = signal(false);
  
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  /**
   * Lista de itens do menu de navegação
   * 
   * Cada item possui:
   * - icon: nome do ícone do Material Icons
   * - label: texto exibido no menu
   * - route: caminho para navegação
   */
  menuItems = signal<MenuItem[]>([
    {
      icon: 'shopping_cart',
      label: 'Pedidos',
      route: 'order',
    },
    // ========================================
    // NOVO ITEM: Gestão de Pratos (CRUD)
    // ========================================
    {
      icon: 'restaurant',
      label: 'Pratos',
      route: 'pratos',
    },
    {
      icon: 'inventory',
      label: 'Estoque',
      route: 'inventory',
    },
    {
      icon: 'support_agent',
      label: 'Fornecedores',
      route: 'provider',
    },
    {
      icon: 'paid',
      label: 'Financeiro',
      route: 'financial',
    },
    {
      icon: 'menu_book',
      label: 'Cardápio',
      route: 'card',
    },
    {
      icon: 'group',
      label: 'Clientes',
      route: 'client',
    }
  ]);

  // Tamanho da foto do perfil baseado no estado do menu
  prifilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');
}
