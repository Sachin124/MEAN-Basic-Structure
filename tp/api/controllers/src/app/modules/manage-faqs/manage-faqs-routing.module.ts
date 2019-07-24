import { Routes } from "@angular/router";
import { AddFaqsComponent } from "./view-faqs/add-faqs/add-faqs.component";
import { ViewFaqsComponent } from "./view-faqs/view-faqs.component";
import { AddProductComponent } from "./view-product/add-product/add-product.component";
import { ViewProductComponent } from './view-product/view-product.component';


export const ManageFaqsRouts: Routes = [
  {
    path: "",
    children: [
      {
        path: "faq",
        component: ViewFaqsComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "add-new",
        component: AddFaqsComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "faq-product",
        component: ViewProductComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "add-product",
        component: AddProductComponent
      }
    ]
  }
];
