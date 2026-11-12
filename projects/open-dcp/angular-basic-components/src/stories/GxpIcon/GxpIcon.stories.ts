import type { Meta, StoryObj } from '@storybook/angular';
import { GxpIconComponent } from '../../lib/gxp-icon/gxp-icon.component';
const meta: Meta<GxpIconComponent> = {
  title: 'Components/GXP Icon',
  component: GxpIconComponent,
  tags: ['autodocs'],
  argTypes: {
    isValidated: {
      control: { type: 'boolean' },
      description: 'Whether the application is GXP validated',
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Whether the GXP status is disabled/undefined',
    },
    size: {
      options: ['small', 'normal'],
      control: { type: 'select' },
      description: 'Size of the GXP icon label',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'GXP Icon component displays the GXP (Good X Practice) validation status of an application. It shows "Non GXP" for non-validated apps or "UNDEFINED" when disabled.',
      },
    },
  },
  render: (args) => ({
    template: `<odcp-gxp-icon [isValidated]="isValidated" [isDisabled]="isDisabled" [size]="size"></odcp-gxp-icon>`,
    props: args,
  }),
};
export default meta;
type Story = StoryObj<GxpIconComponent>;
export const NonGxp: Story = {
  args: {
    isValidated: false,
    isDisabled: false,
    size: 'normal',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the "Non GXP" label for applications that are not GXP validated.',
      },
    },
  },
};
export const GxpValidated: Story = {
  args: {
    isValidated: true,
    isDisabled: false,
    size: 'normal',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the validated state (isValidated=true). The label styling changes to indicate validated status.',
      },
    },
  },
};
export const Disabled: Story = {
  args: {
    isValidated: false,
    isDisabled: true,
    size: 'normal',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the disabled state with "UNDEFINED" label, indicating that GXP status is not available.',
      },
    },
  },
};
export const SmallSize: Story = {
  args: {
    isValidated: false,
    isDisabled: false,
    size: 'small',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the GXP icon in small size, useful for compact layouts.',
      },
    },
  },
};
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 20px;">
        <div>
          <h4>Non GXP (Normal)</h4>
          <odcp-gxp-icon [isValidated]="false" [isDisabled]="false" [size]="'normal'"></odcp-gxp-icon>
        </div>
        <div>
          <h4>GXP Validated (Normal)</h4>
          <odcp-gxp-icon [isValidated]="true" [isDisabled]="false" [size]="'normal'"></odcp-gxp-icon>
        </div>
        <div>
          <h4>Disabled (Normal)</h4>
          <odcp-gxp-icon [isValidated]="false" [isDisabled]="true" [size]="'normal'"></odcp-gxp-icon>
        </div>
        <div>
          <h4>Non GXP (Small)</h4>
          <odcp-gxp-icon [isValidated]="false" [isDisabled]="false" [size]="'small'"></odcp-gxp-icon>
        </div>
        <div>
          <h4>GXP Validated (Small)</h4>
          <odcp-gxp-icon [isValidated]="true" [isDisabled]="false" [size]="'small'"></odcp-gxp-icon>
        </div>
        <div>
          <h4>Disabled (Small)</h4>
          <odcp-gxp-icon [isValidated]="false" [isDisabled]="true" [size]="'small'"></odcp-gxp-icon>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Shows all possible combinations of the GXP Icon component.',
      },
    },
  },
};
