import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-added-dialog',
  templateUrl: 'task-added-dialog.component.html',
})
export class TaskAddedDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}