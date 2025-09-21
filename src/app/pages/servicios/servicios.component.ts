import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { AgendaService, AgendaEvent } from '../../services/agenda.service';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, DatePipe],
  styleUrls: ['./servicios.component.scss'],
  templateUrl: './servicios.component.html',
})
export class ServiciosComponent implements OnInit {
  faqs = [
    { q: '¿Necesito experiencia previa en yoga, meditación o dinámicas de grupo?', a: 'No, todo está pensado para principiantes y adaptamos cada actividad al ritmo de cada persona.' },
    { q: '¿Qué diferencia hay entre los talleres presenciales y la comunidad digital?', a: 'Los talleres son experiencias prácticas en grupo reducido, mientras que la comunidad digital es un espacio de apoyo continuo con recursos, retos y acompañamiento online.' },
    { q: '¿Puedo asistir solo a un taller puntual sin unirme a la comunidad?', a: 'Sí, los talleres se reservan de forma independiente. La comunidad es opcional y complementa el trabajo presencial.' },
    { q: '¿Cómo reservo plaza?', a: 'Desde la sección de Agenda puedes ver fechas, plazas disponibles y confirmar tu asistencia de forma sencilla.' },
    { q: '¿Qué necesito llevar a los talleres?', a: 'Nada especial: ropa cómoda. El material lo ponemos nosotros.' },
    { q: '¿Qué pasa si no puedo asistir después de reservar?', a: 'Puedes cancelar avisando con 48h de antelación y te guardamos la plaza para otra fecha.' }
  ];

  openIndex: number | null = null;
  toggleFaq(i: number) { this.openIndex = this.openIndex === i ? null : i; }

  upcoming: AgendaEvent[] = [];

  constructor(private agenda: AgendaService) {}

  ngOnInit(): void {
    this.agenda.getUpcoming(3).subscribe((evts: AgendaEvent[]) => {
      this.upcoming = evts;
    });
  }
}
