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
    }),
  ],
  argTypes: {
    toggleElement: { action: 'toggleElement' }
  },
};

export default meta;
type Story = StoryObj<TreeviewComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const BasicUse: Story = {
  render: (args, context) => ({
    props: {
      ...args,
      onToggleChange: (event: any) => {
        console.log('Toggled element:', event);
      },
    },
    template: `
<odcp-treeview [data]="data"
              (toggleElement)="toggleElement($event)">
</odcp-treeview>
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

export const UseTemplates: Story = {
  render: (args, context) => ({
    props: {
      ...args,
      onToggleChange: (event: any) => {
        console.log('Toggled element:', event);
      },
    },
    template: `
<odcp-treeview [data]="data"
              (toggleElement)="toggleElement($event)">

    <ng-template #parentTemplate let-node>
      <strong>{{node.text}}</strong>
    </ng-template>

    <ng-template #singleTemplate let-node>
      <i>{{node.text}}</i>
    </ng-template>
</odcp-treeview>
    `,
  }),
  args: {
    data: [
      { items: [{text: 'Child Node 1'}, {text: 'Child Node 2'}], text: 'Parent Node 1' },
      { items: [{text: 'Child Node 3'}, {text: 'Child Node 4'}, {text: 'Subparent 1', items: [{text: 'Child Node 5'}]}], text: 'Parent Node 2' },
      { text: 'Single Node' },
    ] as TreeviewNode[],
  },
};

export const Filtering: Story = {
  render: (args, context) => ({
    props: {
      ...args,
      onToggleChange: (event: any) => {
        console.log('Toggled element:', event);
      },
    },
    template: `
<mat-form-field appearance="fill" floatLabel="auto">
  <mat-label>Filter nodes</mat-label>
  <input matInput [(ngModel)]="filterValue">

  <button *ngIf="filterValue" matSuffix mat-icon-button aria-label="Clear" (click)="filterValue=''">
    <mat-icon>close</mat-icon>
  </button>
</mat-form-field>

<odcp-treeview [data]="data"
                [filter]="filterValue"
              (toggleElement)="toggleElement($event)">

    <ng-template #parentTemplate let-node>
      <strong>{{node.text}}</strong>
    </ng-template>

    <ng-template #singleTemplate let-node>
      <i>{{node.text}}</i>
    </ng-template>
</odcp-treeview>
    `,
  }),
  args: {
    data: [
      { items: [{text: 'Child Node 1'}, {text: 'Child Node 2'}], text: 'Parent Node 1' },
      { items: [{text: 'Child Node 3'}, {text: 'Child Node 4'}, {text: 'Subparent 1', items: [{text: 'Child Node 5'}]}], text: 'Parent Node 2' },
      { text: 'Single Node' },
    ] as TreeviewNode[],
    filter: ''
  },
};
