import type { Meta, StoryObj } from '@storybook/angular';

import { DefaultButtonComponent } from '../../lib/buttons/default-button/default-button.component';
import {fn} from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<DefaultButtonComponent> = {
  title: 'Buttons/Default Button',
  component: DefaultButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
  }
};

export default meta;
type Story = StoryObj<DefaultButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  render: (args, context) => ({
    template: `<odcp-default-button [disabled]="${args.disabled}">Save</odcp-default-button>`
  }),
  args: {
    disabled: false
  },
};
