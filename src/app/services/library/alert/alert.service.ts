import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController
  ) { }

  async showAlert(subHeader: any, backdropDismiss?: boolean) {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        subHeader: subHeader,
        backdropDismiss,
        buttons: [
          {
            text: 'Oke',
            role: 'ok',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      await alert.present();
      const { data } = await alert.onDidDismiss();
      resolve(data);
    });
  }

  showAlertConfirm(title: any, subHeader: any, icon?: any) {
    return new Promise<boolean>(async (resolve) => {
      const alert = await this.alertController.create({
        header: title,
        subHeader: subHeader,
        buttons: [
          {
            text: 'Batal',
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          }, {
            text: 'Oke',
            role: 'ok',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      await alert.present();
    });
  }

}
