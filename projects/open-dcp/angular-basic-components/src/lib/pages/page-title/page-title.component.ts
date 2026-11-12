import {Component} from '@angular/core';

/**
 * Simple UI component for page title
 *
 * @example
 * <odcp-page-title>TITLE</odcp-page-title>
 */
@Component({
  selector: 'odcp-page-title',
  standalone: true,
  template: `<h1 class="odcp-content_title">
    <ng-content></ng-content>
  </h1>`
})
export class PageTitleComponent {}
