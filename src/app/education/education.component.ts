import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-education',
  imports: [RouterModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {
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
    {link: '/' };


  onMouseMove(event: MouseEvent, card: any) {
    const rect = card.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const rotateY = ((mouseX / width) - 0.5) * 20;
    const rotateX = ((mouseY / height) - 0.5) * -20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  onMouseLeave(card: any) {
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  }


}
