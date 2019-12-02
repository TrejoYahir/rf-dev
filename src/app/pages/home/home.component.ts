import {AfterViewInit, Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CounterService} from '../../services/counter.service';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {MenuService} from '../../services/menu.service';
import {ColorService} from '../../services/color.service';
import {VideoPlayerComponent} from '../../components/video-player/video-player.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public zoom: number;
  public studioTextPosition: number;
  public parallaxScroll: number;
  public mainSectionHeight: number;
  public descriptionSectionSizes: any;
  public counterSectionSizes: any;
  public reelSectionSizes: any;
  public contactSectionSizes: any;
  public lastScroll: number;
  public counterItems: any[];
  public descFloatingPositions: any;
  public isSmallPortrait: boolean;
  public isSmallLandscape: boolean;
  public rPosition: number;
  public videoPosition: number;
  public counterStarted: boolean;
  public section: string;
  public bsModalRef: BsModalRef;
  public sideScroll: any;
  public loading: boolean;

  @ViewChild('mainSection', {static: false}) public mainSection: ElementRef;
  @ViewChild('descriptionSection', {static: false}) public descriptionSection: ElementRef;
  @ViewChild('counterSection', {static: false}) public counterSection: ElementRef;
  @ViewChild('reelSection', {static: false}) public reelSection: ElementRef;
  @ViewChild('contactSection', {static: false}) public contactSection: ElementRef;
  @ViewChild('video', {static: true}) public video: ElementRef;
  @ViewChild('videoMask', {static: true}) public videoMask: ElementRef;
  @ViewChild('colorMask', {static: true}) public colorMask: ElementRef;
  @ViewChild('reelVideo', {static: true}) public reelVideo: ElementRef;
  @ViewChild('canvas', {static: true}) public canvas: ElementRef;

  constructor(private counterService: CounterService,
              private renderer: Renderer2,
              private ngZone: NgZone,
              private breakPointObserver: BreakpointObserver,
              public route: ActivatedRoute,
              private location: Location,
              private menuService: MenuService,
              public colorService: ColorService,
              private modalService: BsModalService) {

    this.loading = true;

    // general variables
    const smallPortrait = ['(max-width: 575.98px)', Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait];
    const smallLandscape = [Breakpoints.HandsetLandscape];
    this.isSmallPortrait = this.breakPointObserver.isMatched(smallPortrait);
    this.isSmallLandscape = this.breakPointObserver.isMatched(smallLandscape);
    this.breakPointObserver.observe(smallPortrait).subscribe(
      (state: BreakpointState) => {
        this.isSmallPortrait = state.matches;
      });
    this.breakPointObserver.observe(smallLandscape).subscribe(
      (state: BreakpointState) => {
        this.isSmallLandscape = state.matches;
      });
    console.log('small landscape', this.isSmallLandscape);
    this.lastScroll = 0;
    this.counterSectionSizes = {
      start: 0,
      height: 0,
      end: 0
    };
    this.descriptionSectionSizes = {...this.counterSectionSizes};
    this.reelSectionSizes = {...this.counterSectionSizes};
    this.contactSectionSizes = {...this.counterSectionSizes};
    // generic parallax
    this.parallaxScroll = 0;
    // main section stuff
    this.zoom = 0;
    this.rPosition = 0;
    this.videoPosition = 0;
    this.studioTextPosition = 0;

    // counter stuff
    this.counterItems = [...this.counterService.getCounterItems()].map(x => {
      return {...x, quantity: 0};
    });
    this.counterStarted = false;

    // side scrolling stuff
    this.sideScroll = {
      rockan: 0,
      fella: 0,
      reel: 0
    };

    // description stuff
    this.descFloatingPositions = this.getDescPositions();

    // reel stuff

  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(async () => {

      this.setSizes();
      this.route.paramMap.subscribe(params => {
        this.section = params.get('section');
        this.ngZone.runOutsideAngular(() => {
          this.location.replaceState('');
          switch (this.section) {
            case 'reel': {
              setTimeout(() =>
                this.reelSection.nativeElement.scrollIntoView({
                  block: 'start'}
                ), 0);
              break;
            }
            case 'contact': {
              setTimeout(() =>
                this.contactSection.nativeElement.scrollIntoView({
                  block: 'start'}
                ), 0);
              break;
            }
            case 'about': {
              setTimeout(() =>
                this.descriptionSection.nativeElement.scrollIntoView({
                  block: 'start'}
                ), 0);
              break;
            }
            default: {
              break;
            }
          }
        });
      });

      this.video.nativeElement.muted = true;
      this.video.nativeElement.loop = true;
      this.video.nativeElement.src = 'https://rockanfella.s3.amazonaws.com/video.mp4';
      try {
        await this.video.nativeElement.play();
        this.loading = false;
      } catch (e) {
        console.log('video error', e);
        await this.video.nativeElement.play();
        this.loading = false;
      }

      this.reelVideo.nativeElement.muted = true;
      this.reelVideo.nativeElement.loop = true;
      await this.reelVideo.nativeElement.play();

    });
  }

  @HostListener('window:resize', ['$event'])
  setSizes() {
    this.mainSectionHeight = this.mainSection.nativeElement.scrollHeight;

    this.counterSectionSizes.start = this.counterSection.nativeElement.offsetTop;
    this.counterSectionSizes.height = this.counterSection.nativeElement.scrollHeight;
    this.counterSectionSizes.end = this.counterSectionSizes.start + this.counterSectionSizes.height;

    this.descriptionSectionSizes.start = this.descriptionSection.nativeElement.offsetTop;
    this.descriptionSectionSizes.height = this.descriptionSection.nativeElement.scrollHeight;
    this.descriptionSectionSizes.end = this.descriptionSectionSizes.start + this.descriptionSectionSizes.height;

    this.reelSectionSizes.start = this.reelSection.nativeElement.offsetTop;
    this.reelSectionSizes.height = this.reelSection.nativeElement.scrollHeight;
    this.reelSectionSizes.end = this.reelSectionSizes.start + this.reelSectionSizes.height;

    this.contactSectionSizes.start = this.contactSection.nativeElement.offsetTop;
    this.contactSectionSizes.height = this.contactSection.nativeElement.scrollHeight;
    this.contactSectionSizes.end = this.contactSectionSizes.start + this.contactSectionSizes.height;

    this.rPosition = 0;
    this.videoPosition = 0;
    if (this.isSmallPortrait || this.isSmallLandscape) {
      this.studioTextPosition = 0;
    } else {
      this.studioTextPosition = (this.mainSectionHeight / 1.4) - this.parallaxScroll / 1.2;
    }
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandles(event) {
    // get current scroll
    const scrollTop = event.target.scrollingElement.scrollTop;
    const baseScroll = (scrollTop - scrollTop / 2);

    // first section zoom scroll
    if (scrollTop < this.mainSectionHeight) {
      // zoom style for main R and parallax style for main section
      // this.zoomStyles['background-size'] = `calc(40% + ${this.zoom}px), cover`;
      if (!this.isSmallPortrait && !this.isSmallLandscape) {
        this.videoPosition = scrollTop;
        this.ngZone.runOutsideAngular(() => {
          const scrollZoom = (scrollTop - this.lastScroll) / 100;

          this.zoom = this.zoom < 1 ? 1 : this.zoom + scrollZoom;

          let size = this.zoom;

          if (scrollTop > (innerHeight * 3) - 100) {
            size = 20;
          }
          // const fontSize = 30 + scrollTop / 5;
          this.renderer.setStyle(
            this.videoMask.nativeElement,
            'transform',
            `scale(${size})`
          );
          this.renderer.setStyle(
            this.colorMask.nativeElement,
            'transform',
            `scale(${size})`
          );
        });
        // const ctx = this.canvas.nativeElement.getContext('2d');
        // ctx.font = `500 ${fontSize}vw GoboldBold, sans-serif`;
        // this.rPosition = (this.mainSectionHeight / 8) + baseScroll;
      }

      // parallax text scroll
      this.parallaxScroll = (scrollTop - scrollTop / 2.4);
      if (!this.isSmallPortrait && !this.isSmallLandscape) {
        this.studioTextPosition = (this.mainSectionHeight / 1.4) - this.parallaxScroll / 1.2;
      }

    }

    if (!this.isSmallPortrait && scrollTop > this.counterSectionSizes.start - event.target.scrollingElement.clientHeight / 2) {
      // counter stuff
      if (!this.counterStarted) {
        this.counterStarted = true;
        this.startCounters();
      }
    }

    if (this.isSmallPortrait && scrollTop > this.counterSectionSizes.start - event.target.scrollingElement.clientHeight / 4) {
      // counter stuff
      if (!this.counterStarted) {
        this.counterStarted = true;
        this.startCounters();
      }
    }

    // side scrolling texts
    const firstScrollStart = this.counterSectionSizes.start + event.target.scrollingElement.clientHeight / 4;
    const secondScrollStart = this.reelSectionSizes.start - event.target.scrollingElement.clientHeight / 4;
    if (this.lastScroll === 0) {
      this.lastScroll = scrollTop - 1;
    }

    let sideScroll: number;

    if (this.isSmallPortrait) {
      sideScroll = (scrollTop - this.lastScroll) / 3;
    } else {
      sideScroll = scrollTop - this.lastScroll;
    }

    if (scrollTop > firstScrollStart && scrollTop < secondScrollStart) {
      this.sideScroll.rockan = this.sideScroll.rockan < 0 ? 0 : this.sideScroll.rockan + sideScroll / 1.25;
      this.sideScroll.fella = this.sideScroll.fella < 0 ? 0 : this.sideScroll.fella + sideScroll / 1.25;
    }
    if (scrollTop > secondScrollStart) {
      this.sideScroll.fella = this.sideScroll.fella < 0 ? 0 : this.sideScroll.fella - sideScroll / 1.25;
      this.sideScroll.reel = this.sideScroll.reel < 0 ? 0 : this.sideScroll.reel + sideScroll / 1.25;
    }

    // scroll parallax for reel
    if (scrollTop > this.descriptionSectionSizes.start && scrollTop < this.reelSectionSizes.end) {
      this.parallaxScroll = (scrollTop - scrollTop / 2);
      this.ngZone.runOutsideAngular(() => {
        if (this.isSmallLandscape || this.isSmallPortrait) {
          const position = this.reelSectionSizes.end - scrollTop * 1.1;
          this.renderer.setStyle(
            this.reelVideo.nativeElement,
            'clip-path', `ellipse(200px 200px at 41% ${position}px)`);
          this.renderer.setStyle(
            this.reelVideo.nativeElement,
            '-webkit-clip-path', `ellipse(200px 200px at 41% ${position}px)`);
        }
      });
    }

    this.lastScroll = scrollTop;
    // console.log('event', event);
    // console.log('scrollTop', scrollTop);
    // console.log('clientHeight', event.target.scrollingElement.clientHeight);
    // console.log('offsetHeight', event.target.scrollingElement.offsetHeight);
    if (scrollTop > this.descriptionSectionSizes.start && scrollTop < this.descriptionSectionSizes.end) {
      this.menuService.setActiveSection('About us');
    }
    if (scrollTop > this.reelSectionSizes.start && scrollTop < this.reelSectionSizes.end) {
      this.menuService.setActiveSection('Reel');
    }
    if (scrollTop >= this.contactSectionSizes.start) {
      this.menuService.setActiveSection('Contact');
    }
  }

  holeMouseMove(event: MouseEvent) {
    this.ngZone.runOutsideAngular(() => {
      if (!this.isSmallLandscape && !this.isSmallPortrait) {
        const x = event.layerX;
        const y = event.layerY;
        this.renderer.setStyle(
          this.reelVideo.nativeElement,
          'clip-path', `ellipse(200px 200px at ${x}px ${y}px)`);
        this.renderer.setStyle(
          this.reelVideo.nativeElement,
          '-webkit-clip-path', `ellipse(200px 200px at ${x}px ${y}px)`);
      }
    });
  }

  parallaxMouseMove(event: any) {
    this.ngZone.runOutsideAngular(() => {
      const parallaxElements = event.target.getElementsByClassName('parallax-layer');
      for (let i = 0; i < parallaxElements.length; i++) {
        const parallaxDepth = 100 * parallaxElements[i].dataset.depth;
        const translate = `translate(${ event.clientX / parallaxDepth }%, ${ event.clientY / parallaxDepth }%)`;
        this.renderer.setStyle(
          parallaxElements[i],
          'transform',
          translate
        );
      }
    });
  }

  getDescPositions() {
    const r = {
      x: this.randomIntFromInterval(5, 20),
      y: this.randomIntFromInterval(10, 25),
    };
    const f = {
      x: r.x + 15,
      y: r.y + 30,
    };
    const d1 = {
      x: f.x,
      y: f.y - 20,
    };
    const d2 = {
      x: r.x - 5,
      y: r.y + 35,
    };
    return {r, f, d1, d2};
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private startCounters() {

    const minTimer = 50;
    const duration = 2500;

    for (let i = 0; i < this.counterItems.length; i++) {
      if (this.counterItems[i].interval) {
        clearInterval(this.counterItems[i].interval);
        this.counterItems[i].interval = null;
      }
      const start = this.counterItems[i].quantity;
      let end = Math.round(this.counterService.getCounterItems()[i].quantity / 2);
      if (this.counterItems[i].expanded) {
        end = this.counterService.getCounterItems()[i].quantity;
      }

      const range = end - start;

      let stepTime = Math.abs( Math.floor(duration / end));
      stepTime = Math.max(stepTime, minTimer);

      const startTime = new Date().getTime();
      const endTime = startTime + duration;

      const run = () => {
        const now = new Date().getTime();
        const remaining = Math.max((endTime - now) / duration, 0);
        const value = Math.round(end - (remaining * range));
        this.counterItems[i].quantity = value;
        if (value === end) {
          clearInterval(this.counterItems[i].interval);
          this.counterItems[i].interval = null;
        }
      };

      this.counterItems[i].interval = setInterval(run, stepTime);
      run();

    }
  }

  private startCounter(item: any, original: any, index: number) {

    const minTimer = 50;
    const duration = 1000;

    const start = item.quantity;
    const end = original.quantity;
    const range = end - start;
    let stepTime = Math.abs( Math.floor(duration / end));
    stepTime = Math.max(stepTime, minTimer);
    const startTime = new Date().getTime();
    const endTime = startTime + duration;

    const run = () => {
      const now = new Date().getTime();
      const remaining = Math.max((endTime - now) / duration, 0);
      const value = Math.round(end - (remaining * range));
      item.quantity = value;
      if (value === end) {
        clearInterval(this.counterItems[index].interval);
        this.counterItems[index].interval = null;
      }
    };

    this.counterItems[index].interval = setInterval(run, stepTime);
    run();
  }

  resizeCounter() {
    this.counterItems = [...this.counterService.getCounterItems()];
  }

  expandItem(item: any) {
    if (!item.expanded) {
      this.counterItems.map(x => x.expanded = false);
      item.expanded = true;
      const original = this.counterService.getCounterItems().find((x) => x.text === item.text);
      const index = this.counterItems.indexOf(item);
      if (this.counterItems[index].interval) {
        clearInterval(this.counterItems[index].interval);
        this.counterItems[index].interval = null;
      }
      item.quantity = Math.round(original.quantity / 2);
      this.startCounter(item, original, index);
    }
  }

  switchCounter(direction: number) {
    const index = this.counterItems.findIndex(x => x.expanded);
    const item = this.counterItems[index + direction];
    if (item) {
      this.expandItem(item);
    }
  }

  openReelVideo() {
    const videoItem = {video: 'https://player.vimeo.com/video/373527358?autoplay=1'};
    const initialState = {videoItem};
    this.bsModalRef = this.modalService.show(VideoPlayerComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
