import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../../services/category.service';
import { iCategory } from '../../../models/CategoryInterface/category';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrl: './category-admin.component.css'
})
export class CategoryAdminComponent implements OnInit{

  categories: iCategory[] = [];
  paginatedCategories: iCategory[] = [];
  rows: number = 5;
  first: number = 0;
  searchTerm: string = '';
  filteredCategories: iCategory[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadAllCategories();
  }

  loadAllCategories() {
    this.categoryService.category$.subscribe((cat) => {
      this.categories = cat;
      this.filterCategories(); // Filtra le categorie all'inizio
      console.log(cat);
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginate();
  }

  filterCategories() {
    if (this.searchTerm) {
      this.filteredCategories = this.categories.filter(cat =>
        cat.categoryType.toLowerCase().includes(this.searchTerm.toLowerCase()));
    } else {
      this.filteredCategories = this.categories;
    }
    this.first = 0; // Resetta alla prima pagina dopo il filtraggio
    this.paginate();
  }

  paginate() {
    const startIndex = this.first;
    const endIndex = this.first + this.rows;
    this.paginatedCategories = this.filteredCategories.slice(startIndex, endIndex);
  }

}
