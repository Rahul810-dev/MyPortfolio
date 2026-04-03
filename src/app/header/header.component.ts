import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  name = "{ Rahul N }";
  isNavbarCollapsed = true;

  navLinks = [
    { label: 'Home', link: '/' },
    { label: 'About Me', link: '/about' },
    { label: 'Education', link: '/education' },
    { label: 'Achievements', link: '/projects' },
    { label: 'Contact', link: '/contact' },
  ];

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = 'assets/RahulCV_810.pdf';
    link.download = 'assets/RahulCV_810.pdf';
    link.target = '_blank';
    link.click();
  }
}

