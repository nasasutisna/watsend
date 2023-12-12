import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  menuList = [{
    id: 1,
    label: 'Riwayat Chat',
    icon: 'chatbox-outline'
  },
  {
    id: 2,
    label: 'Kontak Favorit',
    icon: 'bookmark-outline'
  }]

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() { }

  dismiss(data) {
    console.log(data);
    
    this.popoverCtrl.dismiss(data);
  }
}
