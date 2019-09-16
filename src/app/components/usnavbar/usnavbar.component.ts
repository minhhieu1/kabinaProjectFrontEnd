import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../ussidebar/ussidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { User} from '../../models/user';

@Component({
  selector: 'app-usnavbar',
  templateUrl: './usnavbar.component.html',
  styleUrls: ['./usnavbar.component.scss']
})
export class UsnavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  currentUser: User;

  constructor(location: Location,  private element: ElementRef, private router: Router, private authenticationService: AuthenticationService) {
    this.location = location;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.substr(titlee.lastIndexOf('/') + 1);
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
