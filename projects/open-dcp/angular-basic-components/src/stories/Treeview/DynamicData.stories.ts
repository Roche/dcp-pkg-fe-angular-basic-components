import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {TreeviewComponent, TreeviewNode} from "../../lib/treeview/treeview.component";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { Component, Input } from '@angular/core';

@Component({
  selector: 'odcp-dynamic-tree',
  template: `
    <odcp-treeview [data]="data" (toggleElement)="onToggle($event)">
    </odcp-treeview>
    `,
})
class DynamicTreeComponent {
  @Input() data: TreeviewNode[] = [];

  onToggle(event: any): void {
    if (!event.expanded) {
      return;
    }

    if (event.node.items) {
      return;
    }

    event.node.items = [{text: 'Child Node 5'}, {text: 'Child Node 6'}];

    this.data = structuredClone(this.data);
  }
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<TreeviewComponent> = {
  title: 'Treeview',
  component: TreeviewComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        FormsModule,
        NgIf,
        MatIconModule,
        MatButtonModule
      ],
      declarations: [DynamicTreeComponent]
    }),
  ],
  argTypes: {
    toggleElement: { action: 'toggleElement' }
  },
};

export default meta;
type Story = StoryObj<TreeviewComponent>;

export const DynamicData: Story = {
  render: (args, context) => ({
    props: args,
    template: `
      <odcp-dynamic-tree [data]="data">
      </odcp-dynamic-tree>
    `,
  }),
  args: {
    data: [
      { items: [{text: 'Child Node 1'}, {text: 'Child Node 2'}], text: 'Parent Node 1' },
      { items: [{text: 'Child Node 3'}, {text: 'Child Node 4'}], text: 'Parent Node 2' },
      { text: 'Single Node', hasItems: true },
    ] as TreeviewNode[],
  },
};
