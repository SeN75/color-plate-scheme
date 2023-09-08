import {
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ColorsSchemeService {
  private lightRGB = new Array(255, 255, 255);
  private darkRGB = new Array(0, 0, 0);
  private head!: ElementRef;

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    // Initialize the renderer with a null host and null engine (default values)
    this.renderer = rendererFactory.createRenderer(null, null);
    // Select the 'head' element in the DOM
    this.head = this.renderer.selectRootElement('head');
    // Check the local storage for the 'darkMode' setting
    const darkMode = localStorage['darkMode'];
    // Apply the appropriate theme based on the 'darkMode' setting in local storage
    if (darkMode === 'dark') this.setDark(); // Apply the dark mode theme
    else if (darkMode === 'light')
      this.setLight(); // Apply the light mode theme
    else this.setDefault(); // Apply the default theme if 'darkMode' is not set
  }
  /**
   * Create an array of color swatches based on the input color.
   *
   * @param color The base color used to generate the swatches.
   * @returns An array of color swatches.
   */
  createSwatches(colorCode: string) {
    let nHex = colorCode.replace('#', '');
    let baseColor = this.longHexToDec(nHex);
    const colorValues = [];
    const collection: Color[] = [];
    const opArray = new Array(
      0.1,
      0.2,
      0.4,
      0.6,
      0.8,
      1.0,
      0.75,
      0.5,
      0.25,
      0.1
    );
    const labelArray = [
      '50',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
    ];
    for (let i = 0; i < 10; i++) {
      let nMask = i <= 5 ? this.lightRGB : this.darkRGB;
      let nColor = this.setColorHue(baseColor, opArray[i], nMask);
      nHex =
        this.toHex(nColor[0]) + this.toHex(nColor[1]) + this.toHex(nColor[2]);
      colorValues[i] = new Array();
      colorValues[i][0] = nHex;
      colorValues[i][1] = nColor;
      const rgbColor = this.hexToRgb(nHex);
      let { r, b, g } = rgbColor;
      let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      collection[i] = {
        name: labelArray[i],
        hex: '#' + nHex,
        rgb: rgbColor,
        darkContrast: luma > 155,
      };
    }
    return collection;
  }

  private setColorHue(
    originColor: number[],
    opacityPercent: number,
    maskRGB: number[]
  ) {
    const returnColor = new Array();
    for (let w = 0; w < originColor.length; w++) {
      returnColor[w] =
        Math.round(+originColor[w] * +opacityPercent) +
        Math.round(+maskRGB[w] * (1.0 - +opacityPercent));
    }
    return returnColor;
  }
  private longHexToDec(longHex: string) {
    const r = this.toDec(longHex.substring(0, 2));
    const g = this.toDec(longHex.substring(2, 4));
    const b = this.toDec(longHex.substring(4, 6));
    return new Array(r, g, b);
  }
  toHex(dec: number) {
    let hex = dec.toString(16);
    if (hex.length == 1) hex = '0' + hex;
    if (+hex == 100) hex = 'FF';
    return hex.toUpperCase();
  }

  toDec(hex: string) {
    return parseInt(hex, 16);
  }
  hexToRgb(hexColor: string) {
    const cleanedHexColor = hexColor.replace('#', '');
    const r = parseInt(cleanedHexColor.substring(0, 2), 16);
    const g = parseInt(cleanedHexColor.substring(2, 4), 16);
    const b = parseInt(cleanedHexColor.substring(4, 6), 16);
    return {
      r,
      g,
      b,
      a: 1,
    };
  }
  /**
   * Generate a color plate based on the input color and name.
   *
   * @param colorh Te base color used to generate the color plate.
   * @param name The name associated with the color plate.
   * @returns An array of color swatches with names, hex values, and dark contrast values.
   */
  generatePlate(color: string) {
    const plate = this.createSwatches(color);
    if (plate.length == 10) {
      plate.push({
        name: 'A100',
        hex: plate[0].hex,
        darkContrast: plate[0].darkContrast,
        rgb: plate[0].rgb,
      });
      plate.push({
        name: 'A200',
        hex: plate[2].hex,
        darkContrast: plate[2].darkContrast,
        rgb: plate[2].rgb,
      });
      plate.push({
        name: 'A400',
        hex: plate[5].hex,
        rgb: plate[5].rgb,
        darkContrast: plate[5].darkContrast,
      });
      plate.push({
        name: 'A700',
        hex: plate[7].hex,
        rgb: plate[7].rgb,
        darkContrast: plate[7].darkContrast,
      });
    }
    return plate;
  }
  /**
   * Update the theme colors for a given theme variant.
   *
   * This method updates the theme colors in the global CSS variables for a specified
   * theme variant, allowing dynamic theming of your application. It iterates through
   * an array of color objects, setting corresponding CSS variables for each color's
   * name and dark contrast properties.
   *
   * @param colors An array of color objects containing the colors to update the theme with.
   * @param theme The theme variant name (e.g., 'primary', 'accent', 'warn') to update.
   * @param prefix Optional prefix to add to the CSS variable names (useful for theming multiple components).
   */
  updateTheme(colors: Color[], theme: string, prefix = '') {
    let style = document.querySelector('style[id="color-theme"]');
    if (!style) {
      style = this.renderer.createElement('style');
      style?.setAttribute('id', 'color-theme');
    }
    let styleString = '';
    colors.forEach((color) => {
      styleString += `--${prefix}${theme}-${color.name}: ${
        color.hex
      }; --${prefix}${theme}-contrast-${color.name}: ${
        color.darkContrast ? 'rgba(black, 0.87)' : '#ffffff'
      };`;
    });
    if (style!.innerHTML == '') style!.innerHTML = `:root {${styleString}}`;
    else {
      const styleContent = style?.innerHTML.replace('}', styleString + '}');
      style!.innerHTML = styleContent!;
    }
    this.renderer.appendChild(this.head, style);
  }

  /**
   *
   * Clears any custom color theme styles applied to the application.
   * If a custom color theme style exists, it will remove it; otherwise,
   * it will create an empty style block with the specified ID.
   * This method is used to reset the color theme to its default state.
   */
  clearTheme() {
    let style = document.querySelector('style[id="color-theme"]');
    if (!style) {
      style = this.renderer.createElement('style');
      style?.setAttribute('id', 'color-theme');
    }
    style!.innerHTML = ':root{}';
  }
  /**
   * Set and apply custom themes for different color variants.
   *
   * This method allows you to set and apply custom themes for different color variants.
   * It takes an object of color values and their corresponding keys, generates color plates
   * based on these values, and updates the theme for each color variant.
   *
   * @param colors An object containing key-value pairs of color names and their values.
   * @param prefix Optional prefix to add to the CSS variable names (useful for theming multiple components).
   */
  setTheme(colors: { [key: string]: string }, prefix = '') {
    const keys = Object.keys(colors);
    keys.forEach((key) => {
      const colorSet = this.generatePlate(colors[key]);
      this.updateTheme(colorSet, key, prefix);
    });
  }

  /**
   * Sets the application to use the light mode theme.
   */
  setLight() {
    // Check if the 'color-scheme' meta tag exists in the DOM
    let colorMeta = document.querySelector('meta[name="color-scheme"]');

    // If the 'color-scheme' meta tag doesn't exist, create it
    if (!colorMeta) {
      colorMeta = this.renderer.createElement('meta');
      // Append the 'color-scheme' meta tag to the 'head' element
      this.renderer.appendChild(this.head, colorMeta);
    }

    // Set the 'name' and 'content' attributes of the 'color-scheme' meta tag
    colorMeta!.setAttribute('name', 'color-scheme');
    colorMeta!.setAttribute('content', 'light');

    // Update the 'darkMode' setting in local storage to 'light'
    localStorage['darkMode'] = 'light';
  }

  /**
   * Sets the application to use the dark mode theme.
   */
  setDark() {
    // Check if the 'color-scheme' meta tag exists in the DOM
    let colorMeta = document.querySelector('meta[name="color-scheme"]');
    // If the 'color-scheme' meta tag doesn't exist, create it
    if (!colorMeta) {
      colorMeta = this.renderer.createElement('meta');
      // Append the 'color-scheme' meta tag to the 'head' element
      this.renderer.appendChild(this.head, colorMeta);
    }
    // Set the 'name' and 'content' attributes of the 'color-scheme' meta tag
    colorMeta!.setAttribute('name', 'color-scheme');
    colorMeta!.setAttribute('content', 'dark');
    // Update the 'darkMode' setting in local storage to 'dark'
    localStorage['darkMode'] = 'dark';
  }
  /**
   * Sets the default theme for the application when 'darkMode' is not specified or is invalid.
   */
  private setDefault() {
    // Check if the 'color-scheme' meta tag exists in the DOM
    let colorMeta = document.querySelector('meta[name="color-scheme"]');
    // If the 'color-scheme' meta tag doesn't exist, create it
    if (!colorMeta) {
      colorMeta = this.renderer.createElement('meta');
      // Append the 'color-scheme' meta tag to the 'head' element
      this.renderer.appendChild(this.head, colorMeta);
    }
    // Set the 'name' and 'content' attributes of the 'color-scheme' meta tag
    colorMeta!.setAttribute('name', 'color-scheme');
    colorMeta!.setAttribute('content', 'dark light');
  }
}
interface Color {
  name: string;
  hex: string;
  rgb: { r: number; b: number; g: number; a: number };
  darkContrast: boolean;
}
