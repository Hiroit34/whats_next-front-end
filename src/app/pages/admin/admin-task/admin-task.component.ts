import { Component } from '@angular/core';
import { iTask } from '../../../models/task';
import { TaskService } from '../../../services/task.service';
import { iTaskResponseLight } from '../../../models/task-response-light';

@Component({
  selector: 'app-admin-task',
  templateUrl: './admin-task.component.html',
  styleUrl: './admin-task.component.css'
})
export class AdminTaskComponent {

  allTask: iTaskResponseLight[] = [];
  availableTasks: iTaskResponseLight[] = [];
  completedTasks: iTaskResponseLight[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.allTask = tasks;
      this.availableTasks = tasks.filter(task => task.status !== 'COMPLETATO');
      this.completedTasks = tasks.filter(task => task.status === 'COMPLETATO');
      console.log('Loaded tasks:', tasks); // Verifica che i dati delle task siano caricati correttamente
    });
  }

  onTaskMoveToTarget(event: any) {
    event.items.forEach((task: iTaskResponseLight) => {
      this.updateTaskStatus(task, 'COMPLETATO');
    });
  }

  onTaskMoveToSource(event: any) {
    event.items.forEach((task: iTaskResponseLight) => {
      this.updateTaskStatus(task, 'NON_COMPLETATO');
    });
  }

  onMoveAllToTarget(event: any) {
    event.items.forEach((task: iTaskResponseLight) => {
      this.updateTaskStatus(task, 'COMPLETATO');
    });
  }

  onMoveAllToSource(event: any) {
    event.items.forEach((task: iTaskResponseLight) => {
      this.updateTaskStatus(task, 'NON_COMPLETATO');
    });
  }

  updateTaskStatus(task: iTaskResponseLight, status: string) {
    this.taskService.updateTaskStatus(task.id, status).subscribe({
      next: (updatedTask) => {
        console.log(`Task ${task.id} status updated to ${status}`);
        task.status = status; // Aggiorna lo stato della task localmente

        // Aggiorna le liste delle task
        this.availableTasks = this.allTask.filter(task => task.status !== 'COMPLETATO');
        this.completedTasks = this.allTask.filter(task => task.status === 'COMPLETATO');
      },
      error: (error) => {
        console.error(`Failed to update status for task ${task.id}`, error);
      }
    });
  }
}
