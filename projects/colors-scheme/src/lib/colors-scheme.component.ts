import { Component, OnInit} from '@angular/core';
import { ColorsSchemeService } from './colors-scheme.service';

@Component({
  selector: 'lib-colors-scheme',
  template: `

    <section>


    <div class="" #content>
      <sen-color-plate></sen-color-plate>
    </div>
    </section>

  `,
  styles: [
  ]
})
export class ColorsSchemeComponent {

}

@Component({
  selector: 'sen-color-plate',
  styles: [`

    section {
      display:flex;
      gap: 1rem;
      width: 100%;
      height: auto;
    }
    .default-color {
        width: 150px;
        height: 150px;
        position: relative;
      }
      .color-variant{
        width:100%;
        display:flex;

      }
      .color-variant > div {
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
      }
      .color-variant > div > div{
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
      }

  `],
  template: `
    <section>
      <div class="default-color"  (click)="colorInput.click()" style="background-color:  {{scheme[4].hex}}; t">
        <input hidden type="color" #colorInput [(ngModel)]="baseColor" (ngModelChange)="colorsPlate()">
      </div>
      <div class="colors-container">
          <div class="color-name">
            <input>
            <!--replace with icons -->
            <button>delete</button>
          </div>
          <nav class="color-variant">
            <div *ngFor="let s of scheme">
              <div [style.background]="s.hex" [style.color]="!s.darkContrast ? '#fff' : '#1e1e1e'">
                {{s.name}}
              </div>
              {{s.name}}
            </div>
          </nav>
      </div>

    </section>


  `
})
export class ColorPlate implements OnInit  {
  baseColor = '#ff0000';
  scheme: any []  =[]
  constructor(private colorSrv: ColorsSchemeService) {}
  ngOnInit(): void {
    this.colorsPlate()
  }
  colorsPlate() {
    const test = this.colorSrv.createSwatches(this.baseColor)
   this.scheme =  this.colorSrv.createSwatches(this.baseColor).dark;

   console.log('test ==> ', test)
  }
}
