import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements OnInit, OnDestroy {
  @Input() appReveal: string | number = 0; // optional delay in ms
  private io?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const node = this.el.nativeElement;
    node.classList.add('reveal');
    node.style.transitionDelay = `${Number(this.appReveal) || 0}ms`;

    this.io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('in');
          this.io?.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    this.io.observe(node);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }
}
