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
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalsModule} from '../modals/modals.module';
import { SuppliesComponent } from './supplies/supplies.component';
import { VaccineComponent } from './supplies/vaccine/vaccine.component';
import { AddVaccineComponent } from './supplies/vaccine/add-vaccine/add-vaccine.component';
import {FilterPipe} from '../pipes/filter.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ProductsComponent } from './products/products.component';
import { AddProductsComponent } from './products/add-products/add-products.component';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { AddNoteComponent } from './medical-consultations/notes/add-note/add-note.component';
import { PatientDetailComponent } from './patients/patient-detail/patient-detail.component';
import { SurgeryComponent } from './surgery/surgery.component';
import {DynamicFormComponent} from './medical-consultations/medical-history/dynamic-form/dynamic-form.component';
import { DietAndMedicamentsComponent } from './nurses/diet-and-medicaments/diet-and-medicaments.component';
import { AllPatientsComponent } from './nurses/all-patients/all-patients.component';
import { DatesComponent } from './medical-consultations/dates/dates.component';

import { FullCalendarModule } from 'ng-fullcalendar';

@NgModule({
  providers: [

  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ModalsModule,
    PAGES_ROUTES,
    FullCalendarModule
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
    FilterPipe,
    ProductsComponent,
    AddProductsComponent,
    ListProductsComponent,
    AddNoteComponent,
    PatientDetailComponent,
    SurgeryComponent,
    DynamicFormComponent,
    DietAndMedicamentsComponent,
    AllPatientsComponent,
    DatesComponent,
  ]
})
export class PagesModule { }
