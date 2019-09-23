import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { User} from '../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  currentUser: User;

  constructor(location: Location,  private element: ElementRef, private router: Router, private authenticationService: AuthenticationService) {
    this.location = location;
   
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        //titlee = titlee.slice( 1 );
        titlee = titlee.substr(titlee.lastIndexOf('/') + 1);
    }
    if(titlee==='available-shelves'){
      return 'SHELVES MANAGE'
    }
    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Booking';
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/auth/login']);
  }
}
