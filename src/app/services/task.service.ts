import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { iTask } from '../models/task';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { iTaskResponseLight } from '../models/task-response-light';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskUrl = environment.taskUrl;
  taskUrlCreate = environment.taskUrlCreate;
  private taskSubject = new BehaviorSubject<iTaskResponseLight[]>([]);
  task$ = this.taskSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAllTasks();
  }

  private loadAllTasks() {
    this.getAllTasks().subscribe(res => {
      this.taskSubject.next(res);
    });
  }

  getAllTasks(): Observable<iTaskResponseLight[]> {
    return this.http.get<iTaskResponseLight[]>(this.taskUrl);
  }

  createTask(task: iTask): Observable<iTask> {
    return this.http.post<iTask>(this.taskUrlCreate, task);
  }

  updateTaskStatus(taskId: number, status: string): Observable<iTaskResponseLight> {
    const url = `${this.taskUrl}/${taskId}/status`;
    return this.http.patch<iTaskResponseLight>(url, { status });
  }
}
