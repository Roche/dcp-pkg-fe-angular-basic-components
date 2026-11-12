import type { Meta, StoryObj } from '@storybook/angular';

import {TextButtonComponent} from "../../lib/buttons/text-button/text-button.component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<TextButtonComponent> = {
  title: 'Buttons/Text Button',
  component: TextButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    }
  }
};

export default meta;
type Story = StoryObj<TextButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  render: (args) => ({
    template: `
<odcp-text-button
    [disabled]="${args.disabled}">
    Back
</odcp-text-button>
`
  }),
  args: {
    disabled: false
  },
};
