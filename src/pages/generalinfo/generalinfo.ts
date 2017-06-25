import { Component } from '@angular/core';
import { IonicPage,  NavController, ModalController, NavParams } from 'ionic-angular';
import { RoutesinfoPage } from '../routesinfo/routesinfo';
import { SchedulesPage } from '../schedules/schedules';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Constants } from '../../services/constants';
import { ProgressPage } from '../progress/progress';

/**
 * Generated class for the GeneralinfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-generalinfo',
  templateUrl: 'generalinfo.html',
})
export class GeneralinfoPage {
  progress:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController, public constants:Constants, public http:Http) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeneralinfoPage');
    this.progress = this.modalCtrl.create(ProgressPage);
  }

  goBackClicked(){
    this.navCtrl.pop();
  }

  busRoutesClicked(){
    this.progress.present();
    this.http.get(this.constants.BASE_URL_ROUTES).subscribe(data => {
        let json = data.json();
        this.navCtrl.push(RoutesinfoPage,{routes:json});
        this.progress.dismiss();
    },
    error => {
      this.progress.dismiss();
    });
  }


  schedulesClicked(){
    this.progress.present();
    this.http.get(this.constants.BASE_URL_SCHEDULES).subscribe(data => {
        let json = data.json();
        this.navCtrl.push(SchedulesPage,{schedules:json});
        this.progress.dismiss();
    },
    error => {
      this.progress.dismiss();
    });
  }

}
