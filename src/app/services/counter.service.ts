import { Injectable } from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private isSmallPortrait: boolean;
  private isSmallLandscape: boolean;
  constructor(private breakPointObserver: BreakpointObserver) {

    const portraitBreakpoints = ['(max-width: 575.98px)', Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait];
    this.isSmallPortrait = this.breakPointObserver.isMatched(portraitBreakpoints);
    this.breakPointObserver.observe(portraitBreakpoints)
      .subscribe((state: BreakpointState) => this.isSmallPortrait = state.matches);
    this.isSmallLandscape = this.breakPointObserver.isMatched(Breakpoints.HandsetLandscape);
    this.breakPointObserver.observe(Breakpoints.HandsetLandscape)
      .subscribe((state: BreakpointState) => this.isSmallLandscape = state.matches);
  }

  private getRandom(min, max) {
    const value = Math.floor(Math.random() * (max - min)) + min;
    return this.isSmallPortrait ? value * 2 : this.isSmallLandscape ? value * 1.5 : value;
  }

  public getCounterItems() {
    return [
      {
        expanded: false,
        quantity: 688,
        quantifier: 'TV shows',
        text: '',
        hasDivider: true,
        dividerLength: this.getRandom(10, 17),
        dividerTop: this.getRandom(0, 6),
        textDirection: 'center'
      },
      {
        expanded: true,
        quantity: 3448,
        quantifier: 'Shooting days',
        text: '',
        hasDivider: true,
        dividerLength: this.getRandom(10, 17),
        dividerTop: this.getRandom(0, 6),
        textDirection: 'center'
      },
      {
        expanded: false,
        quantity: 525,
        quantifier: 'Spots',
        text: '',
        hasDivider: true,
        dividerLength: this.getRandom(10, 17),
        dividerTop: this.getRandom(0, 6),
        textDirection: 'center'
      },
      {
        expanded: false,
        quantity: 14,
        quantifier: 'Years',
        text: '',
        hasDivider: false,
        dividerLength: 0,
        dividerTop: 0,
        textDirection: 'left'
      },
    ];
  }
}
