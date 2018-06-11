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
import { WarehousesComponent } from './warehouses/warehouses.component';
import { AddWarehouseComponent } from './warehouses/add-warehouse/add-warehouse.component';
import { NursesComponent } from './nurses/nurses.component';
import { AddNursesComponent } from './nurses/add-nurses/add-nurses.component';
import { MedicalConsultationsComponent } from './medical-consultations/medical-consultations.component';
import { MedicalHistoryComponent } from './medical-consultations/medical-history/medical-history.component';
import { NotesComponent } from './medical-consultations/notes/notes.component';
import { InfrastructureComponent } from './infrastructure/infrastructure.component';
import { BedsXroomComponent } from './infrastructure/beds-xroom/beds-xroom.component';
import { NewMedicalConsultationComponent } from './medical-consultations/new-medical-consultation/new-medical-consultation.component';
import { AddSectionComponent } from './infrastructure/add-section/add-section.component';
import { ListFloorsComponent } from './infrastructure/list-floors/list-floors.component';
import { ListPatientsComponent } from './patients/list-patients/list-patients.component';
import {EditDoctorComponent} from '../modals/edit-doctor/edit-doctor.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalsModule} from '../modals/modals.module';
import { SuppliesComponent } from './supplies/supplies.component';
import { VaccineComponent } from './supplies/vaccine/vaccine.component';
import { AddVaccineComponent } from './supplies/vaccine/add-vaccine/add-vaccine.component';
import {FilterPipe} from '../pipes/filter.pipe';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ModalsModule,
    PAGES_ROUTES
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
    WarehousesComponent,
    AddWarehouseComponent,
    NursesComponent,
    AddNursesComponent,
    MedicalConsultationsComponent,
    MedicalHistoryComponent,
    NotesComponent,
    InfrastructureComponent,
    BedsXroomComponent,
    NewMedicalConsultationComponent,
    AddSectionComponent,
    ListFloorsComponent,
    ListPatientsComponent,
    SuppliesComponent,
    VaccineComponent,
    AddVaccineComponent,
    //pipes
    FilterPipe
  ]
})
export class PagesModule { }
