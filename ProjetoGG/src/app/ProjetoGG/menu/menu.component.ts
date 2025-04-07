import { Component, computed, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
export type MenuItem={
  icon:string;
  label: string;
  route: string;
}
@Component({
  selector: 'app-menu',
  standalone: true,
  imports:[CommonModule,MatListModule,MatIconModule, RouterModule ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  sideNavCollapsed= signal (false);
  @Input() set collapsed(val:boolean){
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon:'shopping_cart',
      label:'Pedidos',
      route:'order',
    },
    {
      icon:'inventory',
      label:'Estoque',
      route:'inventory',
    },
    {
      icon:'support_agent',
      label:'Fornecedores',
      route:'provider',
    },
    {
      icon:'paid',
      label:'Financeiro',
      route:'financial',
    },
    {
      icon:'menu_book',
      label:'Cardápio',
      route:'card',
    },
    {
      icon:'group',
      label:'Clientes',
      route:'client',
    }
  ]);

  prifilePicSize = computed(() => this.sideNavCollapsed() ? '32': '100');
}
