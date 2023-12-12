import { Injectable } from '@angular/core';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';
import { DeviceService } from '../device/device.service';
@Injectable({
  providedIn: 'root'
})
export class FirebaseAnalyticsService {

  constructor(
    private deviceService: DeviceService
  ) { }

  screenView(event: string, page: string) {
    return this.logEvent(event, { page });
  }

  setUserID(userId: string) {
    FirebaseAnalytics.setUserId({ userId })
      .then(res => console.log(res))
      .catch(error => console.error(error));
  }

  setCurrentScreen(screenName: string) {
    if (this.deviceService.isNative) {
      FirebaseAnalytics.setScreenName({ screenName })
        .then(res => console.log(res))
        .catch(error => console.error(error));
    }
  }

  setEnabled(enabled: boolean) {
    FirebaseAnalytics.setCollectionEnabled({ enabled })
      .then(res => console.log(res))
      .catch(error => console.error(error));
  }

  setUserProperty(name: string, value: string) {
    FirebaseAnalytics.setUserProperty({ name, value })
      .then(res => console.log(res))
      .catch(error => console.error(error));
  }

  logEvent(name: string, params: object) {
    FirebaseAnalytics.logEvent({ name, params })
      .then(res => console.log(res))
      .catch(error => console.error(error));
  }
}
