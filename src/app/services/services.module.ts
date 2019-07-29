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
import {TokenInterceptorService} from './auth/token-interceptor.service';
import {AuthService} from './auth/auth.service';
import {JwtInterceptorService} from './auth/jwt-interceptor.service';
import {ProductService} from './product/product.service';
import {ConsultationService} from './consultation/consultation.service';
import {QuestionControlService} from './question/question-control.service';
import {QuestionService} from './question/question.service';
import {UtilsService} from './utils/utils.service';
import {MedicalHistoryService} from './medical-history/medical-history.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AngularFireAuthModule,
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
    ProductService,
    ConsultationService,
    QuestionControlService,
    QuestionService,
    UtilsService,
    MedicalHistoryService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ],
  declarations: []
})
export class ServicesModule { }
