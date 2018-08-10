import { Injectable } from '@angular/core';

@Injectable()
export class LeftsidebarService {

  menu: any = [
    {
      titulo: 'Inicio',
      icono: 'fas fa-home fa-2x',
      submenu: [
        {titulo: 'Dashboard', url: '/dashboard'}
      ]
    },
    {
      titulo: 'Documentos',
      icono: 'fas fa-copy fa-2x',
      submenu: [ 
        {titulo: 'Documentos y formatos', url: '/documents'}
      ]
    },
    {
      titulo: 'Urgencias',
      icono: 'fas fa-ambulance fa-2x',
      submenu: [ 
        {titulo: 'Pacientes en urgencias', url: '/patients_urgencias'}
      ]
    },
    {
      titulo: 'Médicos',
      icono: 'med-doctor',
      submenu: [
        {titulo: 'Listar Médicos', url: '/medicos'},
        {titulo: 'Agregar Médico', url: '/agregar-medico'}
      ]
    },
    {
      titulo: 'Enfermeras',
      icono: 'med-nurse-user',
      submenu: [
        {titulo: 'Listar Enfermeras', url: '/lista_enfermeras'},
        {titulo: 'Agregar Enfermeras', url: '/agregar-enfermera'},
        {titulo: 'Pacientes internados', url: '/pacientes-place'}
      ]
    },
    {
      titulo: 'Pacientes',
      icono: 'fas fa-user fa-2x',
      submenu: [
        {titulo: 'Listar pacientes', url: '/listar_pacientes'},
        {titulo: 'Agregar pacientes', url: '/agregar-paciente'}
      ]
    },
    {
      titulo: 'Infraestructura',
      icono: 'med-building',
      submenu: [
        {titulo: 'Agregar sección', url: '/agregar-seccion'},
        {titulo: 'Listar pisos', url: '/listar_pisos'},
        {titulo: 'Agregar Camas', url: '/agregar_cama'},
      ]
    },
    /*{
      titulo: 'Almacén',
      icono: 'fas fa-user-md fa-2x',
      submenu: [
        {titulo: 'Listar almacenes', url: '/almacenes'},
        {titulo: 'Agregar almacén', url: '/agregar-almacen'}
      ]
    },
    {
      titulo: 'Insumos',
      icono: 'fas fa-user-md fa-2x',
      submenu: [
        {titulo: 'Listar vacunas', url: '/vacunas'}
      ]
    },*/
    {
      titulo: 'Consulta',
      icono: 'fas fa-user-md fa-2x',
      submenu: [
        // {titulo: 'Nueva Consulta', url: '/consulta'}, // Este modulo lo planeo manejar con tabs para listar y agregar citas
        {titulo: 'Citas', url: '/cita'}, // Este modulo lo planeo manejar con tabs para listar y agregar citas
        {titulo: 'Historial Medico', url: '/historial_medico'}, // Este modulo lo planeo manejar con tabs para consultar y agregar historias clinicas
        {titulo: 'Estudios y resultados', url: '/estudios'},
        {titulo: 'Notas', url: '/notas'}, // Este modulo lo planeo manejar con tabs para consultar y agregar notas
        // {titulo: 'Cuadro clinico', url: '/cuadro-clinico'}, // Este modulo lo planeo manejar con tabs para consultar y agregar notas
        {titulo: 'Recetas de medicamentos', url: '/recetas-medicamentos'}, // Este modulo lo planeo manejar con tabs para consultar y agregar notas
        // {titulo: 'Somatometría', url: '/somatometria'}, // Este modulo lo planeo manejar con tabs para consultar y agregar dependiendo del paciente
        // {titulo: 'Alergias', url: '/alergias'}, // Este modulo lo planeo manejar con tabs para consultar y agregar dependiendo del paciente
        {titulo: 'Cartilla de vacunación', url: '/cartilla-vacunacion'}, // Este modulo lo planeo manejar con tabs para consultar y agregar dependiendo del paciente
        // {titulo: 'Diagnosticos', url: '/diagnosticos'}, // Este modulo lo planeo manejar con tabs para consultar y agregar dependiendo del paciente
      ]
    },
    /*{
      titulo: 'Productos',
      icono: 'med-pill',
      submenu: [
        {titulo: 'Agregar Productos', url: '/add_product'},
        {titulo: 'Listar Productos', url: '/list_product'}
      ]
    },*/
  ];

  constructor() { }


}
