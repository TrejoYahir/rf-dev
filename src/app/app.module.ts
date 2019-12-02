import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ColorService} from './services/color.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {ComponentsModule} from './components/components.module';
import {ModalModule} from 'ngx-bootstrap';
import {VideoPlayerComponent} from './components/video-player/video-player.component';
import {HomeComponent} from './pages/home/home.component';

export function onInit(colorService: ColorService) {
  return () => colorService.setPageColors();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ComponentsModule,
    ModalModule.forRoot(),
  ],
  entryComponents: [
    HomeComponent,
    VideoPlayerComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: onInit,
      deps: [ColorService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
