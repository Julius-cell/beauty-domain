import { Component, inject } from '@angular/core';
import { Client } from '../../services/client.service';
import { ProfileImage } from './profile-image/profile-image';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-client-page',
  imports: [ProfileImage, AsyncPipe],
  templateUrl: './client-page.html',
})
export class ClientPage {
  clientService = inject(Client).getClientById('1');

  handleProfileImageChange(file: File) {
    // subir a Firebase, S3, backend, etc.
    console.log('Archivo seleccionado:', file);
  }
}
