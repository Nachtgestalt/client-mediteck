import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditDoctorComponent} from './edit-doctor/edit-doctor.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {EditNurseComponent} from './edit-nurse/edit-nurse.component';
import {EditPatientComponent} from './edit-patient/edit-patient.component';
import {EditWarehouseComponent} from './edit-warehouse/edit-warehouse.component';
import {EditVaccineComponent} from './edit-vaccine/edit-vaccine.component';
import {EditNoteComponent} from './edit-note/edit-note.component';
import {SeeIndicationsComponent} from './see-indications/see-indications.component';
import {InternComponent} from './intern/intern.component';
import {SendToUrgenciesComponent} from './send-to-urgencies/send-to-urgencies.component';
import {EditPlanComponent} from './edit-plan/edit-plan.component';
import {AddPlanComponent} from './add-plan/add-plan.component';
import {AddDateComponent} from './add-date/add-date.component';
import {MatAutocompleteModule, MatButtonModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatTooltipModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScheduleDateComponent} from './schedule-date/schedule-date.component';
import {ViewNotesComponent} from './view-notes/view-notes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    EditDoctorComponent,
    EditNurseComponent,
    EditPatientComponent,
    EditWarehouseComponent,
    EditVaccineComponent,
    EditNoteComponent,
    SeeIndicationsComponent,
    InternComponent,
    SendToUrgenciesComponent,
    EditPlanComponent,
    AddPlanComponent,
    AddDateComponent,
    ScheduleDateComponent,
    ViewNotesComponent
  ],
  exports: [
    EditDoctorComponent,
    EditNurseComponent,
    EditPatientComponent,
    EditWarehouseComponent,
    EditVaccineComponent,
    SeeIndicationsComponent,
    InternComponent,
    SendToUrgenciesComponent,
    EditPlanComponent,
    AddPlanComponent,
    AddDateComponent,
    ViewNotesComponent
  ]
})
export class ModalsModule { }
