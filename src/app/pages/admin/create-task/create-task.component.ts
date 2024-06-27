import { CategoryService } from './../../../services/category.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { iTask } from '../../../models/task';
import { iUser } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { iCategory } from '../../../models/category';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
})
export class CreateTaskComponent {
  taskForm!: FormGroup;
  users!: iUser[];
  category!: iCategory[];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private userSVC: UserService,
    private categorySvc: CategoryService
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(50)]],
      status: ['NON_COMPLETATO', Validators.required],
      category: this.fb.group({
        id: [null, Validators.required],
        categoryType: [''],
      }),
      userIds: [[], Validators.required],
      isShared: [false],
      isDeleted: [false],
    });
  }

  ngOnInit() {
    this.userSVC.getAllUser().subscribe(res => {
      this.users = res;
      console.log(this.users)
    })

    this.categorySvc.getAllCategory().subscribe(res => {
      this.category = res
      console.log(this.category)
    })

  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Partial<iTask> = {
        ...this.taskForm.value,
        userIds: this.taskForm.value.userIds.map(
          (user: { id: number }) => user.id
        ),
      };

      const completeTask: iTask = {
        id: 0,
        name: task.name!,
        description: task.description!,
        status: task.status!,
        category: {
          id: task.category!.id,
          categoryType: task.category!.categoryType!,
        },
        userIds: task.userIds!,
        isShared: task.isShared!,
        isDeleted: task.isDeleted!,
      };

      this.taskService.createTask(completeTask).subscribe(() => {
        this.router.navigate(['/admin/tasks']); // Redirect to the task list or another appropriate page
      });
    }
  }
}
