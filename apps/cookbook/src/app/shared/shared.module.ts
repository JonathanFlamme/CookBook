import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FontAwesomeLibraryModule } from './material/font-awesome.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [MaterialModule, FontAwesomeLibraryModule, CommonModule],
  exports: [MaterialModule, FontAwesomeLibraryModule, CommonModule],
  declarations: [],
  providers: [],
})
export class SharedModule {}
