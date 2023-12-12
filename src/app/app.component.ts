import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonRouterOutlet } from '@ionic/angular';
import { filter } from 'rxjs';
import { DeviceService } from './services/library/device/device.service';
import { FirebaseAnalyticsService } from './services/library/firebase-analytics/firebase-analytics.service';
import { ModalService } from './services/library/modal/modal.service';
import { PushNotificationService } from './services/library/push-notification/push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet!: IonRouterOutlet;

  constructor(
    private deviceService: DeviceService,
    private modalService: ModalService,
    private firebaseAnalyticsService: FirebaseAnalyticsService,
    private router: Router,
    private pushNotificationService: PushNotificationService,
  ) {
  }

  async ngOnInit() {
    this.setStatusBar();
    await this.deviceService.platformReady();
    this.initFirebase();
    this.closeAppListener();
    this.routerListener();
    this.pushNotificationService.requestPermission();
  }

  async initFirebase() {
    await this.deviceService.loadDevice();
    if (this.deviceService.deviceId) {
      this.firebaseAnalyticsService.setUserID(String(this.deviceService.deviceId?.identifier));
      this.firebaseAnalyticsService.setUserProperty('UserID', String(this.deviceService.deviceId?.identifier));
    }
  }

  routerListener() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      const navigation = event as NavigationEnd;
      const url: string = navigation?.url;
      this.firebaseAnalyticsService.setCurrentScreen(url);
    });
  }

  closeAppListener() {
    this.deviceService.backButton().subscribeWithPriority(999999, async () => {
      const modal = await this.modalService.modalActive();
      if (modal) {
        modal.dismiss();
      } else {
        if (!this.routerOutlet.canGoBack()) {
          const navigate: any = navigator;
          navigate["app"]?.exitApp();
        } else {
          this.routerOutlet.pop();
        }
      }
    });
  }

  setStatusBar() {
    try {
      if (this.deviceService.isNative) {
        StatusBar.setStyle({
          style: Style.Dark
        });
        const color = '#398378';
        StatusBar.setBackgroundColor({ color });
        StatusBar.setOverlaysWebView({
          overlay: false
        });
      }
    } catch (error) {
      console.log('Error saat load status bar', error);
    }
  }

}
