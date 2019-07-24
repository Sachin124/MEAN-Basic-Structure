import { Routes } from "@angular/router";
import { AddNewsComponent } from "./view-news/add-news/add-news.component";
import { ViewNewsComponent } from "./view-news/view-news.component";

export const ManageNewsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ViewNewsComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "add-new",
        component: AddNewsComponent
      }
    ]
  }
];
