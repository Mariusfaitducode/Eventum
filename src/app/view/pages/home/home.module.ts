import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./components/home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {LeftPaneComponent} from "../../left-pane/left-pane.component";
import {RightPaneComponent} from "../../right-pane/right-pane.component";
import { SearchBarComponent } from "../../utils/search-bar/search-bar.component";
import { ProfilComponent } from "../profil/profil.component";
import { ProfilSectionComponent } from "../profil/profil-section/profil-section.component";

import { MessageComponent } from "../message/message.component";

import { AgendaComponent } from "../agenda/agenda.component";
import { AgendaContentComponent } from "../agenda/agenda-content/agenda-content.component";
import { DaySectionComponent } from "../agenda/day-section/day-section.component";

import { AddEventComponent } from "../add-event/add-event.component";

import { NotifPageComponent } from "../notif-page/notif-page.component";
import { NotificationComponent } from "../notif-page/notification/notification.component";
import { UserCardComponent } from "../../utils/user-card/user-card.component";

import { EventComponent} from "../event/event.component";
import { EventSectionComponent } from "../event/event-section/event-section.component";

import { SugestFriendComponent } from "../../utils/sugest-friend/sugest-friend.component";
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Ajout de HttpClientModule et HttpClient
import { UserService } from 'src/app/model/services/user/user.service'; // Ajout de UserService
import { AuthentificationService } from "src/app/model/services/authentification/authentification.service";
import { EventService } from "src/app/model/services/event/event.service";

import { ContainerEventComponent } from "../../utils/container-event/container-event.component";
import { CardEventComponent } from "../../utils/card-event/card-event.component";
import { LittleCardEventComponent } from "../../utils/little-card-event/little-card-event.component";

import { MainEventComponent } from "../../utils/main-event/main-event.component";
import { FormsModule } from "@angular/forms";
import {SendMessageComponent} from "../../utils/send-message/send-message.component";
import {ListMessageComponent} from "../message/components/list-message/list-message.component";
import {ListConversationComponent} from "../message/components/list-conversation/list-conversation.component";

import { ShareDataService } from "src/app/model/services/share/share-data.service";


@NgModule({
  declarations: [
    HomeComponent,
    LeftPaneComponent,
    RightPaneComponent,
    SearchBarComponent,
    ProfilComponent,
    MessageComponent,

    AgendaComponent,
    AgendaContentComponent,
    DaySectionComponent,
    
    AddEventComponent,

    NotifPageComponent,
    NotificationComponent,

    UserCardComponent,
    SugestFriendComponent,
    ProfilSectionComponent,

    ContainerEventComponent,
    CardEventComponent,
    LittleCardEventComponent,
    
    MainEventComponent,
    EventComponent,
    EventSectionComponent,
    SendMessageComponent,
    ListMessageComponent,
    ListConversationComponent,
  ],
  providers: [
    UserService,
    AuthentificationService,
    EventService,
    ShareDataService,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule, // Ajout de HttpClientModule
    FormsModule


  ]
})
export class HomeModule {

}
