import { Component, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cp-profile-image',
  imports: [FontAwesomeModule],
  templateUrl: './profile-image.html',
  styleUrl: './profile-image.css'
})
export class ProfileImage {
  imageUrl = input<string>('defaultAvatar');
  imageChange = output<File>();

  defaultAvatar = 'https://ui-avatars.com/api/?name=Cliente&background=random';
  faPencilAlt = faPencilAlt;

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.imageChange.emit(file);
    }
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }
}
