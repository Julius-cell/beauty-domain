import { Component, input } from '@angular/core';
import { ClientHighlight, ClientHighlights } from '../../models/client';

@Component({
  selector: 'cp-highlights',
  templateUrl: './highlights.html',
})
export class Highlights {
  highlights = input<ClientHighlights>();

  get visibleHighlights(): ClientHighlight[] {
    if (!this.highlights()?.additionalHighlights) {
      return [];
    }
    return this.highlights()?.additionalHighlights?.slice(0, 3) ?? [];
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat('es-CL', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }
}
