import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HubComponent} from "./hub/hub.component";

const routes: Routes = [
  {
    path: '', component: HubComponent,
    children : [
      {path: 'login', loadChildren: () => import('../../forms/login/login.module')
        .then(m => m.LoginModule)},
      {path: 'register', loadChildren: () => import('../../forms/register/register.module')
        .then(m => m.RegisterModule)},
    ]
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HubRoutingModule {

}
