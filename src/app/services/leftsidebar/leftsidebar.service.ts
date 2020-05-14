import {Injectable} from '@angular/core';

@Injectable()
export class LeftsidebarService {

  menu: any = [
    {
      titulo: 'Inicio',
      icono: 'fas fa-home fa-2x',
      number: 1,
      submenu: [
        {titulo: 'Dashboard', subNumber: 1, url: '/dashboard'}
      ]
    },
    {
      titulo: 'Documentos',
      icono: 'fas fa-copy fa-2x',
      number: 2,
      submenu: [
        {titulo: 'Documentos y formatos', subNumber: 1, url: '/documents'}
      ]
    },
    {
      titulo: 'Urgencias',
      icono: 'fas fa-ambulance fa-2x',
      number: 3,
      submenu: [
        {titulo: 'Pacientes en urgencias', subNumber: 1, url: '/patients_urgencias'}
      ]
    },
    {
      titulo: 'Médicos',
      icono: 'med-doctor',
      number: 4,
      submenu: [
        {titulo: 'Listar Médicos', subNumber: 1, url: '/medicos'},
        {titulo: 'Agregar Médico', subNumber: 9, url: '/agregar-medico'}
      ]
    },
    {
      titulo: 'Enfermeras',
      icono: 'med-nurse-user',
      number: 5,
      submenu: [
        {titulo: 'Listar Enfermeras', subNumber: 10, url: '/lista_enfermeras'},
        {titulo: 'Agregar Enfermeras', subNumber: 11, url: '/agregar-enfermera'},
      ]
    },
    {
      titulo: 'Pacientes',
      icono: 'fas fa-user fa-2x',
      number: 6,
      submenu: [
        {titulo: 'Listar pacientes', subNumber: 1, url: '/listar_pacientes'},
        {titulo: 'Agregar pacientes', subNumber: 1, url: '/agregar-paciente'},
        {titulo: 'Pacientes internados', subNumber: 1, url: '/pacientes-place'}
      ]
    },
    {
      titulo: 'Infraestructura',
      icono: 'med-building',
      number: 7,
      submenu: [
        {titulo: 'Agregar sección', subNumber: 12, url: '/agregar-seccion'},
        {titulo: 'Listar pisos', subNumber: 13, url: '/listar_pisos'},
        {titulo: 'Agregar Camas', subNumber: 14, url: '/agregar_cama'},
      ]
    },
    {
      titulo: 'Consulta',
      icono: 'fas fa-user-md fa-2x',
      number: 8,
      submenu: [
        {titulo: 'Citas', subNumber: 1, url: '/cita'},
      ]
    },

    {
      titulo: 'Recetas',
      icono: 'far fa-id-card fa-2x',
      number: 9,
      submenu: [
        {titulo: 'Ultimas recetas', subNumber: 1, url: '/receta'},
      ]
    }
  ];

  constructor() {
  }


}
