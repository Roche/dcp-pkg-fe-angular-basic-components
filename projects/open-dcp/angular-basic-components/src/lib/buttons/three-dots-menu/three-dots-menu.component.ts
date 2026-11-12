import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";

/**
 * Three dots menu component
 */
@Component({
  selector: 'odcp-three-dots-menu',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
      <button mat-icon-button
              [disabled]="disabled"
              class="top-element"
              [matMenuTriggerFor]="moreMenu"
              (mousedown)="stopPropagation($event)">
        <mat-icon>more_vert</mat-icon>
        <mat-menu #moreMenu="matMenu">
          <ng-content></ng-content>
        </mat-menu>
      </button>`,
  styles: ['.top-element {z-index: 5;}']
})
export class ThreeDotsMenuComponent {
  @Input() disabled: boolean = false;

  stopPropagation($event: MouseEvent) {
    $event.preventDefault();
    $event.stopImmediatePropagation();
  }
}
