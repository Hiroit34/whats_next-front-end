import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { iUser } from '../../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private authSvc: AuthService
  ) {
    this.user$ = this.authSvc.user$;
  }

  user$!: Observable<iUser | null>
  items: MenuItem[] | undefined;
  avatarItems: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          {
              label: 'Home',
              icon: 'pi pi-home',
              command: () => {
                this.router.navigate(['/'])
              }
          }
      ];

      this.avatarItems = [
        {
            label: 'Documents',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-plus',
                    shortcut: '⌘+N'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-search',
                    shortcut: '⌘+S'
                },
                {
                  label: 'All Task',
                  icon: 'pi pi-list-check',
                  command: () => {
                    this.router.navigate(['/task'])
                  }
                }
            ]
        },
        {
            label: 'Profile',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-cog',
                    shortcut: '⌘+O'
                },
                {
                    label: 'Messages',
                    icon: 'pi pi-inbox',
                    badge: '2'
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    shortcut: '⌘+Q',
                    command: () => {
                      this.authSvc.logout();
                    }
                }
            ]
        },
        {
            separator: true
        }
    ];
  }
}
