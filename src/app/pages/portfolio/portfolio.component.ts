import {Component, HostListener, OnInit} from '@angular/core';
import {PortfolioService} from '../../services/portfolio.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {VideoPlayerComponent} from '../../components/video-player/video-player.component';
import {MenuService} from '../../services/menu.service';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  public heightStyles: any;
  public portfolioItems: any[];
  public bsModalRef: BsModalRef;
  private isPhone: boolean;

  constructor(private portfolioService: PortfolioService,
              private modalService: BsModalService,
              private menuService: MenuService,
              private breakPointObserver: BreakpointObserver) {
    const isPhone = ['(max-width: 575.98px)', Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait, Breakpoints.HandsetLandscape];
    this.isPhone = this.breakPointObserver.isMatched(isPhone);
    this.breakPointObserver.observe(isPhone).subscribe(
      (state: BreakpointState) => {
        this.isPhone = state.matches;
      });
    this.portfolioItems = this.portfolioService.portfolioItems;
    this.heightStyles = {
      oneThird: innerHeight / 3,
      twoThirds: (innerHeight / 3) * 2,
      threeThirds: innerHeight
    };
  }

  ngOnInit() {
    this.menuService.setActiveSection('Portafolio');
  }

  openModalWithComponent(videoItem: any) {
    if (!this.isPhone) {
      const initialState = {videoItem};
      this.bsModalRef = this.modalService.show(VideoPlayerComponent, {initialState});
      this.bsModalRef.content.closeBtnName = 'Close';
    }
  }

  openModalMobile(videoItem: any) {
    if (this.isPhone) {
      const initialState = {videoItem};
      this.bsModalRef = this.modalService.show(VideoPlayerComponent, {initialState});
      this.bsModalRef.content.closeBtnName = 'Close';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.heightStyles = {
      oneThird: innerHeight / 3,
      twoThirds: (innerHeight / 3) * 2,
      threeThirds: innerHeight
    };
  }
}
