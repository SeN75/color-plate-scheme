# Angular Color Generator

**Angular Color Generator** is a versatile package for creating beautiful and harmonious color palettes in your Angular projects. It is designed to simplify the process of generating a color plate with 10 variations, ranging from lighter to darker shades, all derived from a single base color. This package is an adaptation of the original 'color-scheme-figma-plugin,' enhanced and modified to seamlessly integrate with Angular applications.

## Features

- **Easy Integration**: Integrate the color generator effortlessly into your Angular projects, ensuring compatibility and simplicity in usage.

- **Customizable Base Color**: Select your desired base color using a hexadecimal representation, and let the package generate variations for you.

- **10 Variations**: Generate a comprehensive color palette with 10 variations, allowing you to maintain visual harmony throughout your application.

- **Effortless Design Consistency**: Use the generated color palette consistently for UI elements, typography, charts, and more, ensuring a cohesive and professional look.

- **Time and Effort Savings**: Say goodbye to manual color calculations. This tool streamlines the process, saving you time and effort in color scheme design.

- **Optimized for Angular**: This package is tailored for Angular development, making it the ideal choice for designers and developers looking to enhance their color palette creation process in Angular applications.

- **Angular Material and Tailwind Support:** Enjoy seamless compatibility with Angular Material and Tailwind CSS, enhancing your ability to create stunning and consistent designs in these popular frameworks.

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
import { Component } from "@angular/core";
import { ColorsSchemeService } from "colors-scheme";

@Component({
  selector: "app-your-component",
  templateUrl: "./your.component.html",
  styleUrls: ["./your.component.scss"],
})
export class YourComponent {
  constructor(private colorsSrv: ColorsSchemeService) {
    // Create a color palette from a base color
    const palette = this.colorsSrv.createSwatches("#66CC99");

    // Output the generated color palette to the console
    console.log("Color Palette:", palette);
  }
}
```

In the above example, we import the `ColorsSchemeService` from the 'colors-scheme' library and use it to create a color palette (`palette`) from the base color `#66CC99`. You can replace `#66CC99` with any base color of your choice.


## `setTheme()`

Set and apply custom themes for different color variants. This method allows you to set and apply custom themes for different color variants. It takes an object of color values and their corresponding keys, generates color plates based on these values, and updates the theme for each color variant.

**Parameters**

- `colors`: An object containing key-value pairs of color names and their values..
- `prefix`: Optional prefix to add to the CSS variable names (useful for theming multiple components)
  **Usage:**

```typescript
import { Component } from "@angular/core";
import { ColorsSchemeService } from "colors-scheme";

@Component({
  selector: "app-your-component",
  templateUrl: "./your.component.html",
  styleUrls: ["./your.component.scss"],
})
export class YourComponent {
  constructor(private colorsSrv: ColorsSchemeService) {
    this.colorsSrv.setTheme({ primary: "#248978", secondary: "#9900ff" }, "theme-");
  }
}
```

This method is responsible for configuring the color variant within the `index.html` file. It accomplishes this by creating a `<style>` tag and defining variables within it. These variables can then be utilized within the project's style files to ensure consistency in the color scheme.

**Example**

```html
<html>
  <head>
    <style id="color-theme">
      :root {
        --theme-primary-50: #f0ebf5;
         --theme-primary-100: #e0d5e9;
         --theme-primary-200: #c1abd3;
         --theme-primary-300: #a182bd;
         --theme-primary-400: #8258a7;
         --theme-primary-500: #632e91;
         --theme-primary-600: #4a236d;
         --theme-primary-700: #321749;
         --theme-primary-800: #190c24;
         --theme-primary-900: #0a050f;
         --theme-primary-a100: #f0ebf5;
         --theme-primary-a200: #632e91;
         --theme-primary-a400: #4a236d;
         --theme-primary-a700: #190c24;
         --theme-primary-contrast-50: #000;
         --theme-primary-contrast-100: #000;
         --theme-primary-contrast-200: #000;
         --theme-primary-contrast-300: #000;
         --theme-primary-contrast-400: #000;
         --theme-primary-contrast-500: #fff;
         --theme-primary-contrast-600: #fff;
         --theme-primary-contrast-700: #fff;
         --theme-primary-contrast-800: #fff;
         --theme-primary-contrast-900: #fff;
         --theme-primary-contrast-a100: #000;
         --theme-primary-contrast-a200: #fff;
         --theme-primary-contrast-a400: #fff;
         --theme-primary-contrast-a700: #fff;
      }
    </style>
  </head>
</html>
```

#### Angular material

If your project utilizes Material Angular and relies on custom themes, our library offers an advanced dynamic styling system that enhances your styling capabilities. This system enables you to efficiently manage and customize Material themes, ensuring a seamless integration of your unique design preferences into your application.

By following the instructions provided below, you can seamlessly incorporate this library to extend the functionality of Material Angular, allowing you to create and apply custom Material themes tailored specifically to your project's needs. This empowers you to achieve a cohesive and visually appealing user interface while maintaining consistency and ease of styling throughout your application.

```scss
$primary-custom: (
  50: var(--theme-primary-50),
  100: var(--theme-primary-100),
  200: var(--theme-primary-200),
  300: var(--theme-primary-300),
  400: var(--theme-primary-400),
  500: var(--theme-primary-500),
  600: var(--theme-primary-600),
  700: var(--theme-primary-700),
  800: var(--theme-primary-800),
  900: var(--theme-primary-900),
  A100: var(--theme-primary-A100),
  A200: var(--theme-primary-A200),
  A400: var(--theme-primary-A400),
  A700: var(--theme-primary-A700),
  contrast: (
    50: var(--theme-primary-contrast-50),
    100: var(--theme-primary-contrast-100),
    200: var(--theme-primary-contrast-200),
    300: var(--theme-primary-contrast-300),
    400: var(--theme-primary-contrast-400),
    500: var(--theme-primary-contrast-500),
    600: var(--theme-primary-contrast-600),
    700: var(--theme-primary-contrast-700),
    800: var(--theme-primary-contrast-800),
    900: var(--theme-primary-contrast-900),
    A100: var(--theme-primary-contrast-A100),
    A200: var(--theme-primary-contrast-A200),
    A400: var(--theme-primary-contrast-A400),
    A700: var(--theme-primary-contrast-A700),
  ),
);
$secondary-custom: (
  50: var(--theme-secondary-50),
  100: var(--theme-secondary-100),
  200: var(--theme-secondary-200),
  300: var(--theme-secondary-300),
  400: var(--theme-secondary-400),
  500: var(--theme-secondary-500),
  600: var(--theme-secondary-600),
  700: var(--theme-secondary-700),
  800: var(--theme-secondary-800),
  900: var(--theme-secondary-900),
  A100: var(--theme-secondary-A100),
  A200: var(--theme-secondary-A200),
  A400: var(--theme-secondary-A400),
  A700: var(--theme-secondary-A700),
  contrast: (
    50: var(--theme-secondary-contrast-50),
    100: var(--theme-secondary-contrast-100),
    200: var(--theme-secondary-contrast-200),
    300: var(--theme-secondary-contrast-300),
    400: var(--theme-secondary-contrast-400),
    500: var(--theme-secondary-contrast-500),
    600: var(--theme-secondary-contrast-600),
    700: var(--theme-secondary-contrast-700),
    800: var(--theme-secondary-contrast-800),
    900: var(--theme-secondary-contrast-900),
    A100: var(--theme-secondary-contrast-A100),
    A200: var(--theme-secondary-contrast-A200),
    A400: var(--theme-secondary-contrast-A400),
    A700: var(--theme-secondary-contrast-A700),
  ),
);
$error-custom: (
  50: var(--theme-error-50),
  100: var(--theme-error-100),
  200: var(--theme-error-200),
  300: var(--theme-error-300),
  400: var(--theme-error-400),
  500: var(--theme-error-500),
  600: var(--theme-error-600),
  700: var(--theme-error-700),
  800: var(--theme-error-800),
  900: var(--theme-error-900),
  A100: var(--theme-error-A100),
  A200: var(--theme-error-A200),
  A400: var(--theme-error-A400),
  A700: var(--theme-error-A700),
  contrast: (
    50: var(--theme-error-contrast-50),
    100: var(--theme-error-contrast-100),
    200: var(--theme-error-contrast-200),
    300: var(--theme-error-contrast-300),
    400: var(--theme-error-contrast-400),
    500: var(--theme-error-contrast-500),
    600: var(--theme-error-contrast-600),
    700: var(--theme-error-contrast-700),
    800: var(--theme-error-contrast-800),
    900: var(--theme-error-contrast-900),
    A100: var(--theme-error-contrast-A100),
    A200: var(--theme-error-contrast-A200),
    A400: var(--theme-error-contrast-A400),
    A700: var(--theme-error-contrast-A700),
  ),
);

$my-primary: mat.define-palette($primary-custom, 500);
$my-accent: mat.define-palette($secondary-custom, 500);
$my-warn: mat.define-palette($error-custom);
```

**Attention: Important Styling Notice**
**Issues Detected:**

1. **Text Button Color**: There are issues with the text button color.
2. **Checkbox Mark Color**: The checkbox mark color is not displaying correctly.

**Recommended Steps to Resolve:** To address these issues and ensure proper color styling in your project, please follow these steps:

**For Text Button Color:**

```scss
.mat-mdc-unelevated-button.mat-primary {
  --mdc-filled-button-label-text-color: var(--theme-primary-contrast-500) !important;
}
.mat-mdc-raised-button.mat-primary {
  --mdc-protected-button-label-text-color: var(--theme-primary-contrast-500) !important;
}
.mat-mdc-unelevated-button.mat-accent {
  --mdc-filled-button-label-text-color: var(--theme-secondary-contrast-500) !important;
}
.mat-mdc-raised-button.mat-accent {
  --mdc-protected-button-label-text-color: var(--theme-secondary-contrast-500) !important;
}
```

**For Checkbox Mark Color:**

```scss
.mat-mdc-checkbox.mat-primary {
  --mdc-checkbox-selected-checkmark-color: var(--theme-primary-contrast-500) !important;
}
.mat-mdc-checkbox.mat-accent {
  --mdc-checkbox-selected-checkmark-color: var(--theme-secondary-contrast-500) !important;
}
```

These CSS rules will help you correct the text button and checkbox mark color issues. Please ensure that you apply these styles appropriately within your project's stylesheet.

#### Tailwind

Furthermore, if your project leverages the `tailwind` CSS framework, you can also harness the advantages of this library to streamline your styling process. To seamlessly integrate it into your project, please follow these straightforward steps within your `tailwind.config.js` file:

```js
/**
 * This is an example configuration for integrating the library with the Tailwind CSS framework.
 * You can extend your project's color palette by following this structure inside your 'tailwind.config.js' file.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: "var(--theme-primary-50)",
          100: "var(--theme-primary-100)",
          200: "var(--theme-primary-200)",
          300: "var(--theme-primary-300)",
          400: "var(--theme-primary-400)",
          500: "var(--theme-primary-500)",
          600: "var(--theme-primary-600)",
          700: "var(--theme-primary-700)",
          800: "var(--theme-primary-800)",
          900: "var(--theme-primary-900)",
          A100: "var(--theme-primary-A100)",
          A200: "var(--theme-primary-A200)",
          A400: "var(--theme-primary-A400)",
          A700: "var(--theme-primary-A700)",

          // Contrast colors for text and background
          contrast: {
            50: "var(--theme-primary-contrast-50)",
            100: "var(--theme-primary-contrast-100)",
            200: "var(--theme-primary-contrast-200)",
            300: "var(--theme-primary-contrast-300)",
            400: "var(--theme-primary-contrast-400)",
            500: "var(--theme-primary-contrast-500)",
            600: "var(--theme-primary-contrast-600)",
            700: "var(--theme-primary-contrast-700)",
            800: "var(--theme-primary-contrast-800)",
            900: "var(--theme-primary-contrast-900)",
            A100: "var(--theme-primary-contrast-A100)",
            A200: "var(--theme-primary-contrast-A200)",
            A400: "var(--theme-primary-contrast-A400)",
            A700: "var(--theme-primary-contrast-A700)",
          },
        },
      },
    },
  },
  important: true, // This setting ensures that these styles take precedence
  plugins: [],
};
```

---

## `setLight()`

This method effectively configures the application to utilize the light mode theme, ensuring a visually pleasing and well-illuminated user interface. When this theme is applied, it enhances readability and maintains a consistent, inviting appearance throughout the application. By invoking this method, you ensure that users experience a bright and comfortable visual environment tailored to their needs.

**Usage:**

```typescript
import { Component } from "@angular/core";
import { ColorsSchemeService } from "colors-scheme";

@Component({
  selector: "app-your-component",
  templateUrl: "./your.component.html",
  styleUrls: ["./your.component.scss"],
})
export class YourComponent {
  constructor(private colorsSrv: ColorsSchemeService) {
    this.colorsSrv.setLight();
  }
}
```

## `setDark()`

This method efficiently configures the application to adopt the dark mode theme, resulting in an interface that is visually sophisticated and conducive to low-light environments. When applied, this theme enhances contrast and readability while creating an immersive and elegant user experience. By invoking this method, you ensure that users can comfortably navigate and interact with your application, even in dimly lit settings.

**Usage:**

```typescript
import { Component } from "@angular/core";
import { ColorsSchemeService } from "colors-scheme";
@Component({
  selector: "app-your-component",
  templateUrl: "./your.component.html",
  styleUrls: ["./your.component.scss"],
})
export class YourComponent {
  constructor(private colorsSrv: ColorsSchemeService) {
    this.colorsSrv.setDark();
  }
}
```

**Notice:**
If you do not explicitly set the theme using `setLight()` or `setDark()`, the system will apply the default theme.

---

## `clearTheme()`

Clears any custom color theme styles applied to the application. If a custom color theme style exists, it will remove it; otherwise, it will create an empty style block with the specified ID. This method is used to reset the color theme to its default state.

**Usage:**

```typescript
import { Component } from "@angular/core";
import { ColorsSchemeService } from "colors-scheme";
@Component({
  selector: "app-your-component",
  templateUrl: "./your.component.html",
  styleUrls: ["./your.component.scss"],
})
export class YourComponent {
  constructor(private colorsSrv: ColorsSchemeService) {
    this.colorsSrv.clearTheme();
  }
}
```

---

## `generatePlate()`

Generate a color palette based on the provided input color and name. This function facilitates the creation of a customized color scheme by allowing you to specify both the primary color and a meaningful name. This palette serves as a cornerstone for consistent and aesthetically pleasing design throughout your application, providing a versatile tool for harmonizing your visual elements.

**Parameters**

- `color`: The base color used to generate the color plate.
  **Return**
  An array of color swatches with names, hex values, and dark contrast values

**Usage:**

```typescript
import { Component } from "@angular/core";
import { ColorsSchemeService } from "colors-scheme";
@Component({
  selector: "app-your-component",
  templateUrl: "./your.component.html",
  styleUrls: ["./your.component.scss"],
})
export class YourComponent {
  constructor(private colorsSrv: ColorsSchemeService) {
    this.colorsSrv.generatePlate("#632E91");
  }
}
```

## Credits

This project builds upon and includes code from the following sources:

- `code.js` from the [color-scheme-figma-plugin](https://github.com/Hidetaro7/color-scheme-figma-plugin)
