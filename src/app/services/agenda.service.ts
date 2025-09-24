import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

export interface AgendaEvent {
  id: string;
  title: string;
  start: string;   // ISO
  end?: string;    // ISO
  location?: string;
  capacity?: number;
  spotsLeft?: number;
  type?: 'taller' | 'meditacion' | 'charla' | 'creatividad' | string;
}

/** View-model ya formateado para pintar de una sola vez */
export interface AgendaCardVM {
  id: string;
  title: string;
  startISO: string;
  endISO?: string;
  location?: string;
  spotsLeft?: number;
  type?: string;

  startDay: string;   // '08'
  startMon: string;   // 'nov'
  dateLine: string;   // 'vie 8 nov · 18:30 – 19:30'
}

@Injectable({ providedIn: 'root' })
export class AgendaService {
  private http = inject(HttpClient);
  private readonly url = 'assets/agenda.json';
  private readonly headers = new HttpHeaders({
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  });

  // Formatters (Intl es síncrono, no depende de pipes)
  private fmtDay     = new Intl.DateTimeFormat('es-ES', { day: '2-digit' });
  private fmtMon     = new Intl.DateTimeFormat('es-ES', { month: 'short' });
  private fmtDate    = new Intl.DateTimeFormat('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
  private fmtTime    = new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit' });

  private readonly events$: Observable<AgendaCardVM[]> = this.http
    .get<AgendaEvent[]>(this.url, { headers: this.headers })
    .pipe(
      map(list => Array.isArray(list) ? list : []),
      map(list =>
        list
          .map(e => this.normalize(e))
          .filter(e => !!e.id && !!e.title && !!e.start)
          .sort((a, b) => +new Date(a.start) - +new Date(b.start))
          .map(e => this.toVM(e)) // <-- aquí queda listo el view-model
      ),
      catchError(() => of([])),
      shareReplay(1) // cachea en memoria
    );

  /** Todos los eventos (VM) */
  getAll(): Observable<AgendaCardVM[]> {
    return this.events$;
  }

  /** Próximos (VM) */
  getUpcoming(limit?: number): Observable<AgendaCardVM[]> {
    const now = new Date();
    return this.events$.pipe(
      map(list => list.filter(e => new Date(e.startISO) >= now)),
      map(list => limit ? list.slice(0, limit) : list)
    );
  }

  // Helpers de filtrado (sobre VM)
  filterByPeriodo(list: AgendaCardVM[], periodo: 'mes-actual' | 'mes-siguiente' | 'todos'): AgendaCardVM[] {
    if (periodo === 'todos') return list;
    const today = new Date();
    const base = periodo === 'mes-actual'
      ? new Date(today.getFullYear(), today.getMonth(), 1)
      : new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const next = new Date(base.getFullYear(), base.getMonth() + 1, 1);
    return list.filter(e => {
      const d = new Date(e.startISO);
      return d >= base && d < next;
    });
  }

  filterByTipo(list: AgendaCardVM[], tipo: string): AgendaCardVM[] {
    if (tipo === 'todos') return list;
    return list.filter(e => (e.type || '').toLowerCase() === tipo);
  }

  // --- privados ---
  private normalize(e: Partial<AgendaEvent>): AgendaEvent {
    return {
      id: (e.id ?? '').toString().trim(),
      title: (e.title ?? '').toString().trim(),
      start: (e.start ?? '').toString().trim(),
      end: (e.end ?? '') ? (e.end as string).trim() : undefined,
      location: (e.location ?? '') ? (e.location as string).trim() : undefined,
      capacity: typeof e.capacity === 'number' ? e.capacity : undefined,
      spotsLeft: typeof e.spotsLeft === 'number' ? e.spotsLeft : undefined,
      type: (e.type ?? '') ? (e.type as string).trim() : undefined,
    };
  }

  private toVM(e: AgendaEvent): AgendaCardVM {
    const dStart = new Date(e.start);
    const dEnd   = e.end ? new Date(e.end) : undefined;

    const day  = this.fmtDay.format(dStart);
    const mon  = this.fmtMon.format(dStart);
    const date = this.fmtDate.format(dStart);
    const h1   = this.fmtTime.format(dStart);
    const h2   = dEnd ? this.fmtTime.format(dEnd) : '';

    const dateLine = h2 ? `${date} · ${h1} – ${h2}` : `${date} · ${h1}`;

    return {
      id: e.id,
      title: e.title,
      startISO: e.start,
      endISO: e.end,
      location: e.location,
      spotsLeft: e.spotsLeft,
      type: e.type,
      startDay: day,
      startMon: mon,
      dateLine,
    };
  }
}
