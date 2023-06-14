import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HubModule} from "./view/pages/hub/hub.module";
import { LoginComponent } from './view/forms/login/login.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RegisterComponent } from './view/forms/register/register.component';
import {HomeModule} from "./view/pages/home/home.module";
import { ListConversationComponent } from './view/pages/message/components/list-conversation/list-conversation.component';


@NgModule({
  declarations: [
    AppComponent,
    ListConversationComponent,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
