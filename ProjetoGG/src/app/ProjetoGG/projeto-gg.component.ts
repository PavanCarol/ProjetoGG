import { Component, computed, signal } from '@angular/core';
@Component({
  selector: 'app-projeto-gg',
  standalone: false,
  templateUrl: './projeto-gg.component.html',
  styleUrl: './projeto-gg.component.scss'
})
export class ProjetoGGComponent {

  collapsed = signal(false);

  sidenavWidth = computed(()=> this.collapsed() ? '65px' : '250px');
}
