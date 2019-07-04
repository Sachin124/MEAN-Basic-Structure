import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

// import {} from './modules/dashboard/dashboard.module';

export const AppRouting: Routes = [{
  path: '',
  redirectTo: '/dashboard',
  pathMatch: 'full'
},
{
  path: '',
  component: LayoutComponent,
  children: [{
    path: 'dashboard',
    loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
  }]
}
]