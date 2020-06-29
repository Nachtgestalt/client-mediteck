import {Component, OnInit, Input, Inject} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {URL_SERVICIOS} from '../../config/config';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import {AutocompleteDataService} from '../../services/autocompleteData/autocomplete-data.service';
import {InfrastructureService} from '../../services/infrastructure/infrastructure.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-intern',
  templateUrl: './intern.component.html',
  styleUrls: ['./intern.component.css']
})
export class InternComponent implements OnInit {

  public modalRef: NgbModalRef;
  @Input() id: any;
  indicaciones: string = '';
  medicamentos: string = '';
  cama;
  camas = [];
  ingresar: Observable<any>;
  medicines = [];
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;
  closeResult: string;

  constructor(public dialogRef: MatDialogRef<InternComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public http: HttpClient,
              private _autocompleteDataService: AutocompleteDataService,
              private _camasService: InfrastructureService) {
  }

  ngOnInit() {
    this._camasService.listCamas().subscribe(
      (res: any) => {
        console.log(res);
        this.camas = res;
      }
    );
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value: any) => {
          console.log(value);
          // value ? this.filter(value || '') : new EmptyObservable();
          return this.filterMedicine(value || '');
        })
      );
  }

  // open(content) {
  //   this.modalRef = this.modalService.open(content);
  //   this.modalRef.result.then((result) => {
  //     this.closeResult = `Closed with ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

  internar() {
    let info = {
      idPaciente: this.data.idPaciente,
      medicamento: this.medicines.toString(),
      indicaciones: this.indicaciones,
      idCama: +this.cama
    };

    console.log(info);

    this.http.post(`${URL_SERVICIOS}/ingreso`, info)
      .subscribe(
        data => {
          console.log(data);
          this.dialogRef.close(true);
        },
        error => {
          if (error.error.code === 409) {
            swal('Algo malo ha ocurrido', error.error.error, 'error');
          } else {
            swal('Algo malo ha ocurrido', 'Error al agregar paciente', 'error');
          }
        }
        );
  }

  addMedicine(medicamento) {
    this.myControl.reset();
    this.medicines.push(medicamento);
    console.log('Medicinas:', this.medicines);
  }

  displayFn(user?) {
    return user ? user.name : undefined;
  }

  filterMedicine(val: string): Observable<any[]> {
    // call the service which makes the http-request
    return this._autocompleteDataService.getMedicines(val)
      .pipe(
        map((response: any) => response.filter(option => {
          return option.Compuesto.toLowerCase().indexOf(val.toLowerCase()) >= 0;
        }))
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
