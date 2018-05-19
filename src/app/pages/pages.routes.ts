import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {DoctoresComponent} from './doctores/doctores.component';
import {AddDoctorComponent} from './doctores/add-doctor/add-doctor.component';
import {AddPatientsComponent} from './patients/add-patients/add-patients.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard', subtitle: 'Bienvenido'}},
      { path: 'medicos', component: DoctoresComponent, data: {titulo: 'Lista de Medicos', subtitle: 'Bienvenido'}},
      { path: 'agregar-medico', component: AddDoctorComponent, data: {titulo: 'Agregar Medico', subtitle: 'Bienvenido'}},
      { path: 'agregar-paciente', component: AddPatientsComponent, data: {titulo: 'Agregar Paciente', subtitle: 'Bienvenido'}},
      { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
  },

];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
