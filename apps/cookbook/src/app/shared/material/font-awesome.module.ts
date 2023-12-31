import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FaConfig,
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
// app.module.ts
import { faBars, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const icons = [faBars, faTrashCan];

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class FontAwesomeLibraryModule {
  constructor(private library: FaIconLibrary, private config: FaConfig) {
    this.config.defaultPrefix = 'fas';

    this.library.addIcons(...icons);
  }
}
