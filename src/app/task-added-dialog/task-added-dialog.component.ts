import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-added-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.message }}</h1>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>OK</button>
    </div>
  `,
  styles: [`
    h1 {
      text-align: center;
      font-size: 1.2em;
    }
    div {
      text-align: center;
    }
  `]
})
export class TaskAddedDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
