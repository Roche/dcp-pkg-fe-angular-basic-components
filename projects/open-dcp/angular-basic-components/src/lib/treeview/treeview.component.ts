import {
  Component, ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges, TemplateRef,
} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatTreeModule, MatTreeNestedDataSource} from '@angular/material/tree';
import {MatIcon} from '@angular/material/icon';
import {NestedTreeControl} from '@angular/cdk/tree';
import {NgIf, NgTemplateOutlet} from '@angular/common';

/**
 * Represents a single node within the Treeview.
 * @interface TreeviewNode
 */
export interface TreeviewNode {
  /** The display label for the node. */
  text: string;
  /** Optional array of child nodes for nested hierarchies. */
  items?: TreeviewNode[];
  /** Optional boolean to suggest child nodes are present can be requested on demand  */
  hasItems?: boolean;
}

/**
 * @component TreeviewComponent
 * @description
 * A highly customizable, standalone Angular Treeview component built on top of `MatTree`.
 * It supports nested hierarchies and provides `ContentChild` hooks for custom templating
 * of both leaf (single) and parent (branch) nodes.
 * * @example
 * // Basic Usage in HTML:
 * // <app-treeview [data]="myTreeData" (toggleElement)="onNodeToggle($event)"></app-treeview>
 * * // Advanced Usage with Custom Templates:
 * // <app-treeview [data]="myTreeData">
 * //   <ng-template #singleTemplate let-node>
 * //     <span class="custom-leaf">{{ node.text }} (File)</span>
 * //   </ng-template>
 * //   <ng-template #parentTemplate let-node>
 * //     <strong class="custom-folder">{{ node.text }} (Folder)</strong>
 * //   </ng-template>
 * // </app-treeview>
 */
@Component({
  selector: 'odcp-treeview',
  standalone: true,
  imports: [
    MatTreeModule,
    MatIcon,
    MatIconButton,
    NgIf,
    NgTemplateOutlet
  ],
  template: `
    <mat-tree [dataSource]="treeViewData"
              [treeControl]="treeControl"
              class="odcp-treeview">
      <mat-tree-node *matTreeNodeDef="let node" matTreeNodeToggle>
        <ng-container *ngIf="singleTemplate; else defaultSingle">
          <ng-container *ngTemplateOutlet="singleTemplate; context: { $implicit: node }"></ng-container>
        </ng-container>
        <ng-template #defaultSingle>{{node.text}}</ng-template>
      </mat-tree-node>
      <mat-nested-tree-node *matTreeNodeDef="let node; when: hasChildren">
        <div class="mat-tree-node">
          <button mat-icon-button matTreeNodeToggle
                  (click)="toggle(node)"
                  [attr.aria-label]="'Toggle ' + node.text">
            <mat-icon class="mat-icon-rtl-mirror">
              {{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}
            </mat-icon>
          </button>
          <ng-container *ngIf="parentTemplate; else defaultParent">
            <ng-container *ngTemplateOutlet="parentTemplate; context: { $implicit: node }"></ng-container>
          </ng-container>
          <ng-template #defaultParent>{{node.text}}</ng-template>
        </div>
        <!-- There is inline padding applied to this div using styles.
            This padding value depends on the mat-icon-button width.  -->
        <div [class.odcp-treeview--invisible]="!treeControl.isExpanded(node)"
             role="group" class="odcp-treeview_group">
          <ng-container matTreeNodeOutlet></ng-container>
        </div>
      </mat-nested-tree-node>
    </mat-tree>
  `
})

export class TreeviewComponent implements OnChanges {
  /**
   * The hierarchical data source to be rendered in the tree.
   * @input
   * @default []
   */
  @Input() data: TreeviewNode[] = [];
  /**
   * Control object that manages the expansion state of the tree nodes.
   * Can be provided externally to control the tree programmatically.
   * @input
   * @default NestedTreeControl
   */
  @Input() treeControl = new NestedTreeControl<TreeviewNode>(node => node.items);
  /**
   * Filter input string
   * @input
   * @dafault ''
   */
  @Input() filter: string = '';
  /**
   * Event emitted when a parent node is expanded or collapsed.
   * @output
   * @returns {{expanded: boolean, node: TreeviewNode}} Object containing the new state and the affected node.
   */
  @Output() toggleElement: EventEmitter<{expanded: boolean, node: TreeviewNode}> = new EventEmitter();
  /**
   * Custom template provided by the consumer to render leaf nodes (nodes without children).
   * Reference via `#singleTemplate`.
   * @contentChild
   */
  @ContentChild('singleTemplate') singleTemplate?: TemplateRef<any>;
  /**
   * Custom template provided by the consumer to render parent nodes (nodes with children).
   * Reference via `#parentTemplate`.
   * @contentChild
   */
  @ContentChild('parentTemplate') parentTemplate?: TemplateRef<any>;

  treeViewData = new MatTreeNestedDataSource<TreeviewNode>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['filter']) {
      const expandedKeys = this.captureExpandedKeys();
      this.applyFilter();
      this.treeControl.dataNodes = this.treeViewData.data;
      this.restoreExpansion(this.treeViewData.data, expandedKeys);
    }
  }

  private captureExpandedKeys(): Set<string> {
    const keys = new Set<string>();
    for (const node of this.treeControl.expansionModel.selected) {
      keys.add(node.text);
    }
    return keys;
  }

  private restoreExpansion(nodes: TreeviewNode[], expandedKeys: Set<string>): void {
    for (const node of nodes) {
      if (expandedKeys.has(node.text)) {
        this.treeControl.expand(node);
      }
      if (node.items?.length) {
        this.restoreExpansion(node.items, expandedKeys);
      }
    }
  }

  private applyFilter() {
    const filterText = this.filter?.toLowerCase().trim();

    if (!filterText) {
      this.treeViewData.data = [...(this.data || [])];
      return;
    }

    this.treeViewData.data = this.filterRecursive(this.data, filterText);
  }

  /**
   * Recursively filters nodes. A parent is kept if it matches OR if any of its children match.
   */
  private filterRecursive(nodes: TreeviewNode[], query: string): TreeviewNode[] {
    return nodes
      .map(node => ({ ...node })) // Clone to avoid mutating original data
      .filter(node => {
        const hasMatchingChildren = node.items && this.filterRecursive(node.items, query).length > 0;
        const matchesText = node.text.toLowerCase().includes(query);

        if (hasMatchingChildren) {
          // Keep the node and update its items to only show matching children (if any)
          node.items = this.filterRecursive(node.items!, query);
          return true;
        }

        return matchesText;
      });
  }

  toggle(node: TreeviewNode) {
    this.toggleElement.emit({node, expanded: this.treeControl.isExpanded(node)});
  }

  /** If the element has child items or has children flag enabled, 
   * in both cases we will add chevron so that dynamic data can be fetched */
  hasChildren = (_: number, node: TreeviewNode) => (!!node.items && node.items.length > 0) || node.hasItems;
}
