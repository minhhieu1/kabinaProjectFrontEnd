import { Component, OnInit } from '@angular/core';
import { AppConfiguration } from 'src/app/kabina/services/app-config.service';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';
import { Role } from './models/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'kabina-ui';
  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
      return this.currentUser && this.currentUser.role.roleName === Role.Admin;
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
