import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { HeroComponent } from '../hero/hero.component';
import { StoryComponent } from '../story/story.component';

gsap.registerPlugin(ScrollTrigger);

// Change to 'jpg', 'jpeg' or 'webp' if your story images use another extension
const EXT = 'png';

interface Scene {
  src: string;
  alt: string;
  title: string;
  copy: string;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink, HeroComponent, StoryComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements AfterViewInit, OnDestroy {
  // Set to 'assets/hero/hero.mp4' once the Veo clip is in place
  heroVideo = '';

  logos = [
    'java', 'python', 'express', 'nodejs', 'react', 'bootstrap',
    'postgresql', 'html5', 'css3', 'javascript', 'typescript', 'fastapi',
  ].map((name) => ({
    name,
    url: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`,
  }));

  scenes: Scene[] = [
    {
      src: `assets/story/image1.${EXT}`,
      alt: 'Rahul in a blazer, formal portrait',
      title: "Hi, I'm Rahul",
      copy: 'Final-year CSE student from Chennai who likes building things that actually work.',
    },
    {
      src: `assets/story/image2.${EXT}`,
      alt: 'Rahul typing on a laptop',
      title: 'I write backend code',
      copy: 'REST APIs with FastAPI and Express, backed by PostgreSQL.',
    },
    {
      src: `assets/story/image3.${EXT}`,
      alt: 'Rahul standing in a server room',
      title: 'I build full-stack systems',
      copy: 'JWT auth, multi-user data, React dashboards: TrackHire and a student monitoring system.',
    },
    {
      src: `assets/story/image4.${EXT}`,
      alt: 'Rahul in front of a shelf of awards',
      title: 'I win and publish',
      copy: "IEEE Xplore publication and Most Innovative Solution at Cognizant's Techathon.",
    },
    {
      src: `assets/story/image5.${EXT}`,
      alt: 'Rahul smiling with a thumbs up',
      title: "Let's build something",
      copy: 'Got a project, internship or idea? I would love to hear about it.',
    },
  ];

  private lenis?: Lenis;
  private ctx?: gsap.Context;
  private raf = (time: number): void => {
    this.lenis?.raf(time * 1000);
  };

  constructor(private host: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngAfterViewInit(): void {
    // Run outside Angular so animation frames don't trigger change detection
    this.zone.runOutsideAngular(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!reduce) {
        this.lenis = new Lenis({ lerp: 0.09 });
        this.lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(this.raf);
        gsap.ticker.lagSmoothing(0);
      }

      this.ctx = gsap.context(() => {
        if (!reduce) this.heroIntro();
        this.buildStory();
      }, this.host.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
    gsap.ticker.remove(this.raf);
    this.lenis?.destroy();
  }

  private heroIntro(): void {
    gsap.from('.hero-reveal', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.12,
      delay: 0.1,
    });
  }

  private buildStory(): void {
    const root = this.host.nativeElement;
    const story = root.querySelector<HTMLElement>('.story');
    const stage = root.querySelector<HTMLElement>('.story-stage');
    if (!story || !stage) return;

    const imgs = gsap.utils.toArray<HTMLElement>('.story-frame img', root);
    const caps = gsap.utils.toArray<HTMLElement>('.story-caption', root);
    const n = imgs.length;

    gsap.set(imgs.slice(1), { autoAlpha: 0, scale: 1.06 });
    gsap.set(caps.slice(1), { autoAlpha: 0, y: 40 });

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: story,
        pin: stage,
        start: 'top top',
        end: () => `+=${window.innerHeight * n}`,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Each scene holds for 1 unit, then crossfades over 0.5
    for (let i = 1; i < n; i++) {
      const at = (i - 1) * 1.5 + 1;
      tl.to(imgs[i - 1], { autoAlpha: 0, scale: 0.97, duration: 0.5 }, at)
        .to(imgs[i], { autoAlpha: 1, scale: 1, duration: 0.5 }, at)
        .to(caps[i - 1], { autoAlpha: 0, y: -40, duration: 0.5 }, at)
        .to(caps[i], { autoAlpha: 1, y: 0, duration: 0.5 }, at);
    }
    tl.to({}, { duration: 1 }); // final hold on the last scene

    tl.fromTo(
      '.story-bar-fill',
      { scaleY: 0 },
      { scaleY: 1, duration: tl.duration(), ease: 'none' },
      0
    );
  }
}
