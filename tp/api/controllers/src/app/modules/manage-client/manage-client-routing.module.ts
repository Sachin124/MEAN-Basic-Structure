import { Routes } from "@angular/router";
import { ClientViewComponent } from "./client-view/client-view.component";
import { AddClientComponent } from './client-view/add-client/add-client.component';

export const ManageClientRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ClientViewComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "add-new",
        component: AddClientComponent
      }
    ]
  }
];
