import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StopsnearmePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-stopsnearme',
  templateUrl: 'stopsnearme.html',
})
export class StopsnearmePage {

  records: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.records=[
      {
        id:1,
        name:"Stop 1",
        eta1:"12:10",
        eta2:"13:39"
      },
      {
        id:2,
        name:"Stop 2",
        eta1:"12:10",
        eta2:"13:39"
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StopsnearmePage');
  }

  goBackClicked(){
    this.navCtrl.pop();
  }



}
