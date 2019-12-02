import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {PortfolioService} from '../../services/portfolio.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  public videoItem: any;
  public extraItems: any[];

  constructor(public modalRef: BsModalRef, private portfolioService: PortfolioService) {
    console.log(this.videoItem);
  }

  ngOnInit() {
    console.log(this.videoItem);
    this.extraItems = [];
    if (this.videoItem.belongsTo) {
      this.getExtraItems();
    }
  }

  hideModal() {
    this.modalRef.hide();
  }

  getExtraItems() {
    this.extraItems = [];
    const category: any = this.portfolioService.portfolio.find(x => x.name === this.videoItem.belongsTo);
    let items = [...category.items];
    items = [...items.filter(x => x.name !== this.videoItem.name)];
    this.extraItems.push(...items);
    console.log('category', category);
  }

  setVideo(item: any) {
    this.videoItem.name = item.name;
    this.videoItem.video = item.video;
    this.getExtraItems();
  }
}
