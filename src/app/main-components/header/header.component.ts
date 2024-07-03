import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { iUser } from '../../models/user';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userRole: string = '';
  user$!: Observable<iUser | null>;
  items: MenuItem[] | undefined;
  avatarItems: MenuItem[] | undefined;
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  roleSubscription!: Subscription;
  userSubscription!: Subscription;

  constructor(private router: Router, private authSvc: AuthService) {
    this.user$ = this.authSvc.user$;
  }

  ngOnInit() {
    this.roleSubscription = this.authSvc.userRole$.subscribe((role) => {
      console.log('User role updated:', role); // Debug log
      this.userRole = role;
      this.updateMenuItems(); // Aggiorna i menu items quando il ruolo cambia
    });

    this.userSubscription = this.authSvc.user$.subscribe(user => {
      console.log('User updated:', user); // Debug log
      if (user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
      } else {
        this.firstName = '';
        this.lastName = '';
        this.username = '';
      }
      this.updateMenuItems(); // Aggiorna i menu items quando l'utente cambia
    });

    this.extractUserInfo();
    console.log('User info extracted:', this.firstName, this.lastName, this.username); // Debug log
  }

  ngOnDestroy() {
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  private updateMenuItems() {
    console.log('Updating menu items with role:', this.userRole); // Debug log
    this.avatarItems = [
      {
        label: 'Documents',
        items: [
          {
            label: 'New task',
            icon: 'pi pi-plus',
            shortcut: '⌘+N',
            command: () => {
              this.router.navigate(['/admin/admin-create']);
            },
            visible: this.userRole === 'ADMIN', // Visibile solo per admin
          },
          {
            label: 'New task user',
            icon: 'pi pi-plus',
            shortcut: '⌘+N',
            command: () => {
              this.router.navigate(['/user/create']);
            },
            visible: this.userRole === 'USER', // Visibile solo per utenti
          },
          {
            label: 'Search',
            icon: 'pi pi-search',
            shortcut: '⌘+S',
          },
          {
            label: 'All Task',
            icon: 'pi pi-list-check',
            command: () => {
              this.router.navigate(['/user/task']);
            },
            visible: this.userRole === 'USER', // Visibile solo per utenti
          },
          {
            label: 'All Task',
            icon: 'pi pi-list-check',
            command: () => {
              this.router.navigate(['/admin/task']);
            },
            visible: this.userRole === 'ADMIN', // Visibile solo per admin
          },
        ],
      },
      {
        label: 'Profile',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            command: () => {
              this.router.navigate(['/user/profile-user']);
            },
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
              this.authSvc.logout();
              this.router.navigate(['/']);
            },
          },
        ],
      },
      {
        separator: true,
      },
    ];
    console.log('Avatar items:', this.avatarItems); // Debug log
  }

  private extractUserInfo() {
    const accessData = localStorage.getItem('accessData');
    if (accessData) {
      const parsedData = JSON.parse(accessData);
      this.firstName = parsedData.user.firstName;
      console.log(parsedData.user.firstName); // Debug log
      this.lastName = parsedData.user.lastName;
      console.log(parsedData.user.lastName); // Debug log
      this.username = parsedData.user.username;
      const roles = parsedData.user.roles.map((role: any) => role.typeRole);
      this.userRole = roles.includes('ADMIN') ? 'ADMIN' : 'USER';
      this.authSvc.setRole(roles);
    }
  }
}
