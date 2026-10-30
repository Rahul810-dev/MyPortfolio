import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('root') root!: ElementRef<HTMLElement>;
  @ViewChild('vid') vid!: ElementRef<HTMLVideoElement>;

  videoReady = false;
  private ctx?: gsap.Context;
  private io?: IntersectionObserver;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const video = this.vid.nativeElement;
    video.muted = true; // required for autoplay

    if (reduce) return; // static hero for reduced-motion users

    // Play only while the hero is on screen (saves battery and CPU)
    video.play().catch(() => {});
    this.io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()),
      { threshold: 0.1 }
    );
    this.io.observe(video);

    // Intro animation
    this.zone.runOutsideAngular(() => {
      this.ctx = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('.hero-kicker', { y: 20, autoAlpha: 0, duration: 0.6 })
          .from('.line-inner', { yPercent: 110, duration: 0.9, stagger: 0.12 }, '-=0.3')
          .from('.hero-sub, .hero-actions', { y: 20, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, '-=0.4')
          .from('.hero-scroll', { autoAlpha: 0, duration: 0.6 }, '-=0.2');
      }, this.root.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
    this.ctx?.revert();
  }
}
