import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export interface PreferenceSpec {
  key: string;
}

export enum Preference {
  FavoriteContact,
  HistoryChat,
  CountChat,
  CountHistory,
  CountContact,
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private getStorageSpec(spec: Preference): PreferenceSpec {
    switch (spec) {
      case Preference.FavoriteContact:
        return { key: 'FavoriteContact' };
      case Preference.HistoryChat:
        return { key: 'HistoryChat' };
      case Preference.CountChat:
        return { key: 'CountChat' };
      case Preference.CountHistory:
        return { key: 'CountHistory' };
      case Preference.CountContact:
        return { key: 'CountContact' };
    }
  }

  async getStorage<T>(spec: Preference): Promise<T> {
    const storageSpect = this.getStorageSpec(spec);
    const { value } = await Preferences.get({ key: storageSpect.key });
    return value ? JSON.parse(value) : '';
  }

  async setStorage(spec: Preference, value: any) {
    return await Preferences.set({
      key: this.getStorageSpec(spec).key,
      value: JSON.stringify(value)
    });
  }

  async removeStorage(spec: Preference) {
    return await Preferences.remove({
      key: this.getStorageSpec(spec).key
    });
  }

  async clearStorage() {
    return await Preferences.clear();
  }

}
