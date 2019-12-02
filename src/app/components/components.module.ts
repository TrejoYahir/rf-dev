import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoaderComponent} from './loader/loader.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import {PipesModule} from '../pipes/pipes.module';
import { MenuComponent } from './menu/menu.component';
import {RouterModule} from '@angular/router';
import { MenuToggleComponent } from './menu-toggle/menu-toggle.component';

@NgModule({
  declarations: [
    LoaderComponent,
    VideoPlayerComponent,
    MenuComponent,
    MenuToggleComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule,
  ],
  exports: [
    LoaderComponent,
    VideoPlayerComponent,
    MenuComponent,
    MenuToggleComponent
  ]
})
export class ComponentsModule { }
