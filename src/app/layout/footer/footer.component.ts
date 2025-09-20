import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  // Contacto
  phone = '645774871';
  phoneHref = 'tel:+34645774871';

  email = 'gabinetekairos@gmail.com';
  emailHref = 'mailto:gabinetekairos@gmail.com';
}
