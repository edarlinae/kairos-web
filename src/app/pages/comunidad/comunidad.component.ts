import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-comunidad',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.scss'],
})
export class ComunidadComponent {
  // Usamos directamente el asset correcto
  logo = '/assets/logoKairos.png';

  pasos = [
    {
      n: 1,
      t: 'Elige tu acceso',
      d: 'Tú eliges la comunidad online que más se adapte a tus necesidades y objetivos.',
    },
    {
      n: 2,
      t: 'Empieza tu camino',
      d: 'Empieza con la comunidad online que más te interese.',
    },
    {
      n: 3,
      t: 'Avanza acompañado',
      d: 'Recursos, recordatorios y apoyo de la comunidad y nuestro equipo profesional.',
    },
  ];
}
