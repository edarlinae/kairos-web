import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AgendaService } from '../../services/agenda.service';

export interface AgendaEvent {
  id: string;
  title: string;
  start: string;   // ISO
  end?: string;    // ISO
  location?: string;
  capacity?: number;
  spotsLeft?: number;
  type?: string;   // 'taller' | 'meditacion' | 'charla' | 'creatividad'...
}

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule, DatePipe, RouterLink],
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  events: AgendaEvent[] = [];
  filtered: AgendaEvent[] = [];

  // filtros UI
  periodo: 'todos' | 'mes-actual' | 'mes-siguiente' = 'todos';
  tipo: string = 'todos';
  query = '';

  constructor(private agenda: AgendaService) {}

  ngOnInit(): void {
    this.agenda.getAll().subscribe(evts => {
      this.events = evts;
      this.applyFilters();
    });
  }

  setPeriodo(p: 'todos' | 'mes-actual' | 'mes-siguiente') { this.periodo = p; this.applyFilters(); }
  setTipo(t: string) { this.tipo = t; this.applyFilters(); }
  onBuscar() { this.applyFilters(); }

  private applyFilters() {
    let list = [...this.events];

    // Periodo
    const now = new Date();
    const m = now.getMonth();
    const y = now.getFullYear();
    const next = new Date(y, m + 1, 1);
    const nm = next.getMonth(), ny = next.getFullYear();

    if (this.periodo !== 'todos') {
      list = list.filter(e => {
        const d = new Date(e.start);
        if (this.periodo === 'mes-actual') return d.getMonth() === m && d.getFullYear() === y;
        if (this.periodo === 'mes-siguiente') return d.getMonth() === nm && d.getFullYear() === ny;
        return true;
      });
    }

    // Tipo
    if (this.tipo !== 'todos') {
      list = list.filter(e => (e.type || '').toLowerCase() === this.tipo.toLowerCase());
    }

    // Búsqueda
    const q = this.query.trim().toLowerCase();
    if (q) {
      list = list.filter(e =>
        (e.title || '').toLowerCase().includes(q) ||
        (e.location || '').toLowerCase().includes(q)
      );
    }

    // Orden
    this.filtered = list.sort((a, b) => +new Date(a.start) - +new Date(b.start));
  }
}
