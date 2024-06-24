import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit(){
    this.items = [
      {
          label: 'Sign up',
          icon: 'pi pi-palette',
          items: [
              {
                  label: 'Login',
                  route: '/auth/login'
              },
              {
                  label: 'Register',
                  route: '/auth/register'
              }
          ]
      },
      {
          label: 'Programmatic',
          icon: 'pi pi-link',
          command: () => {
              this.router.navigate(['/auth/login']);
          }
      },
      {
          label: 'External',
          icon: 'pi pi-home',
          items: [
              {
                  label: 'Angular',
                  url: 'https://angular.io/'
              },
              {
                  label: 'Vite.js',
                  url: 'https://vitejs.dev/'
              }
          ]
      }
  ];
}

}
