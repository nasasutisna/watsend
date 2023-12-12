import { Injectable } from '@angular/core';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { Platform } from '@ionic/angular';
import { InstantWaApiService } from '../../api/instant-wa/instant-wa-api.service';
import { AlertService } from '../../library/alert/alert.service';
import { InAppbrowserService } from '../../library/in-appbrowser/in-appbrowser.service';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(
    private instantWaApiService: InstantWaApiService,
    private appVersion: AppVersion,
    private platform: Platform,
    private alertService: AlertService,
    private inAppBrowserService: InAppbrowserService
  ) { }


  async checkVersion() {
    try {
      const version = await this.appVersion.getVersionNumber();
      console.log(version);
      const result = await this.instantWaApiService.checkVersion({ version });
      if (result?.data?.forceUpdate) {
        this.showForceUpdate();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async showForceUpdate() {
    let url = '';
    if (this.platform.is("ios")) {
      url = '';
    }

    await this.alertService.showAlert("Kamu perlu update Instant WhatsApp untuk dapat menggunakan", false);
    this.inAppBrowserService.open(url);
  }
}
