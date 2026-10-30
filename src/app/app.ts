import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SmoothScrollService } from './core/smooth-scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit, OnDestroy {
  private cursorEl: HTMLElement | null = null;
  private targetX = -100;
  private targetY = -100;
  private currentX = -100;
  private currentY = -100;
  private targetScale = 1;
  private currentScale = 1;
  private rafId = 0;

  constructor(private zone: NgZone, private smooth: SmoothScrollService) {}

  private onMove = (e: MouseEvent): void => {
    this.targetX = e.clientX;
    this.targetY = e.clientY;
  };

  private onOver = (e: MouseEvent): void => {
    const el = e.target as HTMLElement | null;
    this.targetScale = el?.closest('a, button, .custom-slide-btn, .btn-grad') ? 2.2 : 1;
  };

  private animate = (): void => {
    this.currentX += (this.targetX - this.currentX) * 0.18;
    this.currentY += (this.targetY - this.currentY) * 0.18;
    this.currentScale += (this.targetScale - this.currentScale) * 0.15;

    if (this.cursorEl) {
      this.cursorEl.style.transform =
        `translate3d(${this.currentX}px, ${this.currentY}px, 0) ` +
        `translate(-50%, -50%) scale(${this.currentScale})`;
    }
    this.rafId = requestAnimationFrame(this.animate);
  };

  ngOnInit(): void {
    this.smooth.init(); // smooth scroll, runs on all devices

    this.cursorEl = document.getElementById('cursor');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!this.cursorEl || !finePointer) return;

    this.zone.runOutsideAngular(() => {
      document.addEventListener('mousemove', this.onMove);
      document.addEventListener('mouseover', this.onOver);
      this.animate();
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('mousemove', this.onMove);
    document.removeEventListener('mouseover', this.onOver);
    cancelAnimationFrame(this.rafId);
  }
}
