import {
  ElementRef,
  Injectable,
  OnInit,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ColorsSchemeService implements OnInit{
  private lightRGB = new Array(255, 255, 255);
  private darkRGB = new Array(0, 0, 0);
  private head!: any;

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2)  {
    // Initialize the renderer with a null host and null engine (default values)
    this.renderer = rendererFactory.createRenderer(null, null);

  }
  ngOnInit(): void {
 // Select the 'head' element in the DOM
 // Check the local storage for the 'darkMode' setting
 const darkMode = localStorage['darkMode'];
 // Apply the appropriate theme based on the 'darkMode' setting in local storage
//  if (darkMode === 'dark') this.setDark(); // Apply the dark mode theme
//  else if (darkMode === 'light')
//    this.setLight(); // Apply the light mode theme
//  else this.setDefault(); // Apply the default theme if 'darkMode' is not set
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
    const collectionLight: Color[] = [];
    const collectionDark: Color[] = [];
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
      let nMaskLight = i <= 5 ? this.lightRGB : this.darkRGB;
      let nMaskDark = i <= 5 ? this.darkRGB : this.lightRGB;
      let nColorLight = this.setColorHue(baseColor, opArray[i], nMaskLight);
      let nColorDark = this.setColorHue(baseColor, opArray[i], nMaskDark);

      let nHexLight =  this.toHex(nColorLight[0]) + this.toHex(nColorLight[1]) + this.toHex(nColorLight[2]);
      let nHexDark =  this.toHex(nColorDark[0]) + this.toHex(nColorDark[1]) + this.toHex(nColorDark[2]);



      const rgbColorlight = this.hexToRgb(nHexLight);
      const rgbColorDark = this.hexToRgb(nHexDark);

      collectionLight[i] = {
        name: labelArray[i],
        hex: '#' + nHexLight,
        rgb: rgbColorlight,
        darkContrast: this.calculateContrast(nHexLight) > 155,
      };
      collectionDark[i] = {
        name: labelArray[i],
        hex: '#' + nHexDark,
        rgb: rgbColorDark,
        darkContrast: this.calculateContrast(nHexDark) > 155,
      };

    }

    return {light: collectionLight, dark: collectionDark};
  }
 private calculateContrast(color: string) {
  let { r, b, g } = this.hexToRgb(color);
  let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma
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
    if (plate.light.length == 10) {
      plate.light.push({
        name: 'A100',
        hex: plate.light[0].hex,
        darkContrast: plate.light[0].darkContrast,
        rgb: plate.light[0].rgb,
      });
      plate.light.push({
        name: 'A200',
        hex: plate.light[2].hex,
        darkContrast: plate.light[2].darkContrast,
        rgb: plate.light[2].rgb,
      });
      plate.light.push({
        name: 'A400',
        hex: plate.light[5].hex,
        rgb: plate.light[5].rgb,
        darkContrast: plate.light[5].darkContrast,
      });
      plate.light.push({
        name: 'A700',
        hex: plate.light[7].hex,
        rgb: plate.light[7].rgb,
        darkContrast: plate.light[7].darkContrast,
      });
    }
    if (plate.dark.length == 10) {
      plate.dark.push({
        name: 'A100',
        hex: plate.dark[0].hex,
        darkContrast: plate.dark[0].darkContrast,
        rgb: plate.dark[0].rgb,
      });
      plate.dark.push({
        name: 'A200',
        hex: plate.dark[2].hex,
        darkContrast: plate.dark[2].darkContrast,
        rgb: plate.dark[2].rgb,
      });
      plate.dark.push({
        name: 'A400',
        hex: plate.dark[5].hex,
        rgb: plate.dark[5].rgb,
        darkContrast: plate.dark[5].darkContrast,
      });
      plate.dark.push({
        name: 'A700',
        hex: plate.dark[7].hex,
        rgb: plate.dark[7].rgb,
        darkContrast: plate.dark[7].darkContrast,
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
  updateTheme(colors: {light: Color[], dark: Color[]}, theme: string, prefix = '') {
    this.head = document.querySelector('head');
    let styleLight = document.querySelector('style[id="color-theme-light"]');
    let styleDark = document.querySelector('style[id="color-theme-dark"]');
    if (!styleLight) {
      styleLight = this.renderer.createElement('style');
      styleLight?.setAttribute('id', 'color-theme-light');
      // console.log('style ==> ', styleLight)
    }
    if (!styleDark) {
      styleDark = this.renderer.createElement('style');
      styleDark?.setAttribute('id', 'color-theme-dark');
      // console.log('style ==> ', styleLight)
    }

    let styleStringLight = '';
    let styleStringDark = '';
    colors.light.forEach((color) => {
      styleStringLight += `--${prefix}${theme}-${color.name}: ${
        color.hex
      }; --${prefix}${theme}-contrast-${color.name}: ${
        color.darkContrast ? 'rgba(0,0,0, 0.87)' : '#ffffff'
      };`;
    });

    colors.dark.forEach(color => {
      styleStringDark += `--${prefix}${theme}-${color.name}: ${
        color.hex
      }; --${prefix}${theme}-contrast-${color.name}: ${
        color.darkContrast ? 'rgba(0,0,0, 0.87)' : '#ffffff'
      };`;
    })

    if (styleLight!.innerHTML == '') styleLight!.innerHTML = `:root {${styleStringLight}}`;
    else {
      const styleContent = styleLight?.innerHTML.replace('}', styleStringLight + '}');
      styleLight!.innerHTML = styleContent!;
    }
    if(styleDark!.innerHTML == '') styleDark!.innerHTML = `
    html.dark  {
        ${styleStringDark}
    }
    `
    else {
      const styleContent = styleDark?.innerHTML.replace(/\}/g, styleStringDark + '}');
      styleDark!.innerHTML = styleContent!;
    }
    this.renderer.appendChild(this.head, styleLight);
    this.renderer.appendChild(this.head, styleDark);
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
    this.head = document.querySelector('head');

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
    document.querySelector('html')?.classList.remove('dark')
  }

  /**
   * Sets the application to use the dark mode theme.
   */
   setDark() {
    // Check if the 'color-scheme' meta tag exists in the DOM
    let colorMeta = document.querySelector('meta[name="color-scheme"]');
    this.head = document.querySelector('head');

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
    document.querySelector('html')?.classList.add('dark')

  }
  /**
   * Sets the default theme for the application when 'darkMode' is not specified or is invalid.
   */
  private setDefault() {
    // Check if the 'color-scheme' meta tag exists in the DOM
    let colorMeta = document.querySelector('meta[name="color-scheme"]');
    this.head = document.querySelector('head')!;

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
