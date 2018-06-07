import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditDoctorComponent} from './edit-doctor/edit-doctor.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';

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
    EditDoctorComponent
  ],
  exports: [
    EditDoctorComponent
  ]
})
export class ModalsModule { }
