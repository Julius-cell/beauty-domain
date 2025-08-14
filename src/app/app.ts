import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientPage } from './clients/pages/client-page/client-page';
import { AppointmentCalendarComponent } from './shared/components/calendar/calendar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ClientPage, AppointmentCalendarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('senior-playground');
}
