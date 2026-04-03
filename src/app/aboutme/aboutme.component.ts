import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-aboutme',
  imports: [RouterModule],
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.css'
})
export class AboutmeComponent {
downloadCV(): void {
    const link = document.createElement('a');
    link.href = 'assets/Rahul-cv.pdf';
    link.download = 'Rahul-cv.pdf';
    link.target = '_blank';
    link.click();
  }

  openCV(): void {
    const cvUrl = 'assets/Rahul-cv.pdf';
    window.open(cvUrl, '_blank');
  }

  navLinks =
    {link: '/' }
}
