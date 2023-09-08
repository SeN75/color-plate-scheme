import { Component, Inject } from '@angular/core';
import { ColorsSchemeService } from 'colors-scheme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private colorsSrv: ColorsSchemeService) {
    this.colorsSrv.setTheme(
      { primary: '#248978', secondary: '#9900ff', warn: 'ff6600' },
      'theme-'
    );
  }

  setLight() {
    this.colorsSrv.setLight();
  }
  setDark() {
    this.colorsSrv.setDark();
  }
  setDefault() {
    this.colorsSrv.clearTheme();
  }
}
