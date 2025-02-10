import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'users',
        loadComponent: () => import('./components/user/user.component').then(c => c.UserComponent)
    },
    {
        path: 'users/create',
        loadComponent: () => import('./components/user-form/user-form.component').then(c => c.UserFormComponent)
    },
    {
        path: 'users/edit/:id',
        loadComponent: () => import('./components/user-form/user-form.component').then(c => c.UserFormComponent)
    },
    {
        path: '**',
        redirectTo: 'users',
        pathMatch: 'full'
    }
];
