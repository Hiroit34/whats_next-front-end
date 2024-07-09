import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { iCategory } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  cartegoryUrls: string = environment.categoryUrl;
  categorySubj = new BehaviorSubject<iCategory[]>([]);

  category$ = this.categorySubj.asObservable();

  constructor(private http: HttpClient) {
    this.loadAllCategories();
  }

  getAllCategory(): Observable<iCategory[]> {
    return this.http.get<iCategory[]>(this.cartegoryUrls);
  }

  createCategory(category: iCategory): Observable<iCategory> {
    return this.http.post<iCategory>(this.cartegoryUrls, category).pipe(
      tap(() => this.loadAllCategories())
    )
  }

  loadAllCategories() {
    this.getAllCategory().subscribe(cat => {
      this.categorySubj.next(cat)
    })
  }

}
