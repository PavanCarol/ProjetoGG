import { Routes } from '@angular/router';
import { ProjetoGGComponent } from './ProjetoGG/projeto-gg.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './ProjetoGG/dashboard/dashboard.component';

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
        path: 'dashboard',
        component: DashboardComponent,
      },
    ]}
];
