import { Component, OnInit } from '@angular/core';
import {MenuService} from '../../services/menu.service';

@Component({
  selector: 'app-menu-toggle',
  templateUrl: './menu-toggle.component.html',
  styleUrls: ['./menu-toggle.component.scss']
})
export class MenuToggleComponent implements OnInit {
  public expanded: boolean;

  constructor(public menuService: MenuService) {
    this.expanded = this.menuService.isExpanded.getValue();
    this.menuService.isExpanded
      .subscribe((expanded: boolean) => {
        this.expanded = expanded;
      });
  }

  ngOnInit() {
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }

}
