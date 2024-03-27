import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FontAwesomeLibraryModule } from './material/font-awesome.module';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from './ui/back-button.component';
import { SnackBarComponent } from './ui/snack-bar/snack-bar.component';
import { UploadImageComponent } from './upload/upload-image/upload-image.component';
import { UnitListComponent } from './ingredients/unit-list.component';

@NgModule({
  imports: [
    MaterialModule,
    FontAwesomeLibraryModule,
    CommonModule,
    BackButtonComponent,
    SnackBarComponent,
    UploadImageComponent,
  ],
  exports: [
    MaterialModule,
    FontAwesomeLibraryModule,
    CommonModule,
    BackButtonComponent,
    SnackBarComponent,
    UploadImageComponent,
    UnitListComponent,
  ],
  declarations: [UnitListComponent],
  providers: [],
})
export class SharedModule {}
