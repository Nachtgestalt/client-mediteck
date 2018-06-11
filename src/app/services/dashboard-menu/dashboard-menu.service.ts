import { Injectable } from '@angular/core';

@Injectable()
export class DashboardMenuService {

  menu: any = [
    {
      title: 'Inicio',
      icon: 'zmdi zmdi-home'
    },
    {
      title: 'Médicos',
      icon: 'zmdi zmdi-home'
    },
    {
      title: 'Enfermeras',
      icon: 'zmdi zmdi-home'
    },
    {
      title: 'Pacientes',
      icon: 'zmdi zmdi-home'
    }
  ];

}
