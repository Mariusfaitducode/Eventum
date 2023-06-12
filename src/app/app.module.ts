import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HubModule} from "./view/pages/hub/hub.module";
import {HomeModule} from "./view/pages/home/home.module";
import { LoginComponent } from './view/forms/components/login/login.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HubModule,
    HomeModule,
    HttpClientModule, // Ajout de HttpClientModule

  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
