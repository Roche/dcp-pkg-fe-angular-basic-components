import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {DialogActionButtons} from "../dialog-action-buttons.component";

export interface ConfirmDialogData {
  message: string;
}

@Component({
  selector: 'odcp-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    TranslateModule,
    DialogActionButtons,

  ],
  template: `<mat-dialog-content>
    <p class="odcp-confirm-dialog_message">{{data.message}}</p>
  </mat-dialog-content>

  <odcp-dialog-action-buttons saveText="CONFIRM" (onSave)="confirm()" (onClose)="cancel()"></odcp-dialog-action-buttons>`,
  styleUrls: []
})
export class ConfirmDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);

  cancel() {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
