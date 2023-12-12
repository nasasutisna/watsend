import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modalController: ModalController
  ) { }

  present<T>(component: any, params?: any, cssClass = 'filter-class') {
    return new Promise<T>(async (resolve) => {
      const modal = await this.modalController.create({
        component,
        cssClass,
        backdropDismiss: true,
        mode: 'ios',
        componentProps: params
      });
      await modal.present();

      const { data } = await modal.onDidDismiss();
      resolve(data);
    });
  }

  fullModal<T>(component: any, params?: any, cssClass = 'full-modal') {
    return new Promise<T>(async (resolve) => {
      const modal = await this.modalController.create({
        component,
        cssClass,
        backdropDismiss: true,
        mode: 'ios',
        componentProps: params
      });
      await modal.present();

      const { data } = await modal.onDidDismiss();
      resolve(data);
    });
  }

  fullMaps<T>(component: any, cssClass = 'full-maps') {
    return new Promise<T>(async (resolve) => {
      const modal = await this.modalController.create({
        component,
        cssClass
      });
      await modal.present();

      const { data } = await modal.onDidDismiss();
      resolve(data);
    });
  }

  modalActive() {
    return this.modalController.getTop();
  }

  dismiss(data?: any) {
    return this.modalController.dismiss(data);
  }
}
