import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {LeftsidebarService} from './leftsidebar/leftsidebar.service';
import {DoctorService} from './doctor/doctor.service';
import {NurseService} from './nurse/nurse.service';
import {WarehouseService} from './warehouse/warehouse.service';
import {PatientService} from './patient/patient.service';
import {DashboardMenuService} from './dashboard-menu/dashboard-menu.service';
import {UserService} from './user/user.service';
import {LoginGuardGuard} from './guards/login-guard.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LeftsidebarService,
    DoctorService,
    NurseService,
    WarehouseService,
    PatientService,
    DashboardMenuService,
    UserService,
    LoginGuardGuard
  ],
  declarations: []
})
export class ServicesModule { }
