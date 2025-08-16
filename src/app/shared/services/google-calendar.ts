import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarService {
  private isInitialized = signal(false);
  private isSignedIn = signal(false);

  // google-calendar.service.ts
  private readonly CLIENT_ID = environment.googleCalendar.clientId;
  private readonly API_KEY = environment.googleCalendar.apiKey;
  private readonly DISCOVERY_DOC = environment.googleCalendar.discoveryDocs[0];
  private readonly SCOPES = environment.googleCalendar.scopes;

  async initializeGoogleAPI(): Promise<boolean> {
    try {
      if (this.isInitialized()) {
        return this.isSignedIn();
      }

      // Cargar Google API
      await this.loadGoogleAPI();

      // Inicializar Google API
      await gapi.load('client:auth2', async () => {
        await gapi.client.init({
          apiKey: this.API_KEY,
          clientId: this.CLIENT_ID,
          discoveryDocs: [this.DISCOVERY_DOC],
          scope: this.SCOPES,
        });

        this.isInitialized.set(true);
        this.isSignedIn.set(gapi.auth2.getAuthInstance().isSignedIn.get());

        // Escuchar cambios en el estado de autenticación
        gapi.auth2.getAuthInstance().isSignedIn.listen((signedIn: boolean) => {
          this.isSignedIn.set(signedIn);
        });
      });

      return this.isSignedIn();
    } catch (error) {
      console.error('Error inicializando Google API:', error);
      throw error;
    }
  }

  private loadGoogleAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof gapi !== 'undefined') {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);
      document.head.appendChild(script);
    });
  }
}
