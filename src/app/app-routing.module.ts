import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddEventComponent} from "./view/pages/add-event/add-event.component";
import {NotifPageComponent} from "./view/pages/notif-page/notif-page.component";
import {MessageComponent} from "./view/pages/message/message.component";
import {ProfilComponent} from "./view/pages/profil/profil.component";

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
  {
    path: 'agenda', loadChildren: () => import('../../src/app/view/pages/agenda/agenda.module').then(m => m.AgendaModule)
  },
  { path: 'notifications', component: NotifPageComponent },
  { path: 'messages', component: MessageComponent },
  { path: 'profil/:id', component: ProfilComponent },
  {
    path: '**', redirectTo: 'hub', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
