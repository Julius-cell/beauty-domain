import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientPage } from './components/client-page/client-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ClientPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('senior-playground');
}
