import { LoginComponent } from './../../auth/login/login.component';
import { CategoryService } from './../../services/category.service';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { iUser } from '../../models/user';
import { filter, Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iCategory } from '../../models/category';
import { TaskService } from '../../services/task.service';

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
  visible: boolean = false;
  projectForm: FormGroup;
  currentUrl: string = '';

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private taskService: TaskService
  ) {
    this.user$ = this.authSvc.user$;

    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      projectDescription: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.roleSubscription = this.authSvc.userRole$.subscribe((role) => {
      this.userRole = role;
      this.updateMenuItems(); // Aggiorna i menu items quando il ruolo cambia
    });

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
      this.updateMenuItems(); // Aggiorna i menu items quando l'utente cambia
    });

    this.extractUserInfo();
    // Subscribe to router events to get the current URL
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateMenuItems();
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
    const currentUrl = this.router.url;
    let isCreateTaskPage = '/admin/admin-create'

    isCreateTaskPage === currentUrl;

    this.items = [
    ]
    this.avatarItems = [
      {
        label: 'Documents',
        items: [
          {
            label: 'New task',
            icon: 'pi pi-plus',
            command: () => {
              this.router.navigate(['/admin/admin-create']);
            },
            visible: this.userRole === 'ADMIN', // Visibile solo per admin
          },
          {
            label: 'New Project',
            icon: 'pi pi-plus',
            command: () => this.showDialog(),
            visible: this.userRole === 'ADMIN' && !(isCreateTaskPage === currentUrl)
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
              this.logout();
              this.router.navigate(['/auth/login']);
            },
          },
        ],
      },
      {
        separator: true,
      },
    ];
  }

  logout() {
    this.authSvc.logout();
    this.taskService.resetTasks(); // Resetta le task al logout
  }

  showDialog() {
    console.log('Progetto aperto');

    this.visible = true;
  }

  createProject() {
    if (this.projectForm.valid) {
      const projectName = this.projectForm.get('projectName')?.value;
      const projectDescription = this.projectForm.get('projectDescription')?.value;
      const newProject: iCategory = {
        id: 0,
        categoryType: projectName,
        description: projectDescription
      };

      this.categoryService.createCategory(newProject).subscribe({

        next: (category) => {
          console.log('clicked');
          console.log('Category created', category )
          this.visible = false;
          this.projectForm.reset();
        },
        error: (error) => {
          console.error('Errore nella creazione del progetto.', error);
        }
      })
    } else {
      console.error('errore nella creazione del progetto. project.From non valido.')
    }
  }

  private extractUserInfo() {
    const accessData = localStorage.getItem('accessData');
    if (accessData) {
      const parsedData = JSON.parse(accessData);
      this.firstName = parsedData.user.firstName;
      this.lastName = parsedData.user.lastName;
      this.username = parsedData.user.username;
      const roles = parsedData.user.roles.map((role: any) => role.typeRole);
      this.userRole = roles.includes('ADMIN') ? 'ADMIN' : 'USER';
      this.authSvc.setRole(roles);
    }
  }
}
