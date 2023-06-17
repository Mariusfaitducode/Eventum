import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./components/home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {LeftPaneComponent} from "../../left-pane/left-pane.component";
import {RightPaneComponent} from "../../right-pane/right-pane.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";

import { ProfilComponent } from "../profil/profil.component";
import { ProfilSectionComponent } from "../profil/profil-section/profil-section.component";
import { ProfilContentComponent } from "../profil/profil-content/profil-content.component";

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
import { ParticipantsComponent } from '../event/participants/participants.component';

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
import {FileService} from "../../../model/services/file/file.service";
import { ShareDataService } from "src/app/model/services/share/share-data.service";
import {ListConversationComponent} from "../message/components/list-conversation/list-conversation.component";
import {SingleMessageComponent} from "../message/components/single-message/single-message.component";

import { ModifierProfilComponent } from "../../forms/modifier-profil/modifier-profil.component";
import { ModifierProfilModule } from "../../forms/modifier-profil/modifier-profil.module";
import { ProfilService } from "src/app/model/services/profil/profil.service";
import { FollowsComponent } from "../profil/follows/follows.component";
import { ModifierEvenementModule } from "../../forms/modifier-evenement/modifier-evenement.module";
import {ForumComponent} from "../event/forum/forum.component";


@NgModule({
  declarations: [
    HomeComponent,
    LeftPaneComponent,
    RightPaneComponent,
    SearchBarComponent,

    MessageComponent,

    AgendaComponent,
    AgendaContentComponent,
    DaySectionComponent,

    AddEventComponent,

    NotifPageComponent,
    NotificationComponent,

    UserCardComponent,
    SugestFriendComponent,

    ProfilComponent,
    ProfilSectionComponent,
    ProfilContentComponent,

    ContainerEventComponent,
    CardEventComponent,
    LittleCardEventComponent,

    MainEventComponent,
    EventComponent,
    EventSectionComponent,
    ParticipantsComponent,

    SendMessageComponent,
    ListMessageComponent,
    ListConversationComponent,
    SingleMessageComponent,
    FollowsComponent,
    ForumComponent,
  ],
  providers: [
    UserService,
    AuthentificationService,
    EventService,
    FileService,
    ShareDataService,
    ProfilService,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule, // Ajout de HttpClientModule
    FormsModule,
    ModifierProfilModule,
    ModifierEvenementModule,
  ]
})
export class HomeModule {

}
