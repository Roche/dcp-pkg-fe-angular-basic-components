import {Component, EventEmitter, Output} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';

/**
 * Reusable close ("X") button for the top-right corner of a dialog.
 * Designed to be placed inside a Material Dialog, next to the dialog title.
 *
 * @example
 * <odcp-dialog-close-button (closed)="close()"></odcp-dialog-close-button>
 */
@Component({
  selector: 'odcp-dialog-close-button',
  standalone: true,
  imports: [
    TranslateModule,
    MatIconModule
  ],
  template: `
    <button
      type="button"
      class="odcp-dialog-close-button"
      [attr.aria-label]="'CLOSE' | translate"
      (click)="closed.emit()"
    >
      <mat-icon>close</mat-icon>
    </button>
  `,
  styles: `
    .odcp-dialog-close-button {
      position: absolute;
      top: 16px;
      right: 16px;
      z-index: 10;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.45);

      mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
      }

      &:hover {
        color: rgba(0, 0, 0, 0.7);
      }

      &:focus {
        outline: none;
      }

      &:focus-visible {
        outline: 1px solid rgba(0, 0, 0, 0.3);
        outline-offset: 2px;
      }
    }
  `
})
export class DialogCloseButtonComponent {
  /** Emits when the close button is clicked. */
  @Output() closed: EventEmitter<void> = new EventEmitter();
}

