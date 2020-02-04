import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PaymentsComponent} from './pages/payments/payments.component';
import {NotPaidComponent} from './pages/not-paid/not-paid.component';

const APP_ROUTES: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'payments', component: PaymentsComponent},
  { path: 'notPaid', component: NotPaidComponent},
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
