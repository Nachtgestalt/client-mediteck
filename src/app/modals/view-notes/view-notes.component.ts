import {Component, Inject, OnInit} from '@angular/core';
import {NotesService} from '../../services/notes/notes.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.css']
})
export class ViewNotesComponent implements OnInit {
  formNotas: FormArray;
  notes$: Observable<any>;

  constructor(private notesService: NotesService,
              public dialogRef: MatDialogRef<ViewNotesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.formNotas = new FormArray([]);
    console.log(this.formNotas);
    // this.formNotas = new FormGroup({
    //   'Cedula': new FormControl(''),
    //   'Tipo_nota': new FormControl(''),
    //   'Diagnostico': new FormControl(''),
    //   'Peso': new FormControl(''),
    //   'Talla': new FormControl(''),
    //   'IMC': new FormControl(''),
    //   'FC': new FormControl(''),
    //   'TR': new FormControl(''),
    //   'Temperatura': new FormControl(''),
    //   'TA': new FormControl(''),
    //   'SO2': new FormControl(''),
    //   'Nota': new FormControl(''),
    //   'Pronostico': new FormControl(''),
    //   'Analisis': new FormControl('')
    // });

    this.notes$ = this.notesService.fetchNotes(this.data.id)
      .pipe(
        map((notes: Array<any>) => {
            return notes.map(note => {
                let {Tipo_nota} = note;
                switch (Tipo_nota) {
                  case '0':
                    Tipo_nota = 'Urgencia';
                    break;
                  case '1':
                    Tipo_nota = 'Ingreso (Hospitalización)';
                    break;
                  case '2':
                    Tipo_nota = 'Evolución';
                    break;
                  case '3':
                    Tipo_nota = 'Guardia';
                    break;
                  case '4':
                    Tipo_nota = 'Postquirúrgica';
                    break;
                  case '5':
                    Tipo_nota = 'Defunción';
                    break;
                }
                return {...note, Tipo_nota: Tipo_nota};
              }
            );
          }
        )
      );
  }

}
