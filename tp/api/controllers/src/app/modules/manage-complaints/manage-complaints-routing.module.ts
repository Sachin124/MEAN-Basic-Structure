import { Routes } from "@angular/router";
import { AddComplaintsComponent } from './complaints-view/add-complaints/add-complaints.component';
import { ComplaintsViewComponent } from './complaints-view/complaints-view.component';
import { ViewDetailsComponent } from "./complaints-view/view-details/view-details.component";

export const ManageComplaintsRouting: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ComplaintsViewComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "add-new",
        component: AddComplaintsComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "view-details/:complaint_id",
        component: ViewDetailsComponent
      }
    ]
  }
];
