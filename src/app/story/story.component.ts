import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-story',
  standalone: true,
  templateUrl: './story.component.html',
  styleUrl: './story.component.css',
})
export class StoryComponent implements AfterViewInit, OnDestroy {
  @ViewChild('root') root!: ElementRef<HTMLElement>;
  private ctx?: gsap.Context;

  scenes = [
    { img: 'assets/story/image1.png', alt: 'Rahul, portrait', title: 'Hi, I’m Rahul',
      text: 'Final-year CSE student who likes building things that actually work.' },
    { img: 'assets/story/image2.png', alt: 'Rahul working at a laptop', title: 'I write backend code',
      text: 'REST APIs and database-backed systems with FastAPI, Express and PostgreSQL.' },
    { img: 'assets/story/image3.png', alt: 'Rahul in a server room', title: 'I build full-stack products',
      text: 'From JWT auth to dashboards, React and Angular front ends on top of solid APIs.' },
    { img: 'assets/story/image4.png', alt: 'Rahul with awards behind him', title: 'I win and publish',
      text: 'IEEE Xplore paper, a Cognizant Techathon innovation award, and a book chapter on AI for defence.' },
    { img: 'assets/story/image5.png', alt: 'Rahul smiling with a thumbs up', title: 'Let’s build together',
      text: 'Open to internships and full-time roles. Say hello below.' },
  ];

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.zone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      this.ctx = gsap.context(() => {
        const imgs = gsap.utils.toArray<HTMLElement>('.story-img');
        const steps = gsap.utils.toArray<HTMLElement>('.story-step');
        const n = imgs.length;

        gsap.set(imgs.slice(1), { autoAlpha: 0 });
        gsap.set(steps.slice(1), { autoAlpha: 0 });

        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: '.story-pin',
            start: 'top top',
            end: () => `+=${window.innerHeight * (n - 1) * 0.9}`,
            scrub: true, // Lenis already smooths the scroll, so no extra scrub lag
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        for (let i = 1; i < n; i++) {
          const t = i - 1;
          tl.to(imgs[i - 1], { autoAlpha: 0, scale: 1.06, duration: 0.6 }, t + 0.5)
            .fromTo(imgs[i], { autoAlpha: 0, scale: 0.95 }, { autoAlpha: 1, scale: 1, duration: 0.6 }, t + 0.5)
            .to(steps[i - 1], { autoAlpha: 0, y: -40, duration: 0.4 }, t + 0.5)
            .fromTo(steps[i], { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.5 }, t + 0.8);
        }
        tl.to({}, { duration: 0.6 });
      }, this.root.nativeElement);

      // Re-measure once the images are decoded so the pin doesn't jump
      const pics = Array.from(this.root.nativeElement.querySelectorAll('img'));
      Promise.all(pics.map((p) => p.decode().catch(() => {}))).then(() => ScrollTrigger.refresh());
    });
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
