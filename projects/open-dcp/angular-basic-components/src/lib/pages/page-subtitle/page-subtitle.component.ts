import {Component} from '@angular/core';

/**
 * Simple UI component for page subtitle
 */
@Component({
  selector: 'odcp-page-subtitle',
  standalone: true,
  template: `<div class="odcp-page-subtitle">
    <ng-content></ng-content>
  </div>`,
  styles: [
    `.odcp-page-subtitle {
       font-size: 12px;
       font-weight: 300;
       color: #B1B3B3;
       line-height: 14px;
     }`
  ]
})
export class PageSubtitleComponent {}
