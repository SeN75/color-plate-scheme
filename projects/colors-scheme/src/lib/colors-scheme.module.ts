import { NgModule } from '@angular/core';
import { ColorPlate, ColorsSchemeComponent } from './colors-scheme.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ColorsSchemeComponent,
    ColorPlate
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ColorsSchemeComponent,
    ColorPlate

  ]
})
export class ColorsSchemeModule { }
