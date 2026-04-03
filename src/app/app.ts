
import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    FormComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit, OnDestroy {
  private cursorEl!: HTMLElement;
  private mouseMoveListener!: () => void;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Find the custom cursor element
    this.cursorEl = document.getElementById('cursor') as HTMLElement;

    // Listen to mouse move
    this.mouseMoveListener = this.renderer.listen('document', 'mousemove', (event: MouseEvent) => {
      // Move main cursor
      if (this.cursorEl) {
        this.cursorEl.style.left = `${event.clientX}px`;
        this.cursorEl.style.top = `${event.clientY}px`;
      }

      // Create trailing dot
      const trail = this.renderer.createElement('div');
      this.renderer.addClass(trail, 'trail');
      this.renderer.setStyle(trail, 'left', `${event.clientX}px`);
      this.renderer.setStyle(trail, 'top', `${event.clientY + 20}px`);
      document.body.appendChild(trail);

      // Remove after animation
      setTimeout(() => {
        if (trail && trail.parentNode) {
          trail.remove();
        }
      }, 600);
    });
  }

  ngOnDestroy(): void {
    // Clean up listener
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
    }
  }
}

