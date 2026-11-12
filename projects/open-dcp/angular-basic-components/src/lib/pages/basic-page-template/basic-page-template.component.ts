import {Component, EventEmitter, Output} from '@angular/core';

/**
 * Simple UI component for basic page with window:onresize event
 *
 * ng-content attributes:
 * [pageHeader]
 * [nonPaperContent]
 *
 * All other tags will be loaded by default inside the "paper-content"
 *
 * @example
 *<odcp-basic-page-template (windowResize)="triggerOnResizeMethod()">
 *   <odcp-page-title pageHeader>TITLE</odcp-page-title>
 *   <div nonPaperContent>CONTENT LOADED BEFORE "paper-content"</div>
 *   <div>CONTENT LOADED INSIDE "paper-content"</div>
 *<odcp-basic-page-template>
 *
 *
 * If you not need "paper-content" on screen add all elements inside [nonPaperContent]
 *
 * @example
 *<odcp-basic-page-template (windowResize)="triggerOnResizeMethod()">
 *   <odcp-page-title pageHeader>TITLE</odcp-page-title>
 *   <div nonPaperContent>All CONTENT</div>
 *<odcp-basic-page-template>
 */
@Component({
  selector: 'odcp-basic-page-template',
  standalone: true,
  template: `<div class="odcp-content" (window:resize)="onResize()">
    <header class="odcp-content_header">
      <ng-content select="[pageHeader]"></ng-content>
    </header>

    <div style="margin-top: 1rem; margin-bottom: 1rem;">
      <ng-content select="[nonPaperContent]"></ng-content>
    </div>

    <div class="odcp-paper-content odcp-paper-content--ng-content" style="padding: 1rem;">
      <ng-content></ng-content>
    </div>
  </div>
  `
})
export class BasicPageTemplateComponent {
  @Output() windowResize: EventEmitter<any> = new EventEmitter<any>();

  onResize() {
    this.windowResize.emit();
  }
}
