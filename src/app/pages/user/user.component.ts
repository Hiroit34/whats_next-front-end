import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { iCategory } from '../../models/category';
import { iTaskResponseLight } from '../../models/task-response-light';
import { iUser } from '../../models/user';
import { CategoryService } from '../../services/category.service';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {


}
