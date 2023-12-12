import { Injectable } from '@angular/core';
import {
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor() { }

  requestPermission() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });
  }

  registerToken() {
    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        alert('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );
  }


}
