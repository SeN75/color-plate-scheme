import { Component, Inject, OnInit } from '@angular/core';
import { ColorsSchemeService } from 'colors-scheme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  constructor(private colorsSrv: ColorsSchemeService) {

  }
  ngOnInit(): void {
    this.colorsSrv.setTheme(
      { primary: '#248978', secondary: '#ff00ee', error: 'ff0000' },
      'theme-'
    );  }

  setLight() {
    this.colorsSrv.setLight();
  }
  setDark() {
    this.colorsSrv.setDark();
  }
  setDefault() {
    this.colorsSrv.clearTheme();
  }
  dd() {
    this.colorsSrv.setTheme(
      { primary: '#24dd78', secondary: '#f70eee', error: 'ff00dd' },
      'theme-'
    );
    }

}
