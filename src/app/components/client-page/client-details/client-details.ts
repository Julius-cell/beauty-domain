import { Component, input } from '@angular/core';
import { ClientDetails } from '../../../services/client.service';

@Component({
  selector: 'cp-client-details',
  imports: [],
  templateUrl: './client-details.html',
})
export class Details {
  details = input.required<ClientDetails>();

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  }
}
