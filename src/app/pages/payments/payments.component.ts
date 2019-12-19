import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CONEKTA_PUBLIC_KEY, URL_SERVICIOS} from '../../config/config';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

declare function init_plugins();

let Conekta;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})

export class PaymentsComponent implements OnInit {

  form: FormGroup;

  //Views
  card = false;
  buttons = false;

  //Internal
  id: any;
  allPlans: Observable<any>;
  plans: any;
  plan: any;

  constructor(public http: HttpClient) {

    this.form = new FormGroup(
      {
        typePlan: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        numberCard: new FormControl('', [Validators.required]),
        exp_year: new FormControl('', [Validators.required]),
        exp_month: new FormControl('', [Validators.required]),
        ccv: new FormControl('', [Validators.required]),
        street1: new FormControl('', [Validators.required]),
        street2: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        zipcode: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
      },
    );

    this.id = localStorage.getItem('idSuscripcion');
    this.allPlans = this.http.get(`${URL_SERVICIOS}/planc`);
    this.allPlans
      .subscribe(data => {
        this.plans = data;
      });
  }

  ngOnInit() {
    init_plugins();
  }

  paymentCard() {
    this.buttons = false;
    this.card = true;
  }

  showButtons() {
    this.buttons = true;
    this.card = false;
  }

  payment(data: any) {

    Conekta.setPublicKey(CONEKTA_PUBLIC_KEY);

    const number = Conekta.card.validateNumber(data.numberCard);
    const exp = Conekta.card.validateExpirationDate(data.exp_month, data.exp_year);
    const cvc = Conekta.card.validateCVC(data.ccv);

    if (!(number && exp && cvc === true)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Los datos de la tarjeta no son validos'
      });
      return;
    }

    const tokenParams = {
      'card': {
        'number': data.numberCard,
        'name': data.name,
        'exp_year': data.exp_year,
        'exp_month': data.exp_month,
        'ccv': data.ccv,
        'address': {
          'street1': data.street1,
          'street2': data.street2,
          'city': data.city,
          'state': data.state,
          'zip': data.zipcode,
          'country': data.country
        }
      }
    };

    Conekta.Token.create(tokenParams, this.successResponseHandler.bind(this), this.errorResponseHandler.bind(this));
  }

  errorResponseHandler(error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'el servicio no esta disponible por el momento '
    });
    console.error(error);
  }

  successResponseHandler (token) {
    this.http.post(
      `${URL_SERVICIOS}/addSuscripcion`,
      {
        'user': this.id,
        'plan': this.plan,
        'token_card': token
      })
      .subscribe(
        data => {
          console.log(data);
          Swal.fire(
            {
              icon: 'success',
              title: 'Operación éxitosa',
              text: 'Se pago correctamente, su suscripción se renovo!'
            }
          );
        }, error => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'el servicio no esta disponible por el momento '
          });
        }
      );
  }

  submit() {
    this.payment(this.form.value);
  }

  cancel() {
    this.buttons = true;
    this.card = false;
  }

  paymentOxxo() {
    Swal.showLoading();
    this.card = false;

    this.http.post(
      `${URL_SERVICIOS}/pagoOXXO`,
      {
        'suscripcion': this.id,
        'plan': (this.form.value).typePlan.id
      })
      .subscribe(
        response => {
          console.log(response);
          Swal.fire(
            {
              icon: 'success',
              title: 'Operación éxitosa',
              text: 'Se genero el recibo, le llegara a su correo, deberá pagar en cualquier oxxo y el sistema activará su cuenta'
            }
          );
        }, error => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'el servicio no esta disponible por el momento '
          });
        }
      );
  }

  paymentSPEI() {
    Swal.showLoading();
    this.card = false;
    this.http.post(
      `${URL_SERVICIOS}/pagoSPEI`,
      {
        'suscripcion': this.id,
        'plan': (this.form.value).typePlan.id
      })
      .subscribe(
        response => {
          console.log(response);
          Swal.fire(
            {
              icon: 'success',
              title: 'Operación éxitosa',
              text: 'Se genero el recibo, le llegara a su correo, deberá pagar en cualquier oxxo y el sistema activará su cuenta'
            }
          );
        }, error => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'el servicio no esta disponible por el momento '
          });
        }
      );
  }
}
