import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../hero/hero.component';
import { StoryComponent } from '../story/story.component';
import { RevealDirective } from '../core/reveal.directive';
import { TiltDirective } from '../core/tilt.directive';
import { MagneticDirective } from '../core/magnetic.directive';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink, HeroComponent, StoryComponent, RevealDirective],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  email = 'rahul.810.n@gmail.com';
  github = 'https://github.com/Rahul810-dev';
  linkedin = 'https://www.linkedin.com/in/your-handle'; // TODO: put your real LinkedIn URL

  skills = [
    { title: 'Backend & Database', items: ['FastAPI', 'Express.js', 'Node.js', 'REST API design', 'PostgreSQL', 'SQL', 'JWT auth'] },
    { title: 'Languages', items: ['Java', 'Python', 'JavaScript', 'TypeScript'] },
    { title: 'Frontend', items: ['React', 'Angular', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'] },
    { title: 'Core CS & Tools', items: ['Data structures & algorithms', 'OOP', 'Git & GitHub', 'Postman', 'Docker (basics)'] },
  ];

  journey = [
    { date: 'Now', role: 'Intern', org: 'Tansam', text: 'Building the Student Risk Prediction System.' },
    { date: 'Mar 2024 – Apr 2025', role: 'Frontend Development Intern', org: 'Nexsoftware',
      text: 'Learned Angular and TypeScript and built a portfolio application to understand component-based architecture and routing.' },
    { date: 'May – Jun 2024', role: 'Machine Learning Research Intern', org: 'Mizoram University',
      text: 'Trained and benchmarked XGBoost, Random Forest and Bagging Regressor on real weather data, tuning with RMSE, MAE and R².' },
    { date: '2023 – 2027', role: 'B.E. Computer Science and Engineering', org: 'Panimalar Engineering College, Chennai',
      text: 'DSA, DBMS, operating systems, computer networks, OOP and software engineering.' },
    { date: '2020 – 2023', role: 'SSLC and HSC', org: 'Victory Public School (CBSE), Kanyakumari', text: '' },
  ];

  highlights = [
    { tag: 'IEEE Xplore · 2025', title: 'Published research',
      text: 'Fuel Management System using GPS and a float sensor, published at i-PACT 2025.' },
    { tag: 'Cognizant Techathon', title: 'Most Innovative Solution',
      text: 'Built a working prototype and received the innovation award.' },
    { tag: 'EDII Hackathon', title: 'Semi-finalist',
      text: 'Tamil Nadu Government initiative. Also 4th place at the Panimalar Ideathon.' },
    { tag: 'Book · IIP Publishers · 2026', title: 'Co-author',
      text: 'Artificial Intelligence for Modern Defence Systems: Technologies, Applications and Future Warfare.' },
  ];
}
