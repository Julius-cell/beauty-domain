import { Injectable } from '@angular/core';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  // generate mock service getClientById and consider timeout of 2 seconds and style guide of Angular
  getClientById(id: string): Promise<Client> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          name: 'Mock Client',
          email: 'mockclient@example.com',
          image:
            'https://ui-avatars.com/api/?name=Mock+Client&background=random',
          highlights: {
            timesAttended: 12,
            totalSpent: 450000,
            additionalHighlights: [
              { name: 'Servicios Favoritos', value: 'Haircut' },
              // { name: 'Última Visita', value: '2025-05-15' },
            ],
          },
          details: {
            email: 'maria.gonzalez@gmail.com',
            phone: '+56 9 8765 4321',
            birthDate: '1990-03-15',
            age: 35,
          },
        });
      }, 2000);
    });
  }
}
