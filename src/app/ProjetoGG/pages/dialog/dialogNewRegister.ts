import { Component } from '@angular/core';

@Component({
  selector: 'app-example-dialog',
  template: `
    <h1 mat-dialog-title>Olá!</h1>
    <div mat-dialog-content>
      Esse é o conteúdo do dialog.
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Fechar</button>
    </div>
  `
})
export class DialogNewRegister {}