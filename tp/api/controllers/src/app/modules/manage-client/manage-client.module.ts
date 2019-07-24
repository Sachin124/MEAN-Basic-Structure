import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ClientViewComponent } from "./client-view/client-view.component";
import { AddClientComponent } from "./client-view/add-client/add-client.component";
import { ManageClientRoutes } from "./manage-client-routing.module";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatIconModule } from "@angular/material/icon";
import { AgmCoreModule } from '@agm/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImageCropperModule } from 'ngx-image-cropper';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ManageClientRoutes),
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatProgressBarModule,
    NgxPaginationModule,
    MatTooltipModule,
    MatIconModule,
    ImageCropperModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDcFRNDoFzNe-uJ2VUesHgUAh1KmXg8ppg',
      libraries: ["places"]
    })
  ],
  declarations: [ClientViewComponent, AddClientComponent]
})
export class ClientModule {}
