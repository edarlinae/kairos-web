import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AgendaService, AgendaCardVM } from '../../services/agenda.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, RouterLink],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent {
  upcoming$: Observable<AgendaCardVM[]> = this.agenda.getUpcoming(3);

  // FAQ
  openIndex = -1;
  toggleFaq(i: number) { this.openIndex = this.openIndex === i ? -1 : i; }

  constructor(private agenda: AgendaService) {}

  trackById = (_: number, e: AgendaCardVM) => e.id;
}
