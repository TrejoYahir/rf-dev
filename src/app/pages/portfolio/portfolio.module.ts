import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import {RouterModule, Routes} from '@angular/router';
import {ComponentsModule} from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: PortfolioComponent
  }
];

@NgModule({
  declarations: [PortfolioComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  exports: [PortfolioComponent]
})
export class PortfolioModule { }
