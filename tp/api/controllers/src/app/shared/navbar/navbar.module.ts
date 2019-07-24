import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "./navbar.component";
import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule
} from "@angular/material";
import { TagInputModule } from "ngx-chips";
import { FormsModule } from "@angular/forms";
@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    TagInputModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class NavbarModule {}
