/**
 * Módulo Principal da Aplicação
 *
 * Este módulo configura todos os imports necessários para a aplicação funcionar.
 * Inclui módulos do Angular Material e HttpClient para comunicação com APIs.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

// Módulo HTTP - NECESSÁRIO para comunicação com APIs
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Componentes da Aplicação
import { ProjetoGGComponent } from './ProjetoGG/projeto-gg.component';
import { AppComponent } from './app.component';
import { MenuComponent } from "./ProjetoGG/menu/menu.component";

@NgModule({
  declarations: [AppComponent, ProjetoGGComponent],
  imports: [
    // Módulos do Angular
    BrowserModule,
    HttpClientModule, // Necessário para fazer requisições HTTP
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    // Angular Material Modules
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,

    // Componentes
    MenuComponent,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
