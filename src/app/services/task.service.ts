import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { iTask } from '../models/task';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskUrl = environment.taskUrl;
  taskArr!: iTask[];
  taskSubject = new BehaviorSubject<iTask[]>([]);
  $task = this.taskSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getAllTask().subscribe(res => {
      this.taskSubject.next(res);
      this.taskArr = res;
    })
   }

  getAllTask() {
    return this.http.get<iTask[]>(this.taskUrl);
  }
}
