import { UsHistoryComponent } from './../us-history/us-history.component';
import { UsEditComponent } from '../us-edit/us-edit.component';
import { Routes } from '@angular/router';
import { UsBookingComponent } from '../us-booking/us-booking.component';


export const UserBookingLayoutRoutes: Routes = [
    {
        path: '',
        redirectTo: 'usBooking',
        pathMatch: 'full',
    },
    { path: 'usBooking',      component: UsBookingComponent },
    { path: 'usEdit',      component: UsEditComponent },
    { path: 'usHistory',      component: UsHistoryComponent },
];
