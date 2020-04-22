import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-schedule-date',
  templateUrl: './schedule-date.component.html',
  styleUrls: ['./schedule-date.component.css']
})
export class ScheduleDateComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ScheduleDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService) {}


  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.form = new FormGroup({
      'Paciente': new FormControl(),
      'Descripcion': new FormControl(),
      'Fecha_inicio': new FormControl(new Date().toISOString(), Validators.required),
      'Fecha_fin': new FormControl(new Date().toISOString(), Validators.required)
    });
  }

  scheduleDate() {
    console.log(this.form.value);
    this.authService.insertEvent(this.form.value).then(
      resp => {
        console.log(resp);
        this.dialogRef.close();
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

}
