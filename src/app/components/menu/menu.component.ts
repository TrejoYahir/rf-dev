import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MenuService} from '../../services/menu.service';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public menuItems: any[];
  public expanded: boolean;
  public activeSection: string;
  private isSmallPortrait: boolean;

  constructor(private router: Router, private menuService: MenuService, private breakPointObserver: BreakpointObserver) {
    const smallPortrait = ['(max-width: 575.98px)', Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait];
    this.isSmallPortrait = this.breakPointObserver.isMatched(smallPortrait);
    this.breakPointObserver.observe(smallPortrait).subscribe(
      (state: BreakpointState) => {
        this.isSmallPortrait = state.matches;
      });
    this.expanded = this.menuService.isExpanded.getValue();
    this.menuService.isExpanded
      .subscribe((expanded: boolean) => {
        this.expanded = expanded;
      });

    this.menuItems = [
      {
        name: 'About us',
        route: ['/seccion', 'about'],
        active: true
      },
      {
        name: 'Reel',
        route: ['/seccion', 'reel'],
        active: false
      },
      {
        name: 'Portfolio',
        route: ['/portfolio'],
        active: false
      },
      {
        name: 'Contact',
        route: ['/seccion', 'contact'],
        active: false
      }
    ];
    this.orderActive();
    this.menuService.currentSection
      .subscribe((section: string) => {
        this.activeSection = section;
        this.setActive(section);
      });
  }

  ngOnInit() {
  }

  setActive(name: string) {
    this.menuItems.map(x => x.active = false);
    const item = this.menuItems.find(x => x.name.toLowerCase() === name.toLowerCase());
    if (item) {
      item.active = true;
      setTimeout(this.orderActive.bind(this), 300);
    }
  }

  private orderActive() {
    this.menuItems = this.menuItems.sort(x => x.active ? -1 : 1);
    for (const item of this.menuItems) {
      if (this.isSmallPortrait) {
        item.size = 10 - (10 * this.menuItems.indexOf(item) + 1) / 10;
      } else {
        item.size = 4.5 - (4.5 * this.menuItems.indexOf(item) + 1) / 10;
      }
      item.opacity = 1 - (this.menuItems.indexOf(item) + 1) / 8;
    }
  }

  async goTo(item: any) {
    await this.router.navigate(item.route);
    this.menuService.toggleMenu();
    this.menuService.setActiveSection(item.name);
  }
}
