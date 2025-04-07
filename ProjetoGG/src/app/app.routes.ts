import { Routes } from '@angular/router';
import { ProjetoGGComponent } from './ProjetoGG/projeto-gg.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './ProjetoGG/dashboard/dashboard.component';
import { ClientComponent } from './ProjetoGG/pages/client/client.component';
import { OrderComponent } from './ProjetoGG/pages/order/order.component';
import { InventoryComponent } from './ProjetoGG/pages/inventory/inventory.component';
import { ProviderComponent } from './ProjetoGG/pages/provider/provider.component';
import { FinancialComponent } from './ProjetoGG/pages/financial/financial.component';
import { CardComponent } from './ProjetoGG/pages/card/card.component';

export const routes: Routes = [
//     {
//     path: '',
//     component: LoginComponent,
//   },
//   {
//     path: 'login',
//     component: LoginComponent,
//   },

  {
    path: '',
    component: ProjetoGGComponent,
    children: [
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
    ]}
];
