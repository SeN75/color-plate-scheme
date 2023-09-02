import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ColorsSchemeService {
  lightRGB = new Array(255, 255, 255);
  darkRGB = new Array(0, 0, 0);
  constructor() {


  }

  createSwatches(colorCode:string) {
  let nHex = colorCode.replace("#", "");
  let baseColor = this.longHexToDec(nHex);
  const colorValues = [];
  const collection = [];
  const opArray = new Array(0.1, 0.2, 0.4, 0.6, 0.8, 1.0, 0.75, 0.5, 0.25, 0.1);
  const labelArray = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
  ];
  for (let i = 0; i < 10; i++) {
    let nMask = i <= 5 ? this.lightRGB : this.darkRGB;
    let nColor = this.setColorHue(baseColor, opArray[i], nMask);
    nHex = this.toHex(nColor[0]) + this.toHex(nColor[1]) + this.toHex(nColor[2]);
    colorValues[i] = new Array();
    colorValues[i][0] = nHex;
    colorValues[i][1] = nColor;
    collection[i] = {
      label: labelArray[i],
      color: "#" + nHex,
      rgbColor: this.hexToRgb(nHex)
    };
  }
  return collection;
  }
   setColorHue(originColor: number[], opacityPercent: number, maskRGB:number[]) {
    const returnColor = new Array();
    for (let w = 0; w < originColor.length; w++)
      returnColor[w] =
        Math.round(originColor[w] * opacityPercent) +
        Math.round(maskRGB[w] * (1.0 - opacityPercent));
    return returnColor;
  }
   longHexToDec(longHex:string) {
    const r = this.toDec(longHex.substring(0, 2));
    const g = this.toDec(longHex.substring(2, 4));
    const b = this.toDec(longHex.substring(4, 6));
    return new Array(r, g, b);
  }
   toHex(dec:number) {
    let hex = dec.toString(16);
    if (hex.length == 1) hex = "0" + hex;
    if (+hex == 100) hex = "FF";
    return hex.toUpperCase();
  }

   toDec(hex:string) {
    return parseInt(hex, 16);
  }
  hexToRgb(hexColor: string) {
    const cleanedHexColor = hexColor.replace("#", "");

    const r = parseInt(cleanedHexColor.substring(0, 2), 16);
const g = parseInt(cleanedHexColor.substring(2, 4), 16);
const b = parseInt(cleanedHexColor.substring(4, 6), 16);
return {
  r,g,b,a: 1
}
  }
}
