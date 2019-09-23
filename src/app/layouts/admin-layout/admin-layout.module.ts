import { AdminUserlistComponent } from './../../pages/admin-userlist/admin-userlist.component';
import { UserLayoutModule } from './../user-layout/user-layout.module';
import { BookingAdminComponent } from '../../pages/booking-admin/booking-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { TablesComponent } from 'src/app/pages/tables/tables.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReadXlsxComponent } from '../../pages/read-xlsx/read-xlsx.component';


// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ClipboardModule,
    ChartsModule,
    ReactiveFormsModule,
    UserLayoutModule,
    NgxPaginationModule,
  ],
  declarations: [
    DashboardComponent,
    BookingAdminComponent,
    AdminUserlistComponent,
    ReadXlsxComponent,
  ]
})

export class AdminLayoutModule {}
