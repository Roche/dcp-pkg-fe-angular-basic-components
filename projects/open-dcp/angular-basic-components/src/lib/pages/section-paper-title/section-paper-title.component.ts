import {Component} from '@angular/core';

/**
 * Simple UI component for page title
 *
 * @example
 *  <odcp-section-paper-title>SECTION TITLE</odcp-section-paper-title>
 */
@Component({
  selector: 'odcp-section-paper-title',
  standalone: true,
  template: `<h5 class="odcp-paper-content_title">
    <ng-content></ng-content>
  </h5>`
})
export class SectionPaperTitleComponent {}
