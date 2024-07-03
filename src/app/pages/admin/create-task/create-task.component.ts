import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { iUser } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { iCategory } from '../../../models/category';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  users!: iUser[];
  category!: iCategory[];
  selectedUsers!: iUser[];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private userSVC: UserService,
    private categorySvc: CategoryService
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(300)]],
      status: ['NON_ACCETTATO', Validators.required],
      category: [null, Validators.required],
      userIds: [[], Validators.required],
      isShared: [false],
      isDeleted: [false],
    });
  }

  ngOnInit() {
    this.userSVC.getAllUser().subscribe(res => {
      this.users = res;
      console.log(this.users);
    });

    this.categorySvc.getAllCategory().subscribe(res => {
      this.category = res.map(category => ({
        id: category.id,
        categoryType: category.categoryType
      }));
      console.log(this.category);
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const selectedCategory = this.category.find(cat => cat.id === this.taskForm.value.category);
      const taskPayload = {
        ...this.taskForm.value,
        category: selectedCategory,
        userIds: this.taskForm.value.userIds.map((user: number) => user),
      };

      console.log('Payload:', taskPayload); // Debug: Verifica il payload

      this.taskService.createTask(taskPayload).subscribe(() => {
        this.router.navigate(['/admin/task']);
      });
    }
  }
}
