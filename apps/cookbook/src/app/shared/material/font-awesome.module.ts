import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FaConfig,
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faTrashCan,
  faPen,
  faArrowDown,
  faArrowUp,
  faCheck,
  faXmark,
  faSearch,
  faPlus,
  faSliders,
  faEnvelope,
  faLock,
  faUser,
  faCircleUser,
  faBook,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

import {
  faFileLines,
  faUser as farUser,
} from '@fortawesome/free-regular-svg-icons';

const icons = [
  faBars,
  faTrashCan,
  faPen,
  faArrowDown,
  faArrowUp,
  faCheck,
  faXmark,
  faSearch,
  faPlus,
  faSliders,
  faEnvelope,
  faLock,
  faUser,
  faCircleUser,
  faFileLines,
  farUser,
  faBook,
  faUserPlus,
];

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
