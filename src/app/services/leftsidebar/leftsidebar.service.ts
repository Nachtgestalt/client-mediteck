import { Injectable } from '@angular/core';

@Injectable()
export class LeftsidebarService {

  menu: any = [
    {
      titulo: 'Inicio',
      icono: 'zmdi zmdi-home',
      submenu: [
        {titulo: 'Dashboard', url: '/dashboard'}
      ]
    },
    {
      titulo: 'Medicos',
      icono: 'zmdi zmdi-account-add',
      submenu: [
        {titulo: 'Listar Medicos', url: '/medicos'},
        {titulo: 'Agregar Medico', url: '/agregar-medico'}
      ]
    },
    {
      titulo: 'Enfermeras',
      icono: 'zmdi zmdi-account-add',
      submenu: [
        {titulo: 'Listar Enfermeras', url: '/enfermeras'},
        {titulo: 'Agregar Enfermeras', url: '/agregar-enfermera'}
      ]
    },
    {
      titulo: 'Infraestructura',
      icono: 'zmdi zmdi-account-add',
      submenu: [
        {titulo: 'Agregar piso', url: '/agregar-piso'},
        {titulo: 'Agregar seccion', url: '/agregar-seccion'},
        {titulo: 'Listar pisos', url: '/pisos'},
        {titulo: 'Listar secciones', url: '/secciones'},
      ]
    },
    {
      titulo: 'Pacientes',
      icono: 'zmdi zmdi-account-add',
      submenu: [
        {titulo: 'Listar pacientes', url: '/pacientes'},
        {titulo: 'Agregar pacientes', url: '/agregar-paciente'}
      ]
    },
    {
      titulo: 'Consulta',
      icono: 'zmdi zmdi-account-add',
      submenu: [
        {titulo: 'Citas', url: '/cita'}, // Este modulo lo planeo manejar con tabs para listar y agregar citas
        {titulo: 'Historia clinica', url: '/historia-clinica'}, // Este modulo lo planeo manejar con tabs para consultar y agregar historias clinicas
        {titulo: 'Estudios y resultados', url: '/estudios'},
        {titulo: 'Notas', url: '/notas'}, // Este modulo lo planeo manejar con tabs para consultar y agregar notas
        {titulo: 'Cuadro clinico', url: '/cuadro-clinico'}, // Este modulo lo planeo manejar con tabs para consultar y agregar notas
        {titulo: 'Recetas de medicamentos', url: '/recetas-medicamentos'}, // Este modulo lo planeo manejar con tabs para consultar y agregar notas
        {titulo: 'Somatometría', url: '/somatometria'}, // Este modulo lo planeo manejar con tabs para consultar y agregar dependiendo del paciente
        {titulo: 'Alergias', url: '/alergias'}, // Este modulo lo planeo manejar con tabs para consultar y agregar dependiendo del paciente
        {titulo: 'Cartilla de vacunación', url: '/cartilla-vacunacion'}, // Este modulo lo planeo manejar con tabs para consultar y agregar dependiendo del paciente
        {titulo: 'Diagnnosticos', url: '/diagnosticos'}, // Este modulo lo planeo manejar con tabs para consultar y agregar dependiendo del paciente
      ]
    }
  ];

  constructor() { }


}