import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iTaskResponseLight } from '../../../models/task-response-light';
import { TaskService } from '../../../services/task.service';
import { iUser } from '../../../models/user';
import { iCategory } from '../../../models/category';
import { UserService } from '../../../services/user.service';
import { CategoryService } from '../../../services/category.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { iTask } from '../../../models/task';

@Component({
  selector: 'app-admin-task',
  templateUrl: './admin-task.component.html',
  styleUrls: ['./admin-task.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AdminTaskComponent {
  allTask: iTaskResponseLight[] = [];
  availableTasks: iTaskResponseLight[] = [];
  completedTasks: iTaskResponseLight[] = [];
  displayDialog: boolean = false;
  taskForm: FormGroup;
  selectedTask: iTaskResponseLight | undefined;
  users: iUser[] = [];
  categories: iCategory[] = [];
  selectedUsers: iUser[] = []; // Initialize the selectedUsers array

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private userService: UserService,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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
    this.loadTasks();
    this.loadUsers();
    this.loadCategories();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.allTask = tasks.map((task) => ({
        ...task,
        combinedField: `${task.title} ${task.category?.categoryType || ''} ${task.status || ''}`
      }));
      this.availableTasks = this.allTask.filter(
        (task) => task.status !== 'COMPLETATO'
      );
      this.completedTasks = this.allTask.filter(
        (task) => task.status === 'COMPLETATO'
      );
      console.log('Loaded tasks:', this.allTask);
    });
  }

  loadUsers() {
    this.userService.getAllUser().subscribe((users) => {
      this.users = users;
      console.log('Loaded users:', this.users);
    });
  }

  loadCategories() {
    this.categoryService.getAllCategory().subscribe((categories) => {
      this.categories = categories.map((cat) => ({
        ...cat,
        catField: `${cat.categoryType || ''}`,
      }));
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
        this.updateTaskLists(); // Update task lists after status change
      },
      error: (error) => {
        console.error(`Failed to update status for task ${task.id}`, error);
      }
    });
  }

  openEditDialog(task: iTaskResponseLight) {
    this.selectedTask = task;
    const userIds = task.users.map((user) => user.id);
    this.selectedUsers = this.users.filter((user) => userIds.includes(user.id)); // Set selected users
    console.log('Editing Task:', task.title); // Debug: Verifica i dati della task che stai modificando
    console.log('User IDs:', userIds); // Debug: Verifica che gli ID degli utenti siano corretti
    this.taskForm.patchValue({
      title: task.title, // Assicurati di usare `title`
      description: task.description,
      status: task.status,
      category: task.category?.id || null, // Assicurati che l'ID della categoria venga impostato correttamente
      userIds: userIds, // Passa solo gli ID degli utenti
    });
    console.log('Form Value after patch:', this.taskForm.value); // Debug: Verifica i valori del form dopo il patch
    this.displayDialog = true;
  }

  onEditTask() {
    if (this.taskForm.valid && this.selectedTask) {
      const category = this.categories.find(
        (cat) => cat.id === this.taskForm.value.category
      );

      const updatedTask: iTask = {
        id: this.selectedTask.id,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        status: this.taskForm.value.status,
        category: {
          id: category?.id || 0,
          categoryType: category?.categoryType || '', // Assicurati di includere `categoryType`
        },
        userIds: this.taskForm.value.userIds,
      };

      console.log(
        'Updated Task Payload:',
        JSON.stringify(updatedTask, null, 2)
      ); // Debug: Verifica il payload JSON
      this.taskService.updateTask(updatedTask).subscribe({
        next: (res) => {
          console.log('Task updated successfully:', res);
          this.displayDialog = false;
          this.loadTasks();
        },
        error: (err) => {
          console.error('Error updating task:', err);
        },
      });
    }
  }

  closeDialog() {
    this.displayDialog = false;
  }

  confirm1(event: Event) {
    console.log('Confirm1 clicked'); // Aggiunto per debug
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Vuoi salvare le modifiche della task?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('Accepted'); // Aggiunto per debug
        this.onEditTask();  // Chiama il metodo di modifica
        this.messageService.add({ severity: 'info', summary: 'Salvato', detail: 'Hai modificato con successo la task', life: 3000 });
      },
      reject: () => {
        console.log('Rejected'); // Aggiunto per debug
        this.messageService.add({ severity: 'error', summary: 'Non salvato', detail: `Modifiche non apportate`, life: 3000 });
      }
    });
  }

  confirm2(event: Event) {
    console.log('Confirm2 clicked'); // Aggiunto per debug
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: "La modfiche non salvate andranno perse.",
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        console.log('Delete accepted'); // Aggiunto per debug
        this.closeDialog();  // Chiudi il dialogo
        this.messageService.add({ severity: 'info', summary: `La task non e' stata modificata`, detail: 'Nessuna modifica alla task apportata', life: 3000 });
      },
      reject: () => {
        console.log('Delete rejected'); // Aggiunto per debug
        // this.messageService.add({ severity: 'error', summary: 'Task non modificata', detail: `La task e' non modificata`, life: 3000 });
      }
    });
  }

  confirmDelete(task: iTaskResponseLight) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this task?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteTask(task);
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: 'Task not deleted' });
      }
    });
  }

  deleteTask(task: iTaskResponseLight) {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Task deleted successfully' });
        this.loadTasks(); // Refresh the task list after deletion
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete task' });
        console.error('Error deleting task:', err);
      }
    });
  }

  private updateTaskLists() {
    this.availableTasks = this.allTask.filter(task => task.status !== 'COMPLETATO');
    this.completedTasks = this.allTask.filter(task => task.status === 'COMPLETATO');
  }
}
