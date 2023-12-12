import { Component, OnInit } from '@angular/core';
import { FavoriteList } from 'src/app/models/favorite.model';
import { ChatService } from 'src/app/services/bloc/chat/chat.service';
import { AddMobService } from 'src/app/services/library/add-mob/add-mob.service';
import { AlertService } from 'src/app/services/library/alert/alert.service';
import { Preference, StorageService } from 'src/app/services/library/storage/storage.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  public favoriteList: FavoriteList[] = [];
  public keyword = '';

  constructor(
    private storageService: StorageService,
    private alertService: AlertService,
    private chatService: ChatService,
    private addMobService: AddMobService
  ) { }

  ngOnInit() {
    this.getList();
    // this.updateCount();
  }

  async updateCount() {
    let count: number = await this.storageService.getStorage(Preference.CountContact) || 1;

    if (count >= 3) {
      count = 1;
      await this.addMobService.rewardVideo();
      this.storageService.setStorage(Preference.CountContact, count);
    }

    count++;
    this.storageService.setStorage(Preference.CountContact, count);
  }

  async getList() {
    try {
      this.favoriteList = await this.storageService.getStorage(Preference.FavoriteContact) ?? [];
      this.favoriteList.map(item => {
        item.show = true;
        return item;
      });
    } catch (error) {
      console.log('TCL: error get list', error);
    }
  }

  openChat(item: FavoriteList) {
    this.chatService.phone = item.phone;
    this.chatService.name = item.name;
    this.chatService.openChat(false);
  }

  async deleteContact(phoneNumber: any) {
    const confirm = await this.alertService.showAlertConfirm('', 'Kamu yakin mau hapus kontak ini?', '<img src="assets/icon/sad.svg">');
    if (confirm) {
      let favoriteList: FavoriteList[] = [];
      const favorite = await this.storageService.getStorage(Preference.FavoriteContact) as Array<FavoriteList>;
      if (favorite?.length) favoriteList = favorite;

      const index = favoriteList.findIndex(item => item.phone == phoneNumber);
      favoriteList.splice(index, 1);
      this.storageService.setStorage(Preference.FavoriteContact, favoriteList);
      this.getList();
    }
  }

  search(event: string) {
    const keyword = event.toLowerCase();
    for (const item of this.favoriteList) {
      const nama = item.name;
      if (nama.toLowerCase().indexOf(keyword) !== -1) {
        item.show = true;
      } else {
        item.show = false;
      }
    }
  }

}
