import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModifierProfilComponent } from './modifier-profil.component';

@NgModule({
  declarations: [ModifierProfilComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ModifierProfilComponent }
    ])
  ]
})
export class ModifierProfilModule {


}
