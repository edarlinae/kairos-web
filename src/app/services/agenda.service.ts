import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

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

@Injectable({ providedIn: 'root' })
export class AgendaService {
  private url = 'assets/agenda.json';
  constructor(private http: HttpClient) {}

  getAll(): Observable<AgendaEvent[]> {
    return this.http.get<AgendaEvent[]>(this.url).pipe(
      map(events => events.slice().sort((a, b) => +new Date(a.start) - +new Date(b.start)))
    );
  }

  getUpcoming(limit = 3): Observable<AgendaEvent[]> {
    const now = new Date().toISOString();
    return this.getAll().pipe(
      map(events => events.filter(e => e.start >= now).slice(0, limit))
    );
  }
}
