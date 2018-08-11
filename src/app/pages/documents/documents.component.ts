import { Component } from '@angular/core';
import { AngularFireStorage, 
         AngularFireStorageReference, 
         AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent{
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  url:string = "";
  medicalCenter:any = localStorage.getItem('idMedicalCenter');
  records: any;
  name: string = "";

  constructor(public afStorage: AngularFireStorage, public db: AngularFireDatabase){
      this.getRecords();
  }

  upload(){
    //Storage
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(`files/${id}`);
    for (let selectedFile of [(<HTMLInputElement>document.getElementById('docsPDF')).files[0]]) {
      this.task = this.ref.put(selectedFile)
    }
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.uploadProgress.subscribe(progress =>{
      if(progress == 100){
        swal('¡Listo :)!', 'El archivo se ha subio con éxito', 'success');
        this.task.then(snap => {
          snap.ref.getDownloadURL().then(data => {
            this.url = data;
              //Database
              let itemRef = this.db.object(`files/${id}`);
              itemRef.set({
                id: id,
                fileUrl: this.url,
                medicalCenter: this.medicalCenter,
                name: this.name
              });
              //Reset
              this.name = "";
              let input = $("#docsPDF");
              input.replaceWith(input.val('').clone(true));
          });
        });
      }
    })
  }

    getRecords(){
      this.db
        .list<any>('files', 
        ref => ref.orderByChild('medicalCenter')
        .equalTo(this.medicalCenter))
        .valueChanges().subscribe(data=>{
            this.records = data;
        });
    }

    delete(id){
      swal({
        title: '¿Estas seguro?',
        text: 'Una vez eliminado el documento, no hay vuelta atras',
        icon: 'warning',
        buttons: {
          cancel: true,
          confirm: true
        },
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            let itemRef = this.db.object(`files/${id}`);
            itemRef.remove();
            let ref = this.afStorage.ref(`files/${id}`);
            ref.delete();
          }
        });
    }
    //End
}