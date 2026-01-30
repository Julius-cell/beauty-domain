import { Routes } from '@angular/router';
import { HeavyComponent } from './practice-elements/components/heavy-component/heavy-component';

export const routes: Routes = [
  {
    path: 'test-lazy-route',
    component: HeavyComponent,
    // loadComponent: () =>
    //   import('./practice-elements/components/heavy-component/heavy-component').then(
    //     (m) => m.HeavyComponent,
    //   ),
  },
];
