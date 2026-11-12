import { Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {MatDialogActions} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';
import {TextButtonComponent} from "../buttons/text-button/text-button.component";
import {A11yModule} from "@angular/cdk/a11y";
/**
 * A reusable action bar for dialogs featuring "Cancel" and "Save" functionality.
 * Designed to be placed at the bottom of a Material Dialog.
 * * @example
 * <dialog-action-buttons
 * [saveText]="'ACTIONS.CONFIRM'"
 * (onSave)="handleSave()">
 * </dialog-action-buttons>
 */
@Component({
  selector: 'odcp-dialog-action-buttons',
  standalone: true,
  imports: [
    MatDialogActions,
    TextButtonComponent,
    TranslateModule,
    NgIf,
    A11yModule
  ],
  template: `
    <mat-dialog-actions class="dialog-actions">
      <odcp-text-button class="flex-grow-1"
                        [disabled]="disabledCancel"
                        *ngIf="showCancel"
                        [color]="undefined"
                        (click)="close()">{{ cancelText | translate }}
      </odcp-text-button>
      <odcp-text-button color="primary"
                        cdkTrapFocus
                        [attr.cdkFocusInitial]="true"
                        [disabled]="disabledSave"
                        class="flex-grow-1"
                        (click)="save()">
        {{ saveText | translate }}
      </odcp-text-button>
    </mat-dialog-actions>`,
  styles: `
    .dialog-actions {
      display: flex;
      odcp-text-button button {
        width: 100%;
      }
    }`,
  encapsulation: ViewEncapsulation.None
})
export class DialogActionButtons {
  /** The translation key or literal text for the cancel button. Defaults to 'CANCEL'. */
  @Input() cancelText = 'CANCEL';

  /** The translation key or literal text for the primary action button. Defaults to 'SAVE'. */
  @Input() saveText = 'SAVE';

  /** Whether to display the cancel button. Defaults to true. */
  @Input() showCancel = true;

  /** Emits when the primary action button is clicked. */
  @Output() onSave: EventEmitter<void> = new EventEmitter();

  /** Emits when the cancel button is clicked. */
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  /** Whether the cancel button is in a disabled state. */
  @Input() disabledCancel = false;

  /** Whether the save button is in a disabled state. */
  @Input() disabledSave = false;


  save() {
    this.onSave.emit();
  }
  close() {
    this.onClose.emit();
  }
}
