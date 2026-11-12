import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { AuditTrailComponent } from '../../lib/audit-trail/audit-trail.component';
import { TranslateModule } from '@ngx-translate/core';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<AuditTrailComponent> = {
  title: 'Audit Trail',
  component: AuditTrailComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        TranslateModule.forRoot({
          defaultLanguage: 'en'
        }),
        BrowserAnimationsModule,
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
type Story = StoryObj<AuditTrailComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AuditTrail: Story = {
  render: (args, context) => ({
    props: args,
    template: `
      <odcp-audit-trail
        [allowDownloadCsv]="true"
        [titleText]="'AUDIT_TRAIL'"
        [endPoint]="'/mvda/Notification/254/61865c26-7d3c-11ee-b962-0242ac120002/audit'"
        [fileName]="'mvda-notifcation-61865c26-7d3c-11ee-b962-0242ac120002-audit-trail.csv'">
      </odcp-audit-trail>
    `,
  }),
  args: {},
};
