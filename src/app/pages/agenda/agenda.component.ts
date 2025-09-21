import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgendaService, AgendaEvent } from '../../services/agenda.service';

type Periodo = 'mes-actual' | 'mes-siguiente' | 'todos';
type Tipo = 'todos' | 'taller' | 'charla' | 'meditacion' | 'creatividad';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, FormsModule],
  styleUrls: ['./agenda.component.scss'],
  templateUrl: './agenda.component.html',
})
export class AgendaComponent implements OnInit {
  /** Datos */
  events: AgendaEvent[] = [];
  filtered: AgendaEvent[] = [];

  /** Estado UI filtros */
  query = '';
  periodo: Periodo = 'mes-actual';
  tipo: Tipo = 'todos';

  constructor(private agenda: AgendaService) {}

  ngOnInit(): void {
    this.agenda.getAll().subscribe((evts: AgendaEvent[]) => {
      this.events = evts;
      this.aplicarFiltros();
    });
  }

  // === Filtros ===
  setPeriodo(p: Periodo) {
    this.periodo = p;
    this.aplicarFiltros();
  }
  setTipo(t: Tipo) {
    this.tipo = t;
    this.aplicarFiltros();
  }
  onBuscar() {
    this.aplicarFiltros();
  }

  private aplicarFiltros() {
    const now = new Date();

    // Rango de fechas según periodo
    let start: Date | null = null;
    let end: Date | null = null;

    if (this.periodo === 'mes-actual') {
      start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    } else if (this.periodo === 'mes-siguiente') {
      start = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0);
      end = new Date(now.getFullYear(), now.getMonth() + 2, 0, 23, 59, 59);
    }

    const q = this.query.trim().toLowerCase();

    this.filtered = this.events
      .filter(e => {
        // Fecha
        const s = new Date(e.start);
        if (start && s < start) return false;
        if (end && s > end) return false;

        // Tipo
        if (this.tipo !== 'todos') {
          if ((e.type || '').toLowerCase() !== this.tipo) return false;
        }

        // Búsqueda
        if (q) {
          const texto = `${e.title} ${e.location ?? ''} ${e.type ?? ''}`.toLowerCase();
          if (!texto.includes(q)) return false;
        }

        return true;
      })
      .sort((a, b) => +new Date(a.start) - +new Date(b.start));
  }

  // Helper para chips activos
  isActive<T extends string>(current: T, value: T) {
    return current === value;
  }
}
