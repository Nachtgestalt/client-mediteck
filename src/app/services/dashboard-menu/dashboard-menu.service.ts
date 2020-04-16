import {Injectable} from '@angular/core';

@Injectable()
export class DashboardMenuService {

  menu: any = [
    {
      title: 'Inicio',
      icon: 'zmdi zmdi-home',
      url: './'
    },
    {
      title: 'Médicos',
      icon: 'zmdi zmdi-home',
      url: '/medicos'
    },
    {
      title: 'Enfermeras',
      icon: 'zmdi zmdi-home',
      url: '/lista_enfermeras'
    },
    {
      title: 'Pacientes',
      icon: 'zmdi zmdi-home',
      url: '/pacientes-place'
    }
  ];

}
