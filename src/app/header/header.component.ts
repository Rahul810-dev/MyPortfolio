import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SmoothScrollService } from '../core/smooth-scroll.service';
import { MagneticDirective } from '../core/magnetic.directive';

interface NavItem { label: string; id?: string; link?: string; }

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  name = '{ Rahul N }';
  isNavbarCollapsed = true;

  navLinks: NavItem[] = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Journey', id: 'journey' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Projects', link: '/projects' },
    { label: 'Contact', id: 'contact' },
  ];

  constructor(private router: Router, private smooth: SmoothScrollService) {}

  go(id: string): void {
    this.isNavbarCollapsed = true;
    const onHome = this.router.url.split(/[?#]/)[0] === '/';
    if (onHome) {
      this.smooth.scrollTo('#' + id);
      return;
    }
    // From another page: go home first, then scroll
    this.router.navigateByUrl('/').then(() => setTimeout(() => this.smooth.scrollTo('#' + id), 200));
  }
}
