import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private expanded: boolean;
  public isExpanded: BehaviorSubject<boolean>;

  private activeSection: string;
  public currentSection: BehaviorSubject<string>;

  constructor() {
    this.expanded = false;
    this.isExpanded = new BehaviorSubject<boolean>(this.expanded);

    this.activeSection = 'Rockanfella';
    this.currentSection = new BehaviorSubject<string>(this.activeSection);
  }

  public toggleMenu() {
    this.expanded = !this.expanded;
    this.isExpanded.next(this.expanded);
  }

  public setActiveSection(section: string) {
    this.activeSection = section;
    this.currentSection.next(section);
  }

}
