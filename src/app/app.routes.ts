import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then((m) => m.Home),
  },
  {
    path: 'tasks',
    loadComponent: () => import('./components/task-list/task-list').then((m) => m.TaskList),
  },
  {
    path: 'sensor',
    loadComponent: () => import('./components/sensor/sensor').then((m) => m.Sensor),
  },
];
