import { Meta, StoryObj, applicationConfig, moduleMetadata  } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';

import {ThreeDotsMenuComponent} from "../../lib/buttons/three-dots-menu/three-dots-menu.component";
import {MatMenuModule} from "@angular/material/menu";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ThreeDotsMenuComponent> = {
  title: 'Buttons/Three Dots Menu',
  decorators: [
    moduleMetadata({
      imports: [MatMenuModule],
    }),
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  component: ThreeDotsMenuComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    }
  }
};

export default meta;
type Story = StoryObj<ThreeDotsMenuComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  render: (args) => ({
    template: `
<odcp-three-dots-menu
    [disabled]="${args.disabled}">
  <button mat-menu-item>
    Edit
  </button>
  <button mat-menu-item>
    Delete
  </button>
</odcp-three-dots-menu>
`
  }),
  args: {
    disabled: false
  },
};
