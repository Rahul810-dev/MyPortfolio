import { Directive, ElementRef, Input, NgZone, OnDestroy, OnInit } from '@angular/core';

@Directive({ selector: '[appMagnetic]', standalone: true })
export class MagneticDirective implements OnInit, OnDestroy {
  @Input() appMagnetic: number | string = 0.25; // pull strength

  private el: HTMLElement;
  private strength = 0.25;
  private tx = 0;
  private ty = 0;
  private cx = 0;
  private cy = 0;
  private raf = 0;

  constructor(ref: ElementRef<HTMLElement>, private zone: NgZone) {
    this.el = ref.nativeElement;
  }

  private loop = (): void => {
    this.cx += (this.tx - this.cx) * 0.18;
    this.cy += (this.ty - this.cy) * 0.18;
    this.el.style.transform = `translate3d(${this.cx.toFixed(2)}px, ${this.cy.toFixed(2)}px, 0)`;
    const settled = Math.abs(this.tx - this.cx) < 0.1 && Math.abs(this.ty - this.cy) < 0.1;
    this.raf = settled ? 0 : requestAnimationFrame(this.loop);
  };

  private kick(): void {
    if (!this.raf) this.raf = requestAnimationFrame(this.loop);
  }

  private onMove = (e: PointerEvent): void => {
    // Reset first so the measurement isn't skewed by the current offset
    const r = this.el.getBoundingClientRect();
    const cxPage = r.left + r.width / 2 - this.cx;
    const cyPage = r.top + r.height / 2 - this.cy;
    this.tx = (e.clientX - cxPage) * this.strength;
    this.ty = (e.clientY - cyPage) * this.strength;
    this.kick();
  };

  private onLeave = (): void => {
    this.tx = 0;
    this.ty = 0;
    this.kick();
  };

  ngOnInit(): void {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    this.strength = Number(this.appMagnetic) || 0.25;
    this.zone.runOutsideAngular(() => {
      this.el.addEventListener('pointermove', this.onMove);
      this.el.addEventListener('pointerleave', this.onLeave);
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.el.removeEventListener('pointermove', this.onMove);
    this.el.removeEventListener('pointerleave', this.onLeave);
  }
}
