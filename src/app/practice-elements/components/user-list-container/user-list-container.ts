import { Component, inject, OnInit, signal } from '@angular/core';
import { User, UsersService } from '../../services/users.service';
import { UserListElementComponent } from '../user-list-element/user-list-element';

// 🧠 LE CONTAINER : Le cerveau qui gère les données
@Component({
  selector: 'app-user-list-container',
  imports: [UserListElementComponent],
  template: `
    <app-user-list-element
      [users]="users()"
    ></app-user-list-element>
  `,
})
export class UserListContainerComponent implements OnInit {
  userService = inject(UsersService);
  users = signal<User[]>([]);

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users.set(users);
    })
  }
}
