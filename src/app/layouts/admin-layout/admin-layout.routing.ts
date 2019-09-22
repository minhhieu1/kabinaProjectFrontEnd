import { AdminUserlistComponent } from '../../pages/admin-userlist/admin-userlist.component';
import { BookingAdminComponent } from './../../pages/booking-admin/booking-admin.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { TablesComponent } from 'src/app/pages/tables/tables.component';



export const AdminLayoutRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'shelfControl', component: TablesComponent },
    { path: 'bookingManage', component: BookingAdminComponent,
        children: [
            {
                path: '',
                loadChildren: '../../pages/booking-admin/booking-admin-layout.module#BookingAdminLayoutModule'
            }
        ]
    },
    { path: 'userList', component: AdminUserlistComponent },

];