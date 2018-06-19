import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  products = [];

  constructor( private _productService: ProductService) { }

  ngOnInit() {
    this._productService.getProducts()
      .subscribe(
        res => {
          console.log(res);
        }
      );
  }

}
