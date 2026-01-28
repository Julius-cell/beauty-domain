import { Component, input } from '@angular/core';
import { User } from '../../services/users.service';

// 🎨 LE PRESENTATIONAL : La face visible, pure et prévisible
@Component({
  selector: 'app-user-list-element',
  template: ` <ul>
    @for (user of users(); track user.id) {
      <li>
        <strong>{{ user.name }}</strong>

        @if (user.isInscribed) {
          <span style="color: green"> • Inscribed</span>
        } @else {
          <span style="color: red"> • Not Inscribed</span>
        }
      </li>
    }
  </ul>`,
})
export class UserListElementComponent {
  users = input.required<User[]>();
}
