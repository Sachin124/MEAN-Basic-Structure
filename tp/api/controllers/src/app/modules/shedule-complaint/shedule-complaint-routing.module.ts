import { ViewSheduleComponent } from './view-shedule/view-shedule.component';
import { AddSheduleComponent } from './view-shedule/add-shedule/add-shedule.component';
import { Routes } from '@angular/router';

export const SheduleComplaintRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ViewSheduleComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "add-new-shedule",
        component: AddSheduleComponent
      }
    ]
  }
];
