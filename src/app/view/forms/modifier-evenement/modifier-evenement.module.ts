import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModifierEvenementComponent } from './modifier-evenement.component';

@NgModule({
  declarations: [ModifierEvenementComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ModifierEvenementComponent }
    ])
  ]
})
export class ModifierEvenementModule {


}
