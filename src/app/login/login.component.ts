import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user/user.service';
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;

  constructor(private router: Router,
              private _userService: UserService) { }

  ngOnInit() {
    init_plugins();
    this.formulario = new FormGroup({
      username: new FormControl('abednar@example.com', Validators.required ),
      password: new FormControl('secret', Validators.required)
    });
  }

  login() {
    let username = this.formulario.get('username').value;
    this._userService.auth(this.formulario.value)
      .subscribe(
        (resp: any) => {
          this._userService.setInStorage(resp);
          this._userService.getDataUser(username)
            .subscribe(
              res => {
                console.log();
              }
            );
          this.router.navigate(['/dashboard']);
        }
      );
  }

}
