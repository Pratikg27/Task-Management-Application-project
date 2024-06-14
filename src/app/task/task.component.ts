import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { TaskAddedDialogComponent } from '../task-added-dialog/task-added-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: any[] = [];
  addingTask = false; 
  updatingTask = false;
  deletingTask = false;
  newTask: any = {
    title: '',
    description: '',
    completed: false
  };

  constructor(private taskService: TaskService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  addTask(): void {
    this.addingTask = true; 
    this.taskService.createTask(this.newTask).subscribe(task => {
      setTimeout(() => {
        this.tasks.push(task);
        this.newTask = {
          title: '',
          description: '',
          completed: false
        };
        this.addingTask = false; 
        this.openTaskAddedDialog('Task Added'); 
      }, 2000); 
    });
  }

  updateTask(task: any): void {
    this.updatingTask = true;
    this.taskService.updateTask(task.id, task).subscribe(updatedTask => {
      const index = this.tasks.findIndex(t => t.id === updatedTask.id);
      this.tasks[index] = updatedTask;
      this.updatingTask = false; 
      this.openTaskAddedDialog('Task Updated'); 
    });
  }

  deleteTask(id: number): void {
    this.deletingTask = true;
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.deletingTask = false; 
      this.openTaskAddedDialog('Task Deleted'); 
    });
  }

  openTaskAddedDialog(message: string): void {
    const dialogRef = this.dialog.open(TaskAddedDialogComponent, {
      width: '250px', 
      data: { message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
