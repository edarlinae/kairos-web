export interface AgendaEvent {
  id: string;
  title: string;
  start: string;   // ISO
  end?: string;    // ISO
  location?: string;
  capacity?: number;
  spotsLeft?: number;
  type?: string;
}
