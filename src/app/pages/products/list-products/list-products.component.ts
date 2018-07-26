import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  queryString = '';
  products: any = [];
  searchableList: any;

  constructor(private _productService: ProductService,
              public router: Router) { }

  ngOnInit() {
    this._productService.getProducts()
      .subscribe(
        res => {
          console.log(res);
        }
      );
  }

  loadData() {
    this._productService.getProducts()
      .subscribe(
        res => {
          console.log(res);
          this.products = res;
        }
      );
  }

  reload(cerrado) {
    if (cerrado) {
      this.loadData();
    }
  }



  delete(id) {
    swal({
      title: '¿Estas seguro?',
      text: 'Una vez eliminado el medico, no hay vuelta atras',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: true
      },
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          this._productService.deleteProduct(id)
            .subscribe(
              res => {
                swal('Medico eliminado exitosamente', {
                  icon: 'success',
                });
                this.reload(true);
              },
              error => {
                swal('Algo salio mal', 'No se pudo eliminar este medico', {
                  icon: 'error',
                });
              }
            );
        }
      });
  }

}
