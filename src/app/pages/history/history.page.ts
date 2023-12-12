import { Component, OnInit } from '@angular/core';
import { HistoryList } from 'src/app/models/history.model';
import { ChatService } from 'src/app/services/bloc/chat/chat.service';
import { AddMobService } from 'src/app/services/library/add-mob/add-mob.service';
import { AlertService } from 'src/app/services/library/alert/alert.service';
import { Preference, StorageService } from 'src/app/services/library/storage/storage.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  public historyList: HistoryList[] = [];

  constructor(
    private storageService: StorageService,
    private alertService: AlertService,
    private chatService: ChatService,
    private addMobService: AddMobService,
  ) { }

  ngOnInit() {
    this.getList();
    // this.updateCount();
  }

  async updateCount() {
    let count: number = await this.storageService.getStorage(Preference.CountHistory) || 1;

    if (count >= 3) {
      count = 1;
      await this.addMobService.rewardVideo();
      this.storageService.setStorage(Preference.CountHistory, count);
    }

    count++;
    this.storageService.setStorage(Preference.CountHistory, count);
  }


  async getList() {
    try {
      const result = await this.storageService.getStorage<any[]>(Preference.HistoryChat) ?? [];
      this.historyList = result.reverse();
    } catch (error) {
      console.log('TCL: error get list', error);
    }
  }

  openChat(item: HistoryList) {
    this.chatService.phone = item.phone;
    this.chatService.message = item.message;
    this.chatService.name = item.name;
    this.chatService.openChat(false);
  }

  async delete(phoneNumber: any) {
    const confirm = await this.alertService.showAlertConfirm('', 'Kamu yakin mau hapus riwayat ini?', '<img src="assets/icon/sad.svg">');
    if (confirm) {
      let HistoryList: HistoryList[] = [];
      const favorite = await this.storageService.getStorage(Preference.HistoryChat) as Array<HistoryList>;
      if (favorite?.length) HistoryList = favorite;

      const index = HistoryList.findIndex(item => item.phone == phoneNumber);
      HistoryList.splice(index, 1);
      this.storageService.setStorage(Preference.HistoryChat, HistoryList);
      this.getList();
    }
  }

}
