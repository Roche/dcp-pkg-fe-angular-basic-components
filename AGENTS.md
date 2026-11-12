# AGENTS.md - Angular Basic Components

## Project Overview

**@open-dcp/angular-basic-components** is a **reusable Material Design component library** built on Angular 17, hosting fundamental UI components wrapped with Open DCP styling. This is an **ng-packagr library** meant for publication and consumption by other Angular applications.

## Architecture

### Project Structure
```
angular-basic-components/
├── projects/open-dcp/angular-basic-components/src/
│   ├── lib/              # Core components folder
│   ├── components.ts     # Public component export barrel
│   ├── pages.ts          # Page layout component exports
│   ├── stories/          # Storybook stories for documentation
│   ├── public-api.ts     # Main entry point for library
│   └── styles.scss       # Global library styles
├── angular.json          # Angular CLI & build config
└── package.json          # Dependencies & scripts
```

### Key Characteristics
- **Standalone Components**: All components use `standalone: true` (Angular 17+)
- **Material-First**: Built on @angular/material 17.3.10
- **ViewEncapsulation.None**: All components disable view encapsulation for stylesheet cascading
- **Storybook-Ready**: Full Storybook 8.6 integration with Angular addon
- **ng-packagr Build**: Produces npm package with Ivy format

## Development Workflow

### Build & Watch
```bash
npm install                  # Install all dependencies (including nested)
npm run watch              # Watch mode: ng build --watch --configuration development
npm run build              # Production build: ng build
npm run storybook          # Launch Storybook dev server
npm run build-storybook    # Build static Storybook site
npm test                   # Run Karma + Jasmine tests
```

### Development Server
- Storybook is the primary dev environment (not `ng serve`)
- Each component should have a `.stories.ts` file in `stories/` folder
- MSW (Mock Service Worker) configured for API mocking in stories

## Component Patterns

### Standard Component Template
```typescript
// projects/open-dcp/angular-basic-components/src/lib/your-component/
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'odcp-your-component',           // 'odcp-' prefix convention
  standalone: true,
  templateUrl: './your-component.component.html',
  styleUrls: ['./your-component.component.scss'],
  imports: [CommonModule, MatButtonModule],
  encapsulation: ViewEncapsulation.None       // Key: No encapsulation
})
export class YourComponent {
  @Input() label: string = '';
}
```

### Export Pattern (public-api.ts)
```typescript
// src/public-api.ts
export * from './lib/your-component/your-component.component';
export * from './lib/button/button.component';
```

## Key Dependencies & Integration

### Material Integration
- **@angular/material 17.3.10**: Use Material form controls, dialogs, etc.
- **@angular/cdk 17.3.10**: Overlay, text selection, platform utilities
- **@angular/animations 17.3.0**: Required for Material animations

### Styling
- **@open-dcp/angular-styles**: Provides DCP design tokens via SCSS
- **@open-dcp/styles**: Base typography, colors, utilities
- All components inherit Open DCP theme automatically (no encapsulation)

### Angular Core
- **@angular/forms 17.3.0**: ReactiveFormsModule, NgIf, etc.
- **@angular/common 17.3.0**: CommonModule for *ngIf, *ngFor

## Storybook Setup

### Story File Convention
Place stories in `projects/open-dcp/angular-basic-components/src/stories/`:
```typescript
import { Meta, StoryObj } from '@storybook/angular';
import { YourComponent } from '../lib/your-component/your-component.component';

const meta: Meta<YourComponent> = {
  title: 'Components/Your Component',
  component: YourComponent,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Click Me' }
};
```

### Running Stories
- `npm run storybook` - Dev server on http://localhost:6006
- Edit component → Story updates hot-reload
- MSW addon intercepts API calls for mocking

## Testing

### Test File Location
Place tests colocated: `your-component.component.spec.ts` next to component file

### Karma Configuration
- Uses `karma.conf.js` with Chrome launcher
- Coverage reports to `coverage/` folder
- Jasmine for test framework

### Example Test
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YourComponent } from './your-component.component';

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## Common Patterns

### 1. **Reactive Form Integration**
```typescript
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
})
export class FormComponent {
  control = new FormControl('');
}
```

### 2. **Two-Way Binding**
```typescript
export class InputComponent {
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  
  onInput(val: string) {
    this.valueChange.emit(val);
  }
}
```

### 3. **Material Styling Defaults**
- Use `MatFormField` wrapper for inputs (handles label, errors)
- Use `MatError` for error messages
- Use `MatLabel` for labeling
- All Material components auto-inherit theme colors

## Library Build Output

### Distribution
```
dist/@open-dcp/angular-basic-components/
├── lib/
│   ├── *.component.d.ts    # Type definitions
│   └── *.component.js      # Compiled JavaScript (Ivy)
├── public-api.d.ts         # Main API types
├── package.json            # npm metadata
└── README.md
```

### Consuming in Apps
```typescript
// In consuming app's module
import { YourComponent } from '@open-dcp/angular-basic-components';

export const appConfig: ApplicationConfig = {
  providers: [
    // YourComponent already standalone, just import
  ]
};
```

## Pitfalls & Solutions

| Issue | Solution |
|-------|----------|
| Styles not cascading | Verify `encapsulation: ViewEncapsulation.None` |
| Material icons missing | Import `MatIconModule` in component |
| Build fails with ts errors | Run `npm install` to ensure nested install completes |
| Stories not updating | Restart Storybook server; check import paths |
| @open-dcp/styles not found | Ensure `preinstall` script runs; check package versions match |

## Publishing Workflow

1. Bump version in `package.json`
2. Run `npm run build` (produces optimized dist/)
3. Publish to npm registry (via CI/CD)
4. Test in consuming apps: `npm install @open-dcp/angular-basic-components@latest`

## References

- **Entry point**: `projects/open-dcp/angular-basic-components/src/public-api.ts`
- **ng-packagr config**: `package.json` (implicitly used by ng-packagr)
- **Angular CLI**: `angular.json` for build configuration
- **Storybook config**: `.storybook/` (root or implicit)

