

import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { TaskAddedDialogComponent } from '../task-added-dialog/task-added-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: any[] = [];
  addingTask = false; // Show progress bar
  newTask: any = {
    title: '',
    description: '',
    completed: false
  };

  constructor(private taskService: TaskService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  addTask(): void {
    this.addingTask = true; // Show progress bar
    this.taskService.createTask(this.newTask).subscribe(task => {
    setTimeout(() => {

      this.tasks.push(task);
      this.newTask = {
        title: '',
        description: '',
        completed: false
   
      };
      this.addingTask = false; // Hide progress bar after task is added
      this.openTaskAddedDialog(); // Open dialog box when task is added
    }, 2000); // 2000 milliseconds = 5 seconds
    });
  }
  openTaskAddedDialog(): void {
    const dialogRef = this.dialog.open(TaskAddedDialogComponent, {
      width: '250px', // Set width as per your requirement
      data: { /* You can pass any data to the dialog if required */ }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // You can perform any action here after the dialog is closed if needed
  });
  }
  updateTask(task: any): void {
    this.taskService.updateTask(task.id, task).subscribe(updatedTask => {
      const index = this.tasks.findIndex(t => t.id === updatedTask.id);
      this.tasks[index] = updatedTask;
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
    });
  }
}