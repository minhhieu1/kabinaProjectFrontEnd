import { AdminHistoryComponent } from './../admin-history/admin-history.component';
import { AdminApproveEditComponent } from './../admin-approve-edit/admin-approve-edit.component';
import { AdminApproveBookingComponent } from './../admin-approve-booking/admin-approve-booking.component';
import { AdminEditComponent } from './../admin-edit/admin-edit.component';
import { BookingAdminLayoutRoutes } from './booking-admin-layout.routing';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminBookingComponent } from '../admin-booking/admin-booking.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BookingAdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    AdminBookingComponent,
    AdminEditComponent,
    AdminApproveBookingComponent,
    AdminApproveEditComponent,
    AdminHistoryComponent
  ]
})

export class BookingAdminLayoutModule {}
