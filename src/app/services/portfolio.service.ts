import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  public portfolio: any;
  public portfolioItems: any[];

  constructor() {
    this.portfolioItems = [];
    this.portfolio = [
      {
        items: [
          {
            name: 'REEL ON AIR C3',
            image: 'https://i.vimeocdn.com/video/831678814_1280x720.jpg',
            video: 'https://player.vimeo.com/video/373527358?autoplay=1'
          },
        ],
        name: 'On air'
      },
      {
        items: [
          {
            name: 'DEMO RF DIGITAL',
            image: 'https://i.vimeocdn.com/video/831678675_1280x720.jpg',
            video: 'https://player.vimeo.com/video/373527154?autoplay=1'
          },
        ],
        name: 'Digital'
      },
      {
        items: [
          {
            name: 'Pasarela ilusión: evento',
            image: 'http://i.vimeocdn.com/video/645365379_1280x720.jpg',
            video: 'https://player.vimeo.com/video/225907425?autoplay=1'
          },
        ],
        name: 'Animation'
      },
      {
        items: [
          {
            name: 'Plan perfecto',
            image: 'http://i.vimeocdn.com/video/622437085_1280x720.jpg',
            video: 'https://player.vimeo.com/video/207377837?autoplay=1'
          },
        ],
        name: 'Original'
      },
      {
        items: [
          {
            name: 'Samsung Galaxy S7',
            image: 'http://i.vimeocdn.com/video/622446188_1280x720.jpg',
            video: 'https://player.vimeo.com/video/207377899?autoplay=1'
          },
          {
            name: 'REEL MUSICA',
            image: 'https://i.vimeocdn.com/video/783300111_1280x720.jpg',
            video: 'https://player.vimeo.com/video/288245798?autoplay=1'
          },
          {
            name: 'MASTER EL ROW 20S ALTA',
            image: 'https://i.vimeocdn.com/video/783262275_1280x720.jpg',
            video: 'https://player.vimeo.com/video/336424445?autoplay=1'
          },
          {
            name: 'PANTENE - CAMILA SODI',
            image: 'https://i.vimeocdn.com/video/783303513_1280x720.jpg',
            video: 'https://player.vimeo.com/video/336442599?autoplay=1'
          },
        ],
        name: 'Branded Content'
      }
    ];
    for (const category of this.portfolio) {
      this.portfolioItems.push(this.getCategoryItems(category)[0]);
    }
    this.portfolioItems = this.portfolioItems.map(x => {
      const total = this.portfolioItems.length;
      const index = this.portfolioItems.indexOf(x);
      const isFirst = index === 0;
      const isLast = index === total - 1;
      return {...x, index, total, isFirst, isLast};
    });
    this.portfolioItems = this.shuffle(this.portfolioItems);
    console.log(this.portfolioItems);
  }

  private getCategoryItems(category: any) {
    return category.items.map(x => {
      return {...x, belongsTo: category.name};
    });
  }

  private shuffle(array) {
    return array
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

}
