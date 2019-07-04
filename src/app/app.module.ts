import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { AppRouting } from './app-routing.module';
import { HeaderModule } from './layout/header/header.module';
import { FooterModule } from './layout/footer/footer.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {DataService} from './service/data.service';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HeaderModule,
    FooterModule,
    HttpClientModule,
    RouterModule.forRoot(AppRouting)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
