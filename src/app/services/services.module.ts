import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {LeftsidebarService} from './leftsidebar/leftsidebar.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LeftsidebarService
  ],
  declarations: []
})
export class ServicesModule { }
