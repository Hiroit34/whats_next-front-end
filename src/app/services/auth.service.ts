import { iLogin } from '../models/login';
import { Injectable } from '@angular/core';
import { iUser } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { iRole } from '../models/role';


type AccessData = {
  token: string,
  user:iUser
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient,
    private router:Router
  ) {
    this.restoreUser()
  }

  private tokenKey = 'auth-token';
  registerUrl: string = environment.registerUrl;
  loginUrl: string = environment.loginUrl;

  jwtHelper: JwtHelperService = new JwtHelperService()

  authSubj = new BehaviorSubject<iUser|null>(null)
  userRoleSubj = new BehaviorSubject<string>('USER');

  user$ = this.authSubj.asObservable();
  userRole$ = this.userRoleSubj.asObservable();

  register(newUser:Partial<iUser>):Observable<AccessData> {
    return this.http.post<AccessData>(this.registerUrl, newUser)
  }

  login(loginData: iLogin): Observable<AccessData> {
    return this.http.post<AccessData>(this.loginUrl, loginData).pipe(
      tap(data => {
        this.authSubj.next(data.user);
        localStorage.setItem('accessData', JSON.stringify(data));
        localStorage.setItem('user', JSON.stringify(data.user)); // Assicurati di salvare l'utente
        const roles = data.user.roles?.map((role: iRole) => role.typeRole) ?? [];
        localStorage.setItem('userRoles', JSON.stringify(roles));
        this.setRole(roles);
        this.autoLogout(data.token);
      })
    );
  }

  getAccessToken(): string {
    const userJson = localStorage.getItem('accessData');
    if (!userJson) return '';

    const accessData: AccessData = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(accessData.token)) return '';

    return accessData.token;
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('accessData');
    localStorage.removeItem('userRoles');
    localStorage.removeItem('user')
    this.userRoleSubj.next('USER');
    this.router.navigate(["/login"])
  }

  autoLogout(jwt: string): void {
    const expDate = this.jwtHelper.getTokenExpirationDate(jwt);

    if (expDate) {
      const expsInMs = expDate.getTime() - new Date().getTime();

      setTimeout(() => {
        this.logout();
      }, expsInMs)
    }
    this.router.navigate(['/'])
  }

  restoreUser() {
    const USERJSON = localStorage.getItem('accessData')
    if(!USERJSON) return;
    const accessData:AccessData = JSON.parse(USERJSON)
    if(accessData.token && accessData.user) {
      this.authSubj.next(accessData.user);
      this.autoLogout(accessData.token)
    }
  }

  getRole(): string {
    const rolesJson = localStorage.getItem('userRoles');
    if (!rolesJson) return '';

    const roles: string[] = JSON.parse(rolesJson);
    if (roles.includes('ADMIN')) {
      return 'ADMIN';
    } else {
      return 'USER';
    }
  }

  setRole(roles: string[]) {
    if (roles.includes('ADMIN')) {
      this.userRoleSubj.next('ADMIN');
    } else {
      this.userRoleSubj.next('USER');
    }
  }
}
