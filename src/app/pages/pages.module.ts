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
import { AllPatientsComponent } from './nurses/all-patients/all-patients.component';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule,
  MatDatepickerModule, MatDialogModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule, MatMenuModule,
  MatNativeDateModule,
  MatOptionModule, MatPaginatorModule,
  MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSidenavModule,
  MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule,
  MatTooltipModule
} from '@angular/material';


import { DatesComponent } from './medical-consultations/dates/dates.component';

import { PatientsUrgenciasComponent } from './admissions/patients-urgencias/patients-urgencias.component';
import { DocumentsComponent } from './documents/documents.component';
import { PaymentsComponent } from './payments/payments.component';
import {InternComponent} from '../modals/intern/intern.component';
import {ServicesModule} from '../services/services.module';
import {FullCalendarModule} from 'ng-fullcalendar';
import {ScheduleDateComponent} from '../modals/schedule-date/schedule-date.component';
import { FirmComponent } from './firm/firm.component';
import { RecetaComponent } from './receta/receta.component';
import { NotPaidComponent } from './not-paid/not-paid.component';

@NgModule({
  providers: [

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ModalsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatRadioModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatStepperModule,
    MatSortModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatProgressSpinnerModule,

    PAGES_ROUTES,
    FullCalendarModule,
    ServicesModule
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
    AllPatientsComponent,
    DatesComponent,
    PatientsUrgenciasComponent,
    DocumentsComponent,
    PaymentsComponent,
    FirmComponent,
    RecetaComponent,
    NotPaidComponent,
  ],
  entryComponents: [
    InternComponent,
    ScheduleDateComponent
  ]
})
export class PagesModule { }
