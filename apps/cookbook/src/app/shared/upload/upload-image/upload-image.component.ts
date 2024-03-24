import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FaConfig,
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FontAwesomeModule],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss',
})
export class UploadImageComponent {
  @Output() uploadApi: EventEmitter<File> = new EventEmitter<File>();
  @Input() imageUrl?: string;

  public uploadedImage!: string | ArrayBuffer | null;

  private file!: File;

  constructor(
    private readonly library: FaIconLibrary,
    private readonly config: FaConfig,
  ) {
    this.config.defaultPrefix = 'fas';
    this.library.addIcons(faPen);
  }

  public onImageSelected(event: Event): void {
    const target = event.target as HTMLInputElement;

    // check if the file input has files
    if (!target.files || !target.files.length) {
      return;
    }

    // check if the file is an image
    this.file = target.files[0];
    if (!this.file || this.file.type.split('/')[0] !== 'image') {
      return;
    }

    // send the file to the parent component
    this.uploadApi.emit(this.file);

    // read the file and display it
    const reader = new FileReader();
    reader.onload = () => {
      this.uploadedImage = reader.result;
    };
    reader.onerror = (readerEvent) => {
      console.error(
        `File could not be read: ${readerEvent.target?.error?.message}`,
        readerEvent.target?.error,
      );
    };
    reader.readAsDataURL(this.file);
  }
}
