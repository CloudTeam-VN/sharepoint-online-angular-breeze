import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdalService } from './services/adal-service.service';

@Injectable()
export class AzureGuardGuard implements CanActivate {

  constructor(private adalService: AdalService, private router: Router) { };
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.adalService.isAuthenticated()) { return true; }

    // Store the attempted URL for redirecting
    //this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.adalService.login();

    return false;
  }

}
