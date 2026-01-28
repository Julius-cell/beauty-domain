import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppointmentCalendarComponent } from './shared/components/calendar/calendar';
import { UserListContainerComponent } from './practice-elements/components/user-list-container/user-list-container';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AppointmentCalendarComponent,
    UserListContainerComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('senior-playground');
}
