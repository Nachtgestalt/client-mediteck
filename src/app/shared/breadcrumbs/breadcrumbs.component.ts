import { Component, OnInit } from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  lbltitle: string = '';
  lblSubtitle = '';
  breadcrumbs: any;

  constructor(private router: Router,
              public _title: Title) {
    this.getDataRoute()
      .subscribe( data => {
        this.breadcrumbs = data;
        this.lbltitle = data.titulo;
        this.lblSubtitle = data.subtitle
        this._title.setTitle(`Clinitec - ${this.lbltitle}`);
      });
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events
      .filter( evento => evento instanceof ActivationEnd)
      .filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null)
      .map((evento: ActivationEnd) => evento.snapshot.data);
  }
}
