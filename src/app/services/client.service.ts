import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Client {
  // generate mock service getClientById and consider timeout of 2 seconds and style guide of Angular
  getClientById(id: string): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          name: 'Mock Client',
          email: 'mockclient@example.com',
          image:
            'https://ui-avatars.com/api/?name=Mock+Client&background=random',
        });
      }, 2000);
    });
  }
}
