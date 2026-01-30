import { Component } from '@angular/core';
import { Chart } from 'chart.js'; // Autre bibliothèque conséquente

@Component({
  selector: 'app-heavy-container',
  imports: [],
  template: `<h1>Tableau de bord ultra complexe</h1>`,
})
export class HeavyComponent {
  // Le simple fait d'importer ce libs va gonfler le bundle du composant
  constructor() {
    console.log(Chart);
  }
}
