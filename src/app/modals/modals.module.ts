import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditDoctorComponent} from './edit-doctor/edit-doctor.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import { EditNurseComponent } from './edit-nurse/edit-nurse.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { EditWarehouseComponent } from './edit-warehouse/edit-warehouse.component';
import { EditVaccineComponent } from './edit-vaccine/edit-vaccine.component';
import { EditNoteComponent } from './edit-note/edit-note.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    EditDoctorComponent,
    EditNurseComponent,
    EditPatientComponent,
    EditWarehouseComponent,
    EditVaccineComponent,
    EditNoteComponent
  ],
  exports: [
    EditDoctorComponent,
    EditNurseComponent,
    EditPatientComponent,
    EditWarehouseComponent,
    EditVaccineComponent
  ]
})
export class ModalsModule { }
