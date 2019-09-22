import { AdminApproveEditComponent } from './../admin-approve-edit/admin-approve-edit.component';
import { AdminHistoryComponent } from './../admin-history/admin-history.component';
import { AdminEditComponent } from './../admin-edit/admin-edit.component';
import { Routes } from '@angular/router';
import { AdminBookingComponent } from '../admin-booking/admin-booking.component';
import { AdminApproveBookingComponent } from '../admin-approve-booking/admin-approve-booking.component';


export const BookingAdminLayoutRoutes: Routes = [
    {
        path: '',
        redirectTo: 'adminBooking',
        pathMatch: 'full',
    },
    { path: 'adminBooking',      component: AdminBookingComponent },
    { path: 'adminEdit',         component: AdminEditComponent },
    { path: 'adminHistory',      component: AdminHistoryComponent },
    { path: 'adminApproveBooking',      component: AdminApproveBookingComponent },
    { path: 'adminApproveEdit',      component: AdminApproveEditComponent },
];
