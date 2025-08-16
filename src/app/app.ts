import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppointmentCalendarComponent } from './shared/components/calendar/calendar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppointmentCalendarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('senior-playground');
}
