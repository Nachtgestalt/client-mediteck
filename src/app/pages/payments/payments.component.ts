import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CONEKTA_PUBLIC_KEY, URL_SERVICIOS } from '../../config/config';

let Conekta;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})

export class PaymentsComponent implements OnInit {
  //Views
  card = false;
  buttons = false;

  //Form Card
  number: number;
  name: string;
  exp_year: string;
  exp_month: string;
  cvc: number;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: number;
  country: string;

  //Internal
  id: any;
  allPlans: Observable<any>;
  plans: any;
  plan: any;

  constructor(public http: HttpClient) {
      const tmp = JSON.parse(localStorage.getItem('user'));
      this.id = tmp.idUser;

      this.allPlans = this.http.get(`${URL_SERVICIOS}/planc`);

      this.allPlans
      .subscribe(data => {
         this.plans = data;
      });
  }

  ngOnInit() {}

  paymentMethod(method) {
      switch (method) {
          case 'Card':
              this.card = true;
              break;
          case 'Oxxo':
              this.card = false;

              //Pay with Oxxo
              const au = {
                'user': this.id,
                'plan': this.plan
              };

              this.http.post(`${URL_SERVICIOS}/pagoOXXO`, au)
              .subscribe(data => {
                console.log(data);
                swal(':)', 'Referencia generada con éxito', 'success');
               }, error => {
                console.log(error);
                swal('¡Error! :(', 'Inténtelo de nuevo', 'error');
               }
              );
              break;
          case 'SPEI':
              this.card = false;

              //Pay with SPEI
              const ere = {
                  'user': this.id,
                  'plan': this.plan
              };

              this.http.post(`${URL_SERVICIOS}/pagoSPEI`, ere)
              .subscribe(
                data => {
                    console.log(data);
                    swal(':)', 'Referencia generada con éxito', 'success');
                }, error => {
                    console.log(error);
                    swal('¡Error! :(', 'Inténtelo de nuevo', 'error');
                }
              );
              break;
      }
  }

  showButtons() {
      this.buttons = true;
  }

  payment() {
    Conekta.setPublicKey(CONEKTA_PUBLIC_KEY);

    const number = Conekta.card.validateNumber(this.number);
    const exp = Conekta.card.validateExpirationDate(this.exp_month, this.exp_year);
    const cvc = Conekta.card.validateCVC(this.cvc);

    if (!(number && exp && cvc == true)) {
      swal('Datos de la tarjeta no válidos', ':(', 'error');
      return 1;
    }

    const tokenParams = {
        'card': {
            'number': this.number,
            'name': this.name,
            'exp_year': this.exp_year,
            'exp_month': this.exp_month,
            'cvc': this.cvc,
            'address': {
                'street1': this.street1,
                'street2': this.street2,
                'city': this.city,
                'state': this.state,
                'zip': this.zip,
                'country': this.country
            }
        }
    };

    const successResponseHandler = function(token) {
        const info = {
            'user': this.id,
            'plan': this.plan,
            'token_card': token
        };

        this.http.post(`${URL_SERVICIOS}/addSuscripcion`, info)
        .subscribe(
          data => {
           console.log(data);
           swal(':)', 'Pago realizado con éxito', 'success');
          }, error => {
            console.log(error);
            swal('¡Error! :(', 'Inténtelo de nuevo', 'error');
          }
        );
    };

    const errorResponseHandler = function(error) {
        swal('¡Opps! ocurrio algún error', ':(', 'error');
        console.error(error);
    };

    Conekta.Token.create(tokenParams, successResponseHandler, errorResponseHandler);
  }

}
