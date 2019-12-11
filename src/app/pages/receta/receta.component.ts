import {Component, OnInit} from '@angular/core';
import {RecetasService} from '../../services/recetas/recetas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent {

  recetas: any;
  user: any = localStorage.getItem('user');

  constructor(
    private _recetas: RecetasService
  ) {
    Swal.showLoading();
    this.user = JSON.parse(this.user);
    this._recetas.getRecetas(this.user.id).subscribe(
      response => {
        this.recetas = response;
        Swal.close();
      },
    error => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'el servicio no esta disponible en este momento, intente mas tarde'
      });
    }
  );
   }


}
