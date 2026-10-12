import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { EducationComponent } from './education/education.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'about', component: AboutmeComponent },
  { path: 'education', component: EducationComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' },
];
