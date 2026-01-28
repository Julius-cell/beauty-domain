import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
  id: number;
  name: string;
  age: number;
  isInscribed: boolean;
}

@Injectable({ providedIn: 'root' })
export class UsersService {

  getUsers(): Observable<User[]> {
    return of([
      { id: 1, name: 'Jhon', age: 25, isInscribed: true },
      { id: 2, name: 'Carl', age: 28, isInscribed: false },
      { id: 3, name: 'Sam', age: 26, isInscribed: true },
    ]);
  }

}
