import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { HomePageModule } from './pages/home/home.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HomePageModule, HttpClientModule],
  providers: [
    AppVersion,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
