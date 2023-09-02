import { Component, Inject } from '@angular/core';
import { ColorsSchemeService } from 'colors-scheme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(private colorsSrv: ColorsSchemeService) {

   const platte =  this.colorsSrv.createSwatches('#66CC99');

   console.log('color platte:: ', platte)
  }

}
