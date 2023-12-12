import { Injectable } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class InAppbrowserService {

  constructor(private iab: InAppBrowser) { }

  open(url: string, target = '_system') {
    return this.iab.create(url, target);
  }
}
