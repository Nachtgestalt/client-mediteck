import { Component, OnInit } from '@angular/core';
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
              public _title: Title) { }

  ngOnInit() {
    this._title.setTitle('Bienvenido a Clinitec');
    init_plugins();
    this.formulario = new FormGroup({
      username: new FormControl('pagac.pedro@example.com', Validators.required ),
      password: new FormControl('secret', Validators.required)
    });
  }

  login() {
    const username = this.formulario.get('username').value;
    this._userService.auth(this.formulario.value)
      .subscribe(
        (resp: any) => {
          this._userService.setTokenInStorage(resp);
          this._userService.getDataUser(username)
            .subscribe(
              (res: any) => {
                const usuario = res.Usuario;
                this._userService.setInStorage(usuario);
                this.router.navigate(['/dashboard']);
                console.log(res);
              }
            );
        },
        error1 => {
          console.log(error1);
          swal('Error al iniciar sesión', 'Usuario y/o contraseña invalido', 'error');
        }
      );
  }

}
