import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user/user.service';
import {Title} from '@angular/platform-browser';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;

  constructor(private router: Router,
              private _userService: UserService,
              public _title: Title) {
  }

  ngOnInit() {
    this._title.setTitle('Bienvenido a Clinitec');
    init_plugins();
    this.formulario = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    // this.router.navigate(['/dashboard']);
    const username = this.formulario.get('username').value;
    this._userService.auth(this.formulario.value)
      .subscribe(
        (resp: any) => {
          console.log(resp);
          this._userService.setTokenInStorage(resp);
          this._userService.setUsername(username);
          this._userService.getDataUser(username)
            .subscribe(
              (res: any) => {
                const usuario = res.Usuario;
                const menu = res.Menu;
                const idSuscripcion = res.Suscripcion.id;
                this._userService.setInStorage(usuario, menu, idSuscripcion);
                this.router.navigate(['/dashboard']);
                console.log(res);
              },
              error1 => {
                console.log(error1);
              }
            );
        },
        error1 => {
          console.log('ERROR LOGIN --> ', error1);
          if (error1.status !== 444) {
            swal('Error al iniciar sesión', 'Usuario y/o contraseña invalido', 'error');
          }
        }
      );
  }

}
