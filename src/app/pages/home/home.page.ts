import { ChangeDetectionStrategy, Component, NgZone, OnInit } from '@angular/core';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { NavController } from '@ionic/angular';
import { ChatService } from 'src/app/services/bloc/chat/chat.service';
import { VersionService } from 'src/app/services/bloc/version/version.service';
import { AddMobService } from 'src/app/services/library/add-mob/add-mob.service';
import { FirebaseAnalyticsService } from 'src/app/services/library/firebase-analytics/firebase-analytics.service';
import { BehaviorSubject } from 'rxjs';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {
  public isFavorite = false;
  public loadingWatch = false;
  public version$ = new BehaviorSubject<string>('1');
  public isDisable = true;
  public tooltip = false;

  constructor(
    private navCtrl: NavController,
    private ngZone: NgZone,
    private addMobService: AddMobService,
    public chatService: ChatService,
    public appVersion: AppVersion,
    public versionService: VersionService,
    public firebaseAnalyticsService: FirebaseAnalyticsService
  ) { }

  ngOnInit() {
    this.versionService.checkVersion();
    this.chatService.initCounter();
    this.getVersion();
    this.eventsListener();
    setTimeout(() => SplashScreen.hide(), 200);
  }

  eventsListener() {
    this.addMobService.eventDoneWatch$.subscribe(() => {
      if (this.chatService.isOpenChat) {
        this.chatService.openChat(this.isFavorite);
      }
    });
  }

  async getVersion() {
    try {
      const version = await this.appVersion.getVersionNumber();
      this.version$.next(version)
    } catch (error) { }
  }

  async openChat() {
    this.chatService.isOpenChat = true;
    this.chatService.counter++;
    if (this.chatService.counter === 3) {
      this.chatService.counter = 0;
      // await this.watchAdds();
    }

    if (!this.addMobService.isWatching) {
      this.chatService.openChat(this.isFavorite);
      this.firebaseAnalyticsService.logEvent('OpenWhatsapp', { action: 'success' });
    }
  }

  openContactFavorite() {
    this.navCtrl.navigateForward('contact');
  }

  openHistory() {
    this.navCtrl.navigateForward('history');
  }

  reset() {
    this.ngZone.run(() => {
      setTimeout(() => {
        this.isFavorite = false;
      }, 3000);
    });
  }

  async presentPopover(ev: any) {
    this.isDisable = !this.isDisable;
  }

  async watchAdds() {
    try {
      this.loadingWatch = true;
      await this.addMobService.rewardVideo();
    } catch (error) {
      console.log('TCL: error watch', error);
    } finally {
      setTimeout(() => this.loadingWatch = false, 3000);
    }
  }

  clickIconDisable() {
    if (this.tooltip = !this.tooltip) {
      setTimeout(() => {
        this.tooltip = false;
      }, 5000);
      console.log('timeout', this.tooltip);
    }
  }

}
