import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddEventComponent} from "./view/pages/add-event/add-event.component";
import {NotifPageComponent} from "./view/pages/notif-page/notif-page.component";
import {MessageComponent} from "./view/pages/message/message.component";
import {ProfilComponent} from "./view/pages/profil/profil.component";
import { EventComponent } from './view/pages/event/event.component';
import { AgendaComponent } from './view/pages/agenda/agenda.component';

const routes: Routes = [
  { 
    path: 'hub', loadChildren: () => import('./view/pages/hub/hub.module').then(m => m.HubModule)
  },
  {
    path: 'home', loadChildren: () => import('./view/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'add', component: AddEventComponent
  },
  { path: 'agenda', component: AgendaComponent },
  { path: 'agenda/:jour', component: AgendaComponent},

  { path: 'notifications', component: NotifPageComponent },
  { path: 'messages', component: MessageComponent },
  { path: 'messages/:id', component: MessageComponent },
  { path: 'profil', component: ProfilComponent,
  children : [
    {path: 'modifier', loadChildren: () => import('./view/forms/modifier-profil/modifier-profil.module').then(m => m.ModifierProfilModule)},
  ]
},
{ path: 'profil/:id', component: ProfilComponent },


  { path: 'event/:id', component: EventComponent,
  children : [
    {path: 'modifier', loadChildren: () => import('./view/forms/modifier-evenement/modifier-evenement.module').then(m => m.ModifierEvenementModule)},
    {path: 'confirmer', loadChildren: () => import('./view/forms/confirmer/confirmer.module').then(m => m.ConfirmerModule)},
 
  ]
},
  {
    path: '**', redirectTo: 'hub', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
