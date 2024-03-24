import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyRecipesRoutingModule } from './my-recipes-routing.module';
import { MyRecipesListComponent } from './my-recipes-list/my-recipes-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MyRecipesListComponent],
  imports: [CommonModule, MyRecipesRoutingModule, SharedModule],
})
export class MyRecipesModule {}
