import { Routes } from '@angular/router';
import { InputComponent } from './components/input/input.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { OutputComponent } from './components/output/output.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'input', component: InputComponent },
  { path: 'output', component: OutputComponent },
];
