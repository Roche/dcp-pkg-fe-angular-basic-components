import {Component, Input} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {NgIf} from "@angular/common";

/**
 * Simple UI component for editor page
 *
 * ng-content attributes:
 * [pageHeader]
 * [pageFooter]
 *
 * All other tags will be loaded by default inside the "paper-content"
 *
 * @example
 *<odcp-edit-page-template>
 *   <odcp-page-title pageHeader>TITLE</odcp-page-title>
 *   <div>CONTENT LOADED INSIDE "paper-content"</div>
 *   <div pageFooter>PAGE FOOTER CONTENT</div>
 *<odcp-edit-page-template>
 *
 *  Or if you not need [pageFooter]
 * @example
 *<odcp-edit-page-template [noFooter]=true>
 *   <odcp-page-title pageHeader>TITLE</odcp-page-title>
 *   <div>CONTENT LOADED INSIDE "paper-content"</div>
 *<odcp-edit-page-template>
 */
@Component({
  selector: 'odcp-edit-page-template',
  standalone: true,
  imports: [
    MatToolbar,
    NgIf
  ],
  template: `<div class="odcp-content odcp-page-editor odcp-page-editor--with-bottom-bar">
    <header class="odcp-content_header">
      <ng-content select="[pageHeader]"></ng-content>
    </header>

    <div class="odcp-page-editor_content">
      <ng-content></ng-content>
    </div>

    <mat-toolbar class="odcp-content_footer odcp-page-editor_bottom-bar" *ngIf="!noFooter">
      <div  style="margin-left: auto;">
        <ng-content select="[pageFooter]"></ng-content>
      </div>
    </mat-toolbar>
  </div>
  `
})
export class EditPageTemplateComponent {
  @Input() noFooter = false;
}
