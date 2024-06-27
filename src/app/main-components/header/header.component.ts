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
      this.userRole = role;
      this.updateMenuItems();
    });

    this.extractUserInfo();
    this.updateMenuItems();

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/']);
        },
      },
    ];

    this.userSubscription = this.authSvc.user$.subscribe(user => {
      if (user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
      } else {
        this.firstName = '';
        this.lastName = '';
        this.username = '';
      }
    });
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
  }

  private extractUserInfo() {
    const accessData = localStorage.getItem('accessData');
    if (accessData) {
      const parsedData = JSON.parse(accessData);
      this.firstName = parsedData.user.firstName;
      console.log(parsedData.user.firstName)
      this.lastName = parsedData.user.lastName;
      console.log(parsedData.user.lastName)
      this.username = parsedData.user.username;
      const roles = parsedData.user.roles.map((role: any) => role.typeRole);
      this.userRole = roles.includes('ADMIN') ? 'ADMIN' : 'UTENTE';
    }
  }
}
