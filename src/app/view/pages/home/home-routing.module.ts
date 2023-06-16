import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home.component";
import {ProfilComponent} from "../profil/profil.component";
import {MessageComponent} from "../message/message.component";
import { ModifierProfilComponent } from "../../forms/modifier-profil/modifier-profil.component";


const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  { path: 'profil/:id', component: ProfilComponent,
 },
  { path: 'messages', component: MessageComponent },

  { path: 'profil', component: ProfilComponent,
  },


]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {

}
