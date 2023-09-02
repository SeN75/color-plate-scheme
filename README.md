# Angular Color Generator

**Angular Color Generator** is a versatile package for creating beautiful and harmonious color palettes in your Angular projects. It is designed to simplify the process of generating a color plate with 10 variations, ranging from lighter to darker shades, all derived from a single base color. This package is an adaptation of the original 'color-scheme-figma-plugin,' enhanced and modified to seamlessly integrate with Angular applications.

## Features

- **Easy Integration**: Integrate the color generator effortlessly into your Angular projects, ensuring compatibility and simplicity in usage.

- **Customizable Base Color**: Select your desired base color using a hexadecimal representation, and let the package generate variations for you.

- **10 Variations**: Generate a comprehensive color palette with 10 variations, allowing you to maintain visual harmony throughout your application.

- **Effortless Design Consistency**: Use the generated color palette consistently for UI elements, typography, charts, and more, ensuring a cohesive and professional look.

- **Time and Effort Savings**: Say goodbye to manual color calculations. This tool streamlines the process, saving you time and effort in color scheme design.

- **Optimized for Angular**: This package is tailored for Angular development, making it the ideal choice for designers and developers looking to enhance their color palette creation process in Angular applications.

## Usage

### Installation

First, install the `colors-scheme` library in your Angular project using npm or yarn:

```bash
npm install colors-scheme --save
# or
yarn add colors-scheme

```

### Example Usage in an Angular Component
Import the necessary modules and components in your Angular component and use the `ColorsSchemeService` to create a color palette from a base color:


```typescript
import { Component } from '@angular/core';
import { ColorsSchemeService } from 'colors-scheme';

@Component({
  selector: 'app-your-component',
  templateUrl: './your.component.html',
  styleUrls: ['./your.component.scss']
})
export class YourComponent {

  constructor(private colorsSrv: ColorsSchemeService) {
    // Create a color palette from a base color
    const palette = this.colorsSrv.createSwatches('#66CC99');

    // Output the generated color palette to the console
    console.log('Color Palette:', palette);
  }
}

```

In the above example, we import the `ColorsSchemeService` from the 'colors-scheme' library and use it to create a color palette (`palette`) from the base color `#66CC99`. You can replace `#66CC99` with any base color of your choice.


## Credits

This project builds upon and includes code from the following sources:

- `code.js` from the [color-scheme-figma-plugin](https://github.com/Hidetaro7/color-scheme-figma-plugin)
