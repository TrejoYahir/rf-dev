import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  public colors: any[];
  public orderOptions: any;
  public selectedOption: any;

  constructor() {
    this.colors = [
      {
        name: 'red',
        code: 'rgb(203, 51, 49)',
        contrast: 'white',
        logo: '/assets/img/logo_rf.png',
        r: '/assets/img/rf.png',
        f: '/assets/img/ff.png',
        contactRender: '/assets/img/contact-r.gif',
        homeRender: '/assets/img/home-render-b.png',
        manifestRender: '/assets/img/manifest-right-r.gif'
      },
      {
        name: 'yellow',
        code: 'rgb(251, 251, 34)',
        contrast: 'black',
        logo: '/assets/img/logo_rf_black.png',
        r: '/assets/img/rfb.png',
        f: '/assets/img/ffb.png',
        contactRender: '/assets/img/contact-y.gif',
      },
      {
        name: 'blue',
        code: 'rgb(43, 91, 234)',
        contrast: 'white',
        logo: '/assets/img/logo_rf.png',
        r: '/assets/img/rf.png',
        f: '/assets/img/ff.png',
        homeRender: '/assets/img/home-render-r.png',
        manifestRender: '/assets/img/manifest-right-b.gif'
      }
    ];

    this.orderOptions = [
      {
        main: this.colors.find(x => x.name === 'blue').code,
        mainAccent: this.colors.find(x => x.name === 'red').code,
        counter: this.colors.find(x => x.name === 'red').code,
        counterSubtext: this.colors.find(x => x.name === 'yellow').code,
        description: this.colors.find(x => x.name === 'red').code,
        reel: this.colors.find(x => x.name === 'blue').code,
        portfolio: this.colors.find(x => x.name === 'red').code,
        contact: this.colors.find(x => x.name === 'yellow').code,
        contactAccent: this.colors.find(x => x.name === 'red').code,
        homeRender: this.colors.find(x => x.name === 'blue').homeRender,
        contactRender: this.colors.find(x => x.name === 'yellow').contactRender,
        manifestRender: this.colors.find(x => x.name === 'red').manifestRender,
      },
      {
        main: this.colors.find(x => x.name === 'red').code,
        mainAccent: this.colors.find(x => x.name === 'yellow').code,
        counter: this.colors.find(x => x.name === 'yellow').code,
        counterSubtext: this.colors.find(x => x.name === 'blue').code,
        description: this.colors.find(x => x.name === 'blue').code,
        reel: this.colors.find(x => x.name === 'yellow').code,
        portfolio: this.colors.find(x => x.name === 'yellow').code,
        contact: 'rgb(217, 53, 51)',
        contactAccent: 'white',
        homeRender: this.colors.find(x => x.name === 'red').homeRender,
        contactRender: this.colors.find(x => x.name === 'red').contactRender,
        manifestRender: this.colors.find(x => x.name === 'blue').manifestRender,
      }
    ];
    this.selectedOption = this.orderOptions[0];
  }

  public setPageColors(): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      const r = this.getRandomInt(0, 2);
      console.log(r);
      console.log('colors', this.orderOptions[r]);
      this.selectedOption = this.orderOptions[r];

      document.documentElement.style.setProperty('--color-main', this.orderOptions[r].main);
      document.documentElement.style.setProperty('--color-main-accent', this.orderOptions[r].mainAccent);
      document.documentElement.style.setProperty('--color-counter', this.orderOptions[r].counter);
      document.documentElement.style.setProperty('--color-counter-subtext', this.orderOptions[r].counterSubtext);
      document.documentElement.style.setProperty('--color-description', this.orderOptions[r].description);
      document.documentElement.style.setProperty('--color-reel', this.orderOptions[r].reel);
      document.documentElement.style.setProperty('--color-portfolio', this.orderOptions[r].portfolio);
      document.documentElement.style.setProperty('--color-contact', this.orderOptions[r].contact);
      document.documentElement.style.setProperty('--color-contact-accent', this.orderOptions[r].contactAccent);

      document.documentElement.style.setProperty('--color-yellow', this.colors.find(x => x.name === 'yellow').code);
      document.documentElement.style.setProperty('--color-blue', this.colors.find(x => x.name === 'blue').code);
      document.documentElement.style.setProperty('--color-red', this.colors.find(x => x.name === 'red').code);

      resolve();
    });
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
