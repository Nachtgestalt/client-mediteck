import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LeftsidebarService} from './leftsidebar/leftsidebar.service';
import {DoctorService} from './doctor/doctor.service';
import {NurseService} from './nurse/nurse.service';
import {WarehouseService} from './warehouse/warehouse.service';
import {PatientService} from './patient/patient.service';
import {DashboardMenuService} from './dashboard-menu/dashboard-menu.service';
import {UserService} from './user/user.service';
import {LoginGuardGuard} from './guards/login-guard.guard';
import {VaccineService} from './vaccine/vaccine.service';
import {AuthService} from './auth/Auth.service';
import {SecurityTokenInterceptor} from './interceptors/security-token-interceptor';

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
    LoginGuardGuard,
    VaccineService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityTokenInterceptor,
      multi: true
    }
  ],
  declarations: []
})
export class ServicesModule { }
