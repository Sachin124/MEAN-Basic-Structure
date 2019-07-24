import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewNewsComponent } from './view-news/view-news.component';
import { AddNewsComponent } from './view-news/add-news/add-news.component';
import { RouterModule } from '@angular/router';
import { ManageNewsRoutes } from './manage-news-routing.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [ViewNewsComponent, AddNewsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ManageNewsRoutes),
    FormsModule,
    MatProgressBarModule,
    NgxPaginationModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule
  ]
})
export class ManageNewsModule { }
