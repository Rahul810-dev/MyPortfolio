import { Injectable, NgZone, OnDestroy } from '@angular/core';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({ providedIn: 'root' })
export class SmoothScrollService implements OnDestroy {
  private lenis?: Lenis;
  private tick = (time: number) => this.lenis?.raf(time * 1000);

  constructor(private zone: NgZone) {
    gsap.registerPlugin(ScrollTrigger);
  }

  init(): void {
    if (this.lenis) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.zone.runOutsideAngular(() => {
      this.lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      this.lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(this.tick);
      gsap.ticker.lagSmoothing(0);
    });
  }

  ngOnDestroy(): void {
    gsap.ticker.remove(this.tick);
    this.lenis?.destroy();
  }
}
