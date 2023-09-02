import { NgModule } from '@angular/core';
import { ColorPlate, ColorsSchemeComponent } from './colors-scheme.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ColorsSchemeComponent,
    ColorPlate
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ColorsSchemeComponent,
    ColorPlate

  ]
})
export class ColorsSchemeModule { }
