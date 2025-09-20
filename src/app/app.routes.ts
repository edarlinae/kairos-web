import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Kairós · Inicio' },

  {
    path: 'servicios',
    loadComponent: () =>
      import('./pages/servicios/servicios.component').then(m => m.ServiciosComponent),
    title: 'Servicios',
  },
  {
    path: 'agenda',
    loadComponent: () =>
      import('./pages/agenda/agenda.component').then(m => m.AgendaComponent),
    title: 'Agenda y Reservas',
  },
  {
    path: 'comunidad',
    loadComponent: () =>
      import('./pages/comunidad/comunidad.component').then(m => m.ComunidadComponent),
    title: 'Comunidad',
  },
  {
    path: 'equipo',
    loadComponent: () =>
      import('./pages/equipo/equipo.component').then(m => m.EquipoComponent),
    title: 'Equipo',
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/blog/blog.component').then(m => m.BlogComponent),
    title: 'Blog',
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./pages/contacto/contacto.component').then(m => m.ContactoComponent),
    title: 'Contacto',
  },
  {
    path: 'legal/aviso',
    loadComponent: () =>
      import('./pages/legal/aviso.component').then(m => m.AvisoComponent),
    title: 'Aviso legal',
  },
  {
    path: 'legal/privacidad',
    loadComponent: () =>
      import('./pages/legal/privacidad.component').then(m => m.PrivacidadComponent),
    title: 'Privacidad',
  },

  { path: '**', redirectTo: '' },
];
