import { Component, input, output } from '@angular/core';

@Component({
  selector: 'cp-profile-image',
  imports: [],
  templateUrl: './profile-image.html',
  styleUrl: './profile-image.css'
})
export class ProfileImage {
  imageUrl = input<string>('defaultAvatar');
  imageChange = output<File>();

  defaultAvatar = 'https://ui-avatars.com/api/?name=Cliente&background=random';

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
