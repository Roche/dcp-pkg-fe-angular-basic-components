import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { action } from '@storybook/addon-actions';
import { BreadcrumbComponent } from '../../lib/breadcrumb/breadcrumb.component';
import { DefaultButtonComponent } from '../../lib/buttons/default-button/default-button.component';
import { FlatButtonComponent } from '../../lib/buttons/flat-button/flat-button.component';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<BreadcrumbComponent> = {
  title: 'Breadcrumb',
  component: BreadcrumbComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule.withRoutes([
          { path: 'flat-button', component: FlatButtonComponent },
          { path: 'default-button', component: DefaultButtonComponent },
        ]),]
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
  }
};

export default meta;
type Story = StoryObj<BreadcrumbComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  render: (args, context) => ({
    props: {
      ...args,
    },
    template: `<odcp-breadcrumb [breadcrumbs]="breadcrumbs"></odcp-breadcrumb>`
  }),
  args: {
    breadcrumbs: [
      {label: "Home", url: "/flat-button"},
      {label: "Breadcrumb Page", url: "/default-button"},
    ]
  },
};
