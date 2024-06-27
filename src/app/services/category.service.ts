import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iCategory } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  cartegoryUrls: string = environment.categoryUrl;

  constructor(private http: HttpClient) { }

  getAllCategory(): Observable<iCategory[]> {
    return this.http.get<iCategory[]>(this.cartegoryUrls);
  }
}
