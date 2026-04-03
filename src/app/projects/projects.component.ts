import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbCarousel,
  NgbCarouselConfig,
  NgbCarouselModule,
  NgbSlideEvent,
  NgbSlideEventSource
} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbCarouselModule,RouterModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [NgbCarouselConfig]
})
export class ProjectsComponent {
  images = [
    {
      image: 'assets/carosuel/carsouel2.jpg',
      label: 'Presented at an International Conference.'
    },
    {
      image: 'assets/carosuel/carsouel3.jpg',
      label: 'Semifinalist in the Tamil Nadu Government Hackathon'
    },
    {
      image: 'assets/carosuel/carsouel4.jpg',
      label: 'Research Intern at Mizoram University. '
    },
    {
      image: 'assets/carosuel/carsouel5.jpg',
      label: 'Secured 4th spot for college Ideathon.'
    },
    {
      image: 'assets/carosuel/carsouel6.jpg',
      label: 'Own Most Innovative Solution Certification in Techathon'
    }
  ];

  pauseOnHover = true;
  pauseOnFocus = true;
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;

  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

  togglePaused(): void {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent): void {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
       slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }

    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }

  openCV(): void {
    const cvUrl = 'assets/Rahul-cv.pdf';
    window.open(cvUrl, '_blank');
  }

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = 'assets/Rahul-cv.pdf';
    link.download = 'Rahul-cv.pdf';
    link.target = '_blank';
    link.click();
  }

  navLinks =
    {link: '/' };
}
