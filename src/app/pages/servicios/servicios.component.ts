import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AgendaService } from '../../services/agenda.service';

export interface AgendaEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  location?: string;
  capacity?: number;
  spotsLeft?: number;
  type?: string;
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, DatePipe, RouterLink],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {
  upcoming: AgendaEvent[] = [];
  openIndex = -1; // acordeón FAQ

  constructor(private agenda: AgendaService) {}

  ngOnInit(): void {
    this.agenda.getUpcoming(3).subscribe(evts => (this.upcoming = evts));
  }

  toggleFaq(i: number) {
    this.openIndex = this.openIndex === i ? -1 : i;
  }
}
