import { Component, inject } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ProfileImage } from './profile-image/profile-image';
import { AsyncPipe } from '@angular/common';
import { Highlights } from './highlights/highlights';

@Component({
  selector: 'app-client-page',
  imports: [ProfileImage, Highlights, AsyncPipe],
  templateUrl: './client-page.html',
})
export class ClientPage {
  clientService = inject(ClientService).getClientById('1');

  handleProfileImageChange(file: File) {
    // subir a Firebase, S3, backend, etc.
    console.log('Archivo seleccionado:', file);
  }
}
