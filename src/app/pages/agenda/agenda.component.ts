import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AgendaService, AgendaCardVM } from '../../services/agenda.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, shareReplay } from 'rxjs/operators';

type Periodo = 'mes-actual' | 'mes-siguiente' | 'todos';
type Tipo = 'todos' | 'taller' | 'meditacion' | 'charla' | 'creatividad';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf, RouterLink],
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent {
  // Filtros (estado)
  private periodo$ = new BehaviorSubject<Periodo>('todos');
  private tipo$    = new BehaviorSubject<Tipo>('todos');
  query = '';
  private query$   = new BehaviorSubject<string>('');

  // VM final (lista ya preparada para pintar de una sola vez)
  readonly vm$ = combineLatest([
    this.agenda.getAll(), // ya es AgendaCardVM[]
    this.periodo$,
    this.tipo$,
    this.query$.pipe(debounceTime(0), distinctUntilChanged())
  ]).pipe(
    map(([all, periodo, tipo, q]) => {
      let list = [...all];
      list = this.agenda.filterByPeriodo(list, periodo);
      list = this.agenda.filterByTipo(list, tipo);
      q = q.trim().toLowerCase();
      if (q) list = list.filter(e =>
        e.title.toLowerCase().includes(q) ||
        (e.location ?? '').toLowerCase().includes(q)
      );
      return { list };
    }),
    shareReplay(1)
  );

  constructor(private agenda: AgendaService) {}

  setPeriodo(p: Periodo) { this.periodo$.next(p); }
  setTipo(t: Tipo)       { this.tipo$.next(t); }
  onBuscar()             { this.query$.next(this.query); }

  trackById = (_: number, e: AgendaCardVM) => e.id;
}
