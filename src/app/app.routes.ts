import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },

  {
    path: 'inicio',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'servicios',
    loadComponent: () =>
      import('./pages/servicios/servicios.component').then(m => m.ServiciosComponent),
  },
  {
    path: 'agenda',
    loadComponent: () =>
      import('./pages/agenda/agenda.component').then(m => m.AgendaComponent),
  },
  // Deja estas rutas si ya existen; si no, puedes comentarlas sin problema.
  {
    path: 'comunidad',
    loadComponent: () =>
      import('./pages/comunidad/comunidad.component').then(m => m.ComunidadComponent),
  },
  {
    path: 'equipo',
    loadComponent: () =>
      import('./pages/equipo/equipo.component').then(m => m.EquipoComponent),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/blog/blog.component').then(m => m.BlogComponent),
  },

  // ✅ Contacto (para el botón Reservar)
  {
    path: 'contacto',
    loadComponent: () =>
      import('./pages/contacto/contacto.component').then(m => m.ContactoComponent),
  },

  // {
  //   path: 'legal',
  //   loadComponent: () =>
  //     import('./pages/legal/legal.component').then(m => m.LegalComponent),
  // },

  { path: '**', redirectTo: 'inicio' },
];
