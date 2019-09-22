import { UserBookingComponent } from './../../pages/user-booking/user-booking.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { UserLayoutRoutes } from './user-layout.routing';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { BookingHistoryComponent } from '../../pages/booking-history/booking-history.component'
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    UserProfileComponent,
    TablesComponent,
    BookingHistoryComponent,
    UserBookingComponent
  ],
  exports:[
    TablesComponent
  ]
})

export class UserLayoutModule {}
