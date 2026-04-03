import { Component } from '@angular/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CdkAccordionModule,RouterModule],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  items = [
    'How long does the entire project take to complete?',
    'What is the design process?',
    'Can I make changes after the project is completed?',
    "What happens if I don't like the initial changes?",
    'What is the design process?'
  ];

  expandedIndex = 0;

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
}
