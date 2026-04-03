import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  openCV(): void {
  const cvUrl = 'assets/RahulCV_810.pdf';
  window.open(cvUrl, '_blank');
}

navLinks = [
    {link: '/' },
    {link: '/about' },
    {link: '/education' },
    {link: '/service' },
    {link: '/projects' },
    {link: '/contact' },
  ];
}
