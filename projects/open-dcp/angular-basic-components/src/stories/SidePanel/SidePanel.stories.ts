import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SidePanelComponent } from '../../lib/side-panel/side-panel.component';
import { AuditTrailComponent } from '../../lib/audit-trail/audit-trail.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<SidePanelComponent> = {
  title: 'Side Panel',
  component: SidePanelComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        TranslateModule.forRoot({
          defaultLanguage: 'en'
        }),
        BrowserAnimationsModule,
        AuditTrailComponent
      ],
    }),
    componentWrapperDecorator(
      (story) => `
        <div class="wrapper">
          Page Wrapper
        </div>
        ${story}
      `
    )
  ],
};

export default meta;
type Story = StoryObj<SidePanelComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const SidePanel: Story = {
  render: (args, context) => ({
    props: args,
    styles: [
      `::ng-deep .odcp-audit-trail-manager .header {
        top: 30px !important;
      }`
    ],
    template: `
      <button (click)="panel.openDrawer()">Open</button>
      <odcp-side-panel #panel>
        <odcp-audit-trail
          [allowDownloadCsv]="true"
          [titleText]="'AUDIT_TRAIL'"
          [endPoint]="'/mvda/Notification/254/61865c26-7d3c-11ee-b962-0242ac120002/audit'"
          [fileName]="'mvda-notifcation-61865c26-7d3c-11ee-b962-0242ac120002-audit-trail.csv'">
        </odcp-audit-trail>
      </odcp-side-panel>
    `,
  }),
  args: {},
};
