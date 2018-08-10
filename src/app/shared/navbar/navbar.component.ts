import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user/user.service';
import { Router } from '@angular/router'
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  path = '';
  constructor( public _userService: UserService, private router: Router, private location: Location ) {
    this.router.events.subscribe((val) => {
      this.path = this.location.path();
    });
   }

  ngOnInit() {
  }

}
