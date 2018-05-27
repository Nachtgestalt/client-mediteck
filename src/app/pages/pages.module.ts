import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PagesComponent} from './pages.component';
import {NavbarComponent} from '../shared/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {PAGES_ROUTES} from './pages.routes';
import {BreadcrumbsComponent} from '../shared/breadcrumbs/breadcrumbs.component';
import {LeftsidebarComponent} from '../shared/leftsidebar/leftsidebar.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DoctoresComponent } from './doctores/doctores.component';
import { AddDoctorComponent } from './doctores/add-doctor/add-doctor.component';
import { AddPatientsComponent } from './patients/add-patients/add-patients.component';
import { NursesComponent } from './nurses/nurses.component';
import { AddNursesComponent } from './nurses/add-nurses/add-nurses.component';
import { MedicalConsultationsComponent } from './medical-consultations/medical-consultations.component';
import { MedicalHistoryComponent } from './medical-consultations/medical-history/medical-history.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PAGES_ROUTES   //pages.routes.ts
  ],
  declarations: [
    PagesComponent,
    NavbarComponent,
    BreadcrumbsComponent,
    LeftsidebarComponent,
    DashboardComponent,
    DoctoresComponent,
    AddDoctorComponent,
    AddPatientsComponent,
    NursesComponent,
    AddNursesComponent,
    MedicalConsultationsComponent,
    MedicalHistoryComponent,
  ]
})
export class PagesModule { }