import { Directive, ElementRef, Input, NgZone, OnDestroy, OnInit } from '@angular/core';

@Directive({ selector: '[appTilt]', standalone: true })
export class TiltDirective implements OnInit, OnDestroy {
  @Input() appTilt: number | string = 6; // max tilt in degrees
  @Input() tiltGlare = true;

  private el: HTMLElement;
  private max = 6;
  private raf = 0;
  private last?: PointerEvent;

  constructor(ref: ElementRef<HTMLElement>, private zone: NgZone) {
    this.el = ref.nativeElement;
  }

  private onEnter = (): void => this.el.classList.add('is-active');

  private onMove = (e: PointerEvent): void => {
    this.last = e;
    if (!this.raf) this.raf = requestAnimationFrame(this.apply);
  };

  private apply = (): void => {
    this.raf = 0;
    const e = this.last;
    if (!e) return;
    const r = this.el.getBoundingClientRect();
    const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
    const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
    this.el.style.setProperty('--ry', `${(nx * this.max).toFixed(2)}deg`);
    this.el.style.setProperty('--rx', `${(-ny * this.max).toFixed(2)}deg`);
    this.el.style.setProperty('--mx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    this.el.style.setProperty('--my', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };

  private onLeave = (): void => {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.el.classList.remove('is-active');
    this.el.style.setProperty('--rx', '0deg');
    this.el.style.setProperty('--ry', '0deg');
  };

  ngOnInit(): void {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    this.max = Number(this.appTilt) || 6;
    this.el.classList.add('tilt');
    if (this.tiltGlare) this.el.classList.add('tilt-glare');

    this.zone.runOutsideAngular(() => {
      this.el.addEventListener('pointerenter', this.onEnter);
      this.el.addEventListener('pointermove', this.onMove);
      this.el.addEventListener('pointerleave', this.onLeave);
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.el.removeEventListener('pointerenter', this.onEnter);
    this.el.removeEventListener('pointermove', this.onMove);
    this.el.removeEventListener('pointerleave', this.onLeave);
  }
}
