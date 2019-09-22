import { UsHistoryComponent } from './../us-history/us-history.component';
import { UsEditComponent } from '../us-edit/us-edit.component';
import { UserBookingLayoutRoutes } from './booking-layout.routing';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { UsBookingComponent } from '../us-booking/us-booking.component';
// import { ToastrModule } from 'ngx-toastr';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserBookingLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    UsBookingComponent,
    UsEditComponent,
    UsHistoryComponent
  ]
})

export class UserBookingLayoutModule {}
