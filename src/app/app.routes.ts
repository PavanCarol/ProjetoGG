/**
 * Configuração de Rotas da Aplicação
 *
 * Define todas as rotas disponíveis no sistema.
 * As rotas são organizadas de forma hierárquica dentro do layout principal.
 */

import { Routes } from '@angular/router';
import { ProjetoGGComponent } from './components/ProjetoGG/projeto-gg.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientComponent } from './pages/client/client.component';
import { OrderComponent } from './pages/order/order.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { ProviderComponent } from './pages/provider/provider.component';
import { FinancialComponent } from './pages/financial/financial.component';
import { CardComponent } from './pages/card/card.component';

// Importações dos componentes de Pratos (CRUD)
import { PratoListComponent } from './pages/pratos/prato-list/prato-list.component';
import { PratoFormComponent } from './pages/pratos/prato-form/prato-form.component';

export const routes: Routes = [
  // Rota comentada do Login (será implementado depois)
  // {
  //   path: '',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },

  {
    path: '',
    component: ProjetoGGComponent,
    children: [
      // ============================================
      // ROTAS DE PRATOS - CRUD COMPLETO
      // ============================================

      /**
       * Lista de Pratos
       * Exibe todos os pratos cadastrados em formato de tabela
       * Permite: visualizar, editar e excluir pratos
       */
      {
        path: 'pratos',
        component: PratoListComponent,
      },

      /**
       * Novo Prato
       * Formulário para criar um novo prato
       */
      {
        path: 'pratos/novo',
        component: PratoFormComponent,
      },

      /**
       * Editar Prato
       * Formulário para editar um prato existente
       * O parâmetro :id identifica qual prato será editado
       */
      {
        path: 'pratos/editar/:id',
        component: PratoFormComponent,
      },

      // ============================================
      // OUTRAS ROTAS DO SISTEMA
      // ============================================

      {
        path: 'order',
        component: OrderComponent,
      },
      {
        path: 'inventory',
        component: InventoryComponent,
      },
      {
        path: 'provider',
        component: ProviderComponent,
      },
      {
        path: 'financial',
        component: FinancialComponent,
      },
      {
        path: 'card',
        component: CardComponent,
      },
      {
        path: 'client',
        component: ClientComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ]
  }
];
