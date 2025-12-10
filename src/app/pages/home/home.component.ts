import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterLink, NgIf],
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  showHolidayPopup = false;

  ngOnInit(): void {
    const alreadyClosed = localStorage.getItem('holidayPopupClosed');

    // Mostrar entre 10 diciembre 2025 y 8 enero 2026
    const today = new Date();
    const start = new Date(2025, 11, 9); // 9 = diciembre
    const end = new Date(2026, 0, 8, 23, 59, 59); // 8 enero 2026

    if (!alreadyClosed && today >= start && today <= end) {
      this.showHolidayPopup = true;
    }
  }

  closeHolidayPopup(): void {
    this.showHolidayPopup = false;
    localStorage.setItem('holidayPopupClosed', 'true');
  }
}
