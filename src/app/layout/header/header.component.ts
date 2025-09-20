import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  logoUrl = '/assets/logoKairos.png';
  menuOpen = false;

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  closeMenu()  { this.menuOpen = false; }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 980 && this.menuOpen) this.menuOpen = false;
  }
}
