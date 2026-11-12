import {applicationConfig, Meta, moduleMetadata, StoryFn, StoryObj} from '@storybook/angular';
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {TranslateModule} from "@ngx-translate/core";
import {Component, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../lib/dialogs/confirm-dialog/confirm-dialog.component";

/**
 * Three dots menu component
 */
@Component({
  selector: 'odcp-confirm-dialog-demo',
  standalone: true,
  imports: [CommonModule, MatButton],
  template: `<button mat-raised-button color="primary" (click)="open()">Open Confirm</button>`,
  styles: ['']
})
class ConfirmDialogDemoComponent {
  readonly dialog = inject(MatDialog);

  open(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {message: 'Are you sure you want to delete this item?'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log('Confirmation', result);
      }
    });
  }
}

const meta: Meta<ConfirmDialogDemoComponent> = {
  title: 'Dialogs/ConfirmDialog',
  component: ConfirmDialogDemoComponent,
  decorators: [
    moduleMetadata({
      imports: [TranslateModule.forRoot({
        defaultLanguage: 'en'
      }), ConfirmDialogComponent, MatDialogModule, BrowserAnimationsModule, MatButtonModule],
    }),
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<ConfirmDialogDemoComponent>;

export const BasicUsage: Story = {};
