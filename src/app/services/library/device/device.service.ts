import { Injectable } from '@angular/core';
import { Device, DeviceId, DeviceInfo } from '@capacitor/device';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  public deviceInfo!: DeviceInfo;
  public deviceId!: DeviceId;

  constructor(
    private platform: Platform
  ) {
  }

  platformReady() {
    return this.platform.ready();
  }

  backButton() {
    return this.platform.backButton;
  }

  async loadDevice() {
    try {
      await this.platform.ready();
      this.deviceInfo = await Device.getInfo();
      this.deviceId = await Device.getId();
      console.log('deviceId', this.deviceId);
      console.log('deviceInfo', this.deviceInfo);
    } catch (_) { }
  }

  get isNative(): boolean {
    if (this.platform.is('cordova')) {
      return true;
    }
    return false;
  }

}
