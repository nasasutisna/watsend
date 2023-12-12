import { Injectable } from '@angular/core';
import { AlertService } from '../../library/alert/alert.service';
import { InAppbrowserService } from '../../library/in-appbrowser/in-appbrowser.service';
import { Preference, StorageService } from '../../library/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private _phone = null;
  private _message = '';
  private _name = '';
  private _counter = 0;
  public isOpenChat = false;
  constructor(
    private storageService: StorageService,
    private inAppBrowserService: InAppbrowserService,
    private alertService: AlertService
  ) { }

  clear() {
    this.phone = null;
    this.message = null;
    this.name = null;
  }

  async initCounter() {
    this.counter = await this.storageService.getStorage(Preference.CountChat) || 0;
  }

  set counter(value: number) {
    this._counter = value;
    this.storageService.setStorage(Preference.CountChat, this._counter);
  }

  get counter() {
    return Number(this._counter);
  }

  async openChat(isFavorite?: boolean) {
    this.isOpenChat = true;
    let phone = this.phone as string;

    if (isFavorite && !this.name) {
      this.alertService.showAlert('Nama harus diisi');
      this.isOpenChat = false;
      return;
    }

    if (!phone) {
      this.alertService.showAlert('Nomor harus diisi');
      this.isOpenChat = false;
      return;
    }

    if (phone.substring(0, 1) === '0') {
      phone = phone.substring(phone.indexOf('0') + 1);
    }

    if (phone.substring(0, 2) != '62') {
      phone = `62${phone}`;
    }

    if (phone.indexOf('+') !== -1) {
      phone = phone.substring(phone.indexOf('+') + 1);
    }

    phone = phone.split('-').join('');
    phone = phone.split(' ').join('');
    this.phone = phone;
    await this.saveHistory();
    if (isFavorite) await this.saveFavorite();

    const url = 'whatsapp://send?phone=' + phone + '&text=' + this.message;
    this.inAppBrowserService.open(url);
    this.isOpenChat = false;
  }

  async saveFavorite() {
    try {
      let favoriteList = [];
      const favorite = await this.storageService.getStorage(Preference.FavoriteContact) as Array<any>;
      if (favorite?.length) favoriteList = favorite;

      const data = {
        phone: this.phone,
        name: this.name
      }

      const exists = favoriteList.some(item => item.phone === data.phone);
      if (!exists) favoriteList.push(data);
      this.storageService.setStorage(Preference.FavoriteContact, favoriteList);
    } catch (error) {
      console.log('TCL: error', error);
    }
  }

  async saveHistory() {
    try {
      let historyChat = [];
      const history = await this.storageService.getStorage<any>(Preference.HistoryChat);
      if (history?.length) historyChat = history;

      const dataHistory = {
        time: new Date().toISOString(),
        phone: this.phone,
        message: this.message,
        name: this.name
      }

      historyChat.push(dataHistory);
      this.storageService.setStorage(Preference.HistoryChat, historyChat);
    } catch (error) {
      console.log('TCL: error saveHistory', error);
    }
  }

  set phone(value: any) {
    this._phone = value;
  }

  get phone() {
    return this._phone;
  }

  set message(value: any) {
    this._message = value;
  }

  get message() {
    return this._message;
  }

  set name(value: any) {
    this._name = value;
  }

  get name() {
    return this._name;
  }
}
