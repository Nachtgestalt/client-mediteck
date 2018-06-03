import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {DoctoresComponent} from './doctores/doctores.component';
import {AddDoctorComponent} from './doctores/add-doctor/add-doctor.component';
import {AddPatientsComponent} from './patients/add-patients/add-patients.component';
import {AddWarehouseComponent} from './warehouses/add-warehouse/add-warehouse.component';
import {WarehousesComponent} from './warehouses/warehouses.component';
import {AddNursesComponent} from './nurses/add-nurses/add-nurses.component';
import {NursesComponent} from './nurses/nurses.component';
import {MedicalHistoryComponent} from './medical-consultations/medical-history/medical-history.component';
import {NotesComponent} from './medical-consultations/notes/notes.component';
import {BedsXroomComponent} from './infrastructure/beds-xroom/beds-xroom.component';
import {NewMedicalConsultationComponent} from './medical-consultations/new-medical-consultation/new-medical-consultation.component'

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard', subtitle: 'Bienvenido'}},
      { path: 'medicos', component: DoctoresComponent, data: {titulo: 'Lista de Medicos', subtitle: 'Bienvenido'}},
      { path: 'agregar-medico', component: AddDoctorComponent, data: {titulo: 'Agregar Medico', subtitle: 'Bienvenido'}},
      { path: 'agregar-paciente', component: AddPatientsComponent, data: {titulo: 'Agregar Paciente', subtitle: 'Bienvenido'}},
      { path: 'agregar-almacen', component: AddWarehouseComponent, data: {titulo: 'Agregar Paciente', subtitle: 'Bienvenido'}},
      { path: 'almacenes', component: WarehousesComponent, data: {titulo: 'Agregar Paciente', subtitle: 'Bienvenido'}},
      { path: 'agregar-enfermera', component: AddNursesComponent, data: {titulo: 'Enfermeras', subtitle: 'Bienvenido'}},
      { path: 'lista_enfermeras', component: NursesComponent, data: {titulo: 'Listar Enfermeras', subtitle: 'Bienvenido'}},
      { path: 'historial_medico', component: MedicalHistoryComponent, data: {titulo: 'Historial Medico', subtitle: 'Bienvenido'}},
      { path: 'notas', component: NotesComponent, data: {titulo: 'Notas', subtitle: 'Bienvenido'}},
      { path: 'agregar_cama', component: BedsXroomComponent, data: {titulo: 'Agregar Camas', subtitle: 'Bienvenido'}},
      { path: 'nueva_consulta', component: NewMedicalConsultationComponent, data: {titulo: 'Nueva Consulta', subtitle: 'Bienvenido'}},
      { path: '', redirectTo: '/dashboard', pathMatch: 'full'},

    ]
  },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
