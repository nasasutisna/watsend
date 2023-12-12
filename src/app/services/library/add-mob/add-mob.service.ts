import { Injectable } from '@angular/core';
import {
  AdMob,
  BannerAdPluginEvents,
  AdMobBannerSize,
  BannerAdOptions,
  BannerAdSize,
  BannerAdPosition,
  InterstitialAdPluginEvents,
  AdLoadInfo,
  AdOptions,
  RewardAdPluginEvents,
  AdMobRewardItem
} from '@capacitor-community/admob';
import { Subject } from 'rxjs';
import { FirebaseAnalyticsService } from '../firebase-analytics/firebase-analytics.service';

@Injectable({
  providedIn: 'root'
})
export class AddMobService {

  public sizeChanged$ = new Subject();
  public loaded$ = new Subject();
  public interstitialLoad = new Subject();
  private readonly isTesting = true;
  public readonly publisherId = 'ca-app-pub-7766807663414972~2845055846';
  private readonly bannerAdId = 'ca-app-pub-7766807663414972/1308574907';
  private readonly interstitialAdId = 'ca-app-pub-7766807663414972/2262563928';
  private readonly rewardedAdId = 'ca-app-pub-7766807663414972/7514890605';
  public isWatching = false;
  public eventDoneWatch$ = new Subject();
  constructor(
    private firebaseAnalyticsService: FirebaseAnalyticsService
  ) { }

  configure() {
    AdMob.initialize({
      requestTrackingAuthorization: true,
      initializeForTesting: true,
    });
  }

  showBanner() {
    AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
      // Subscribe Banner Event Listener
      this.loaded$.next(true);
    });

    AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
      // Subscribe Change Banner Size
      this.sizeChanged$.next(size);
      console.log('TCL: SizeChanged', size)
    });

    const options: BannerAdOptions = {
      adId: this.bannerAdId,
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: this.isTesting
    };

    return AdMob.showBanner(options);
  }

  async interstitial() {
    AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info: AdLoadInfo) => {
      // Subscribe prepared interstitial
      this.interstitialLoad.next(info);
    });

    const options: AdOptions = {
      adId: this.interstitialAdId,
      isTesting: this.isTesting
    };

    await AdMob.prepareInterstitial(options);
    return await AdMob.showInterstitial();
  }

  async rewardVideo() {
    AdMob.addListener(RewardAdPluginEvents.Loaded, (info: AdLoadInfo) => {
      // Subscribe prepared rewardVideo
      console.log('TCL: rewardVideo Loaded', info);
      this.firebaseAnalyticsService.logEvent('RewardLoaded', { action: 'ads', label: JSON.stringify(info) });
    });

    AdMob.addListener(RewardAdPluginEvents.Rewarded, (rewardItem: AdMobRewardItem) => {
      // Subscribe user rewarded
      console.log('TCL: rewardVideo Rewarded', rewardItem);
      this.isWatching = false;
      this.firebaseAnalyticsService.logEvent('RewardSuccess', { action: 'ads', label: JSON.stringify(rewardItem) });
      this.eventDoneWatch$.next(true);
    });

    AdMob.addListener(RewardAdPluginEvents.FailedToLoad, (rewardItem) => {
      // Subscribe user rewarded
      console.log('TCL: FailedToLoad Rewarded', rewardItem);
      this.firebaseAnalyticsService.logEvent('RewardFailedToLoad', { action: 'ads', label: JSON.stringify(rewardItem) });
      this.isWatching = false;
      this.eventDoneWatch$.next(true);
    });

    AdMob.addListener(RewardAdPluginEvents.FailedToShow, (rewardItem) => {
      // Subscribe user rewarded
      console.log('TCL: FailedToShow Rewarded', rewardItem);
      this.firebaseAnalyticsService.logEvent('RewardFailedToShow', { action: 'ads', label: JSON.stringify(rewardItem) });
      this.isWatching = false;
      this.eventDoneWatch$.next(true);
    });

    const options: AdOptions = {
      adId: this.rewardedAdId,
      isTesting: this.isTesting
    };

    this.isWatching = true;
    await AdMob.prepareRewardVideoAd(options);
    const rewardItem = await AdMob.showRewardVideoAd();
    return rewardItem;
  }
}
