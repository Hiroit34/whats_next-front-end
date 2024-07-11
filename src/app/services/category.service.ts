import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { iCategoryLight } from '../models/CategoryInterface/category-light';
import { iCategory } from '../models/CategoryInterface/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryUrls: string = environment.categoryUrl;
  categorySubj = new BehaviorSubject<iCategory[]>([]);

  category$ = this.categorySubj.asObservable();

  constructor(private http: HttpClient) {
    this.loadAllCategories();
  }

  getAllCategory(): Observable<iCategory[]> {
    return this.http.get<iCategory[]>(this.categoryUrls).pipe(
      tap(categories => {
        // Ensure all categories have a 'task' property defined
        categories.forEach(category => {
          if (!category.task) {
            category.task = [];
          }
        });
      })
    );
  }

  createCategory(category: iCategoryLight): Observable<iCategoryLight> {
    return this.http.post<iCategory>(this.categoryUrls, category).pipe(
      tap(() => this.loadAllCategories())
    )
  }

  loadAllCategories() {
    this.getAllCategory().subscribe(cat => {
      this.categorySubj.next(cat)
    })
  }

}
