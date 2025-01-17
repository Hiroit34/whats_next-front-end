import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { iTaskResponseLight } from '../models/TaskInterface/task-response-light';

import { environment } from '../../environments/environment';
import { iTask } from '../models/TaskInterface/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskUrl = environment.taskUrl;
  taskUrlCreate = environment.taskUrlCreate;
  taskSubject = new BehaviorSubject<iTaskResponseLight[]>([]);
  task$ = this.taskSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAllTasks();
  }

  loadAllTasks() {
    this.getAllTasks().subscribe(tasks => {
      this.taskSubject.next(tasks);
    });
  }

  getAllTasks(): Observable<iTaskResponseLight[]> {
    return this.http.get<iTaskResponseLight[]>(this.taskUrl)
  }

  createTask(task: iTask): Observable<iTask> {
    return this.http.post<iTask>(this.taskUrlCreate, task).pipe(
      tap(() => this.loadAllTasks(),)
    );
  }

  clearTasks() {
    this.taskSubject.next([]);
  }

  updateTaskStatus(taskId: number, status: string): Observable<iTaskResponseLight> {
    const url = `${this.taskUrl}/${taskId}/status`;
    return this.http.patch<iTaskResponseLight>(url, { status })
  }

  updateTask(task: iTask): Observable<iTask> {
    return this.http.put<iTask>(`${this.taskUrl}/${task.id}`, task).pipe(
      tap(() => this.loadAllTasks())
    );
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.taskUrl}/${taskId}/delete`, { responseType: 'text' as 'json' }).pipe(
      tap(() => {
        this.removeTaskFromList(taskId); // Ricarica tutte le task per aggiornare lo stato
      })
    );
  }

  resetTasks() {
    this.taskSubject.next([]);
  }

  private removeTaskFromList(taskId: number) {
    const currentTasks = this.taskSubject.getValue();
    const updatedTasks = currentTasks.filter(task => task.id !== taskId);
    this.taskSubject.next(updatedTasks);
  }

}
