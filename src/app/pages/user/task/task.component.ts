import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { iCategory } from '../../../models/category';
import { iTaskResponseLight } from '../../../models/task-response-light';
import { iUser } from '../../../models/user';
import { CategoryService } from '../../../services/category.service';
import { TaskService } from '../../../services/task.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {

  allTask: iTaskResponseLight[] = [];
  availableTasks: iTaskResponseLight[] = [];
  completedTasks: iTaskResponseLight[] = [];
  displayDialog: boolean = false;
  taskForm: FormGroup;
  selectedTask: iTaskResponseLight | undefined;
  users: iUser[] = [];
  categories: iCategory[] = [];
  currentUserId: number | null = null;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private userService: UserService,
    private categoryService: CategoryService
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(50)]],
      status: ['NON_COMPLETATO', Validators.required],
      category: [null, Validators.required],
      userIds: [[], Validators.required],
      isShared: [false],
      isDeleted: [false],
    });
  }

  ngOnInit() {
    this.loadCurrentUserId();
    this.loadTasks();
    this.loadCategories();
  }

  loadCurrentUserId() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserId = user.id;
        console.log('Current User ID:', this.currentUserId);
      } catch (error) {
        console.error('Error parsing user from local storage', error);
      }
    } else {
      console.error('No current user found in local storage');
    }
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.allTask = tasks;
      this.availableTasks = tasks.filter(task => task.status !== 'COMPLETATO');
      this.completedTasks = tasks.filter(task => task.status === 'COMPLETATO');
      console.log('Loaded tasks:', tasks);
    });
  }

  loadCategories() {
    this.categoryService.getAllCategory().subscribe(categories => {
      this.categories = categories;
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
        task.status = status;

        this.availableTasks = this.allTask.filter(task => task.status !== 'COMPLETATO');
        this.completedTasks = this.allTask.filter(task => task.status === 'COMPLETATO');
      },
      error: (error) => {
        console.error(`Failed to update status for task ${task.id}`, error);
      }
    });
  }

  openEditDialog(task: iTaskResponseLight) {
    this.selectedTask = task;
    const userIds = task.users.map(user => user.id);
    console.log('Editing Task:', task);
    console.log('User IDs:', userIds);
    this.taskForm.patchValue({
      ...task,
      category: task.category?.id || null,
      userIds: userIds
    });
    this.displayDialog = true;
  }

  onEditTask() {
    if (this.taskForm.valid && this.selectedTask) {
      const updatedTask: iTaskResponseLight = {
        ...this.selectedTask,
        ...this.taskForm.value,
        category: this.categories.find(cat => cat.id === this.taskForm.value.category) as iCategory,
        users: this.users.filter(user => this.taskForm.value.userIds.includes(user.id))
      };
      console.log('Updated Task:', updatedTask);
      this.taskService.updateTask(updatedTask).subscribe({
        next: (res) => {
          console.log('Task updated successfully:', res);
          this.displayDialog = false;
          this.loadTasks();
        },
        error: (err) => {
          console.error('Error updating task:', err);
        }
      });
    }
  }

  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.username : 'Unknown User';
  }

  closeDialog() {
    this.displayDialog = false;
  }
}
