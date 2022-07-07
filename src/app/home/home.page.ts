import { Component, OnInit } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  token='';
  constructor() {}

  ngOnInit()  {

  PushNotifications.addListener('registration',
    (token)=>{
       this.token = token.value;
    });

    // PushNotifications.addListener
    // ('pushNotificationReceived',(notification)=>{
    //   alert(JSON.stringify(notification));
    // });

    PushNotifications.register();
  }

}


