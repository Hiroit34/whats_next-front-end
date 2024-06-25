import { Component } from '@angular/core';
import { iTask } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  notCompleted!: iTask[];

  onGoingTask!: iTask[];

  completedTask!: iTask[];

  constructor(private taskSvc: TaskService) {

  }

  ngOnInit() {
    this.taskSvc.getAllTask().subscribe(res => {
      this.notCompleted = res;
    })
  }

}
