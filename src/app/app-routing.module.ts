import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seccion/:section', component: HomeComponent },
  { path: 'portfolio', loadChildren: './pages/portfolio/portfolio.module#PortfolioModule' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
