import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HubModule} from "./view/pages/hub/hub.module";
import { LoginComponent } from './view/forms/login/login.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RegisterComponent } from './view/forms/register/register.component';
import {HomeModule} from "./view/pages/home/home.module";

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { LOCALE_ID } from '@angular/core';



@NgModule({
  declarations: [
    AppComponent,
    //NotificationComponent,
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
  bootstrap: [AppComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' }
  ]
})
export class AppModule { 

  constructor() {
    registerLocaleData(localeFr, 'fr');
  }
}
