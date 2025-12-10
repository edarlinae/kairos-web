import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterLink, NgIf],
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  // 👇 Esta variable estática recuerda si ya se mostró el popup
  private static popupShownThisSession = false;

  showHolidayPopup = false;

  constructor() {
    if (
      this.isWithinHolidayRange() &&
      this.isPageLoadOrReload() &&
      !HomeComponent.popupShownThisSession
    ) {
      this.showHolidayPopup = true;
      HomeComponent.popupShownThisSession = true; // 👈 marcamos como mostrado
    }
  }

  closeHolidayPopup(): void {
    this.showHolidayPopup = false;
  }

  /**
   * Devuelve true si la fecha actual está entre:
   *  - 9 de diciembre
   *  - 8 de enero
   * (ambos inclusive, sirve para cualquier año)
   */
  private isWithinHolidayRange(): boolean {
    const now = new Date();
    const month = now.getMonth() + 1; // 1–12
    const day = now.getDate();

    const isInDecemberRange = month === 12 && day >= 9;
    const isInJanuaryRange = month === 1 && day <= 8;

    return isInDecemberRange || isInJanuaryRange;
  }

  /**
   * Devuelve true si la entrada en la página es por
   * navegación normal o recarga, pero NO por back/forward.
   */
  private isPageLoadOrReload(): boolean {
    try {
      const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navEntries && navEntries.length > 0) {
        const type = navEntries[0].type;
        // 'navigate' = entrar a la web, 'reload' = recargar
        // 'back_forward' = atrás/adelante del navegador
        return type === 'navigate' || type === 'reload';
      }

      const navAny = performance as any;
      if (navAny.navigation && typeof navAny.navigation.type !== 'undefined') {
        // 0: navigate, 1: reload, 2: back_forward
        return navAny.navigation.type === 0 || navAny.navigation.type === 1;
      }
    } catch {
      // Si algo falla, preferimos mostrarlo
      return true;
    }

    return true;
  }
}
